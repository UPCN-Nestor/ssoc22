package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.Contrato;
import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.domain.Plan;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.repository.AdhesionRepository;
import com.upcn.ssoc22.repository.ItemNomencladorRepository;
import com.upcn.ssoc22.service.ItemNomencladorService;
import com.upcn.ssoc22.service.ProvisionService;
import com.upcn.ssoc22.web.rest.errors.AdhesionNoHabilitadaException;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ItemNomenclador}.
 */
@Service
@Transactional
public class ItemNomencladorServiceImpl implements ItemNomencladorService {

    private final Logger log = LoggerFactory.getLogger(ItemNomencladorServiceImpl.class);

    private final ProvisionService provisionService;
    private final ItemNomencladorRepository itemNomencladorRepository;
    private final AdhesionRepository adhesionRepository;

    public ItemNomencladorServiceImpl(
        ItemNomencladorRepository itemNomencladorRepository,
        AdhesionRepository adhesionRepository,
        ProvisionService provisionService
    ) {
        this.itemNomencladorRepository = itemNomencladorRepository;
        this.adhesionRepository = adhesionRepository;
        this.provisionService = provisionService;
    }

    @Override
    public ItemNomenclador save(ItemNomenclador itemNomenclador) {
        log.debug("Request to save ItemNomenclador : {}", itemNomenclador);
        return itemNomencladorRepository.save(itemNomenclador);
    }

    @Override
    public Optional<ItemNomenclador> partialUpdate(ItemNomenclador itemNomenclador) {
        log.debug("Request to partially update ItemNomenclador : {}", itemNomenclador);

        return itemNomencladorRepository
            .findById(itemNomenclador.getId())
            .map(existingItemNomenclador -> {
                if (itemNomenclador.getNombre() != null) {
                    existingItemNomenclador.setNombre(itemNomenclador.getNombre());
                }
                if (itemNomenclador.getDiasCarencia() != null) {
                    existingItemNomenclador.setDiasCarencia(itemNomenclador.getDiasCarencia());
                }

                return existingItemNomenclador;
            })
            .map(itemNomencladorRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemNomenclador> findAll() {
        log.debug("Request to get all ItemNomencladors");
        return itemNomencladorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ItemNomenclador> findOne(Long id) {
        log.debug("Request to get ItemNomenclador : {}", id);
        return itemNomencladorRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemNomenclador : {}", id);
        itemNomencladorRepository.deleteById(id);
    }

    public List<ItemNomenclador> getAllBonosHabilitadosPorAdhesion(Long adhesionid) throws AdhesionNoHabilitadaException {
        log.debug("REST request to get all ItemNomencladors habilitados para adhesión " + adhesionid);

        Set<ItemNomenclador> toRet = new HashSet<ItemNomenclador>();

        // No tomo en cuenta adhesiones vencidas.
        Adhesion a = adhesionRepository.findById(adhesionid).get();

        if (a.getFechaBaja() != null && a.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) throw new AdhesionNoHabilitadaException();

        for (Contrato c : a.getCliente().getContratoes()) {
            log.info("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.info("> Plan: " + p.getId());

            Set<Provision> analizar = p.getProvisions();

            // Antes de analizar, copio las reglas de los Bonos en general, a las prácticas individuales, para que éstas también las respeten.
            for (Provision bonogeneral : p.getProvisions()) {
                if (bonogeneral.getPrestacion() != null && bonogeneral.getPrestacion().getTipo().equals("bono")) {
                    analizar.forEach((Provision bonoparticular) -> {
                        if (
                            bonoparticular.getItemNomenclador() != null &&
                            bonoparticular.getItemNomenclador().getPrestacion().getTipo().equals("bono")
                        ) bonoparticular.getReglaPrestacions().addAll(bonogeneral.getReglaPrestacions());
                    });
                }
            }

            // Bucle principal en donde analizo si cada práctica está o no habilitada.
            for (Provision prov : analizar) {
                if (
                    (prov.getItemNomenclador() != null && prov.getItemNomenclador().getPrestacion().getTipo().equals("bono")) ||
                    (prov.getPrestacion() != null && prov.getPrestacion().getTipo().equals("bono"))
                ) {
                    /* Es un bono */
                } else continue;

                log.info(
                    ">> ANALIZANDO PROVISION " +
                    prov.getId() +
                    ": " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );

                // Reglas de cantidad por período
                Pair<Boolean, String> cumpleLimites = provisionService.cumpleLimites(prov, a);
                if (!cumpleLimites.getFirst()) {
                    // Este objeto es ad-hoc, sólo lleva el nombre, incluso puede ser el nombre de una Prestación ("Bonos")
                    ItemNomenclador rechazada = new ItemNomenclador();
                    String nombre = prov.getItemNomenclador() != null
                        ? prov.getItemNomenclador().getNombre()
                        : prov.getPrestacion().getNombre();
                    rechazada.setNombre(nombre);
                    rechazada.setHabilitado(false);
                    rechazada.setMotivoInhabilitado("No se cumple: " + cumpleLimites.getSecond());
                    toRet.add(rechazada);
                    continue;
                }

                if (prov.getPrestacion() != null) {
                    // Caso "todos los bonos"
                    LinkedList<ItemNomenclador> toAdd = new LinkedList<ItemNomenclador>(
                        Arrays.asList(prov.getPrestacion().getItemNomencladors().toArray(new ItemNomenclador[0]))
                    );

                    // No tomo en cuenta las prácticas que estén definidas como casos particulares en otra Provisión.
                    for (Provision otra : p.getProvisions()) {
                        if (otra != prov && otra.getItemNomenclador().getPrestacion().getTipo().equals("bono")) {
                            log.info(">>> Excluyendo por existir caso mas particular: " + otra.getItemNomenclador().getNombre());
                            toAdd.remove(otra.getItemNomenclador());
                        }
                    }

                    int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                    for (ItemNomenclador i : toAdd) {
                        Pair<Boolean, String> cumpleCarencia = cumpleCarenciaDefinidaODefault(i, a, c, diasCarenciaSegunProvision);
                        if (!cumpleCarencia.getFirst()) {
                            i.setHabilitado(false);
                            i.setMotivoInhabilitado(cumpleCarencia.getSecond());
                        }
                    }

                    toRet.addAll(toAdd);
                    log.info(">>> Procesadas por caso general: " + toAdd.size());
                } else {
                    // Caso práctica individual
                    int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                    ItemNomenclador i = prov.getItemNomenclador();
                    Pair<Boolean, String> cumpleCarencia = cumpleCarenciaDefinidaODefault(i, a, c, diasCarenciaSegunProvision);

                    if (!cumpleCarencia.getFirst()) {
                        i.setHabilitado(false);
                        i.setMotivoInhabilitado(cumpleCarencia.getSecond());
                    } else {
                        log.info(">>> Habilitada " + prov.getItemNomenclador().getNombre());
                    }

                    toRet.add(i);
                }
            }
        }

        List<ItemNomenclador> toRetList = Arrays.asList(toRet.toArray(new ItemNomenclador[0]));

        toRetList.sort((i1, i2) -> {
            if (i1.getHabilitado() == i2.getHabilitado()) return i1.getNombre().compareTo(i2.getNombre()); else return (
                i1.getHabilitado() == null ? -1 : 1
            );
        });
        return toRetList;
    }

    Pair<Boolean, String> cumpleCarenciaDefinidaODefault(ItemNomenclador i, Adhesion a, Contrato c, int diasCarenciaSegunProvision) {
        ZonedDateTime fechaAdhesion = a.getFechaAlta();
        ZonedDateTime fechaContrato = c.getFechaAlta();
        ZonedDateTime masReciente = fechaAdhesion.compareTo(fechaContrato) > 0 ? fechaAdhesion : fechaContrato;

        // Tomo la carencia de la práctica, o si no la de la prestación que la engloba.
        Integer carenciaDefault = i.getDiasCarencia() == null ? i.getPrestacion().getDiasCarencia() : i.getDiasCarencia();
        Integer carenciaFinal = diasCarenciaSegunProvision > 0 ? diasCarenciaSegunProvision : carenciaDefault;

        log.info(">>> Max(adhesion,contrato): " + masReciente.toLocalDate() + ", carencia para: " + i.getNombre() + ", " + carenciaFinal);

        boolean toRet = masReciente.plusDays(carenciaFinal).compareTo(ZonedDateTime.now()) < 0;
        String motivoInhabilitado = !toRet
            ? carenciaFinal + " días de carencia, fecha más reciente entre adhesión y contrato: " + masReciente.toLocalDate()
            : "";
        return Pair.of(toRet, motivoInhabilitado);
    }

    public float getPrecioReal(Long itemnomencladorid, Long adhesionid) {
        ItemNomenclador i = itemNomencladorRepository.getById(itemnomencladorid);
        Adhesion a = adhesionRepository.getById(adhesionid);

        float precioBase = i.getPrestacion().getPrecio(); // Acá se puede implementar fácilmente precios por ítem nomenclador individual
        float precioMenor = precioBase;

        // No tomo en cuenta adhesiones vencidas.
        if (a.getFechaBaja() != null && a.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) throw new AdhesionNoHabilitadaException();

        for (Contrato c : a.getCliente().getContratoes()) {
            log.info("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.info("> Plan: " + p.getId());

            for (Provision prov : p.getProvisions()) {
                // Controlo que hablemos de la práctica o prestación solicitada
                if (prov.getItemNomenclador() != i && prov.getPrestacion() != i.getPrestacion()) continue;

                log.info(
                    ">> PROVISION " +
                    prov.getId() +
                    ": " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );
                float precioEncontrado = provisionService.procesarDescuento(prov, a, precioBase);
                // Devuelvo el mejor descuento (ej. si en un plan tengo "-30% en bonos y -50% específicamente en radiografías", o incluso eso mismo en dos planes diferentes)
                precioMenor = precioEncontrado < precioMenor ? precioEncontrado : precioMenor;
            }
        }

        log.info(">> Precio hallado: " + precioMenor);
        return precioMenor;
    }
}
