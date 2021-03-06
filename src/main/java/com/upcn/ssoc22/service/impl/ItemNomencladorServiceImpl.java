package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.Contrato;
import com.upcn.ssoc22.domain.DTO.Descuento;
import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.domain.Plan;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.repository.ItemNomencladorRepository;
import com.upcn.ssoc22.service.AdhesionService;
import com.upcn.ssoc22.service.ContratoService;
import com.upcn.ssoc22.service.ItemNomencladorService;
import com.upcn.ssoc22.service.ProvisionService;
import com.upcn.ssoc22.web.rest.errors.AdhesionNoHabilitadaException;
import java.time.ZonedDateTime;
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
    private final AdhesionService adhesionService;
    private final ContratoService contratoService;

    public ItemNomencladorServiceImpl(
        ItemNomencladorRepository itemNomencladorRepository,
        AdhesionService adhesionService,
        ContratoService contratoService,
        ProvisionService provisionService
    ) {
        this.itemNomencladorRepository = itemNomencladorRepository;
        this.adhesionService = adhesionService;
        this.contratoService = contratoService;
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

    public List<ItemNomenclador> getAllBonosHabilitadosPorAdhesion(Long adhesionid) {
        log.debug("REST request to get all ItemNomencladors habilitados para adhesi??n " + adhesionid);

        Set<ItemNomenclador> toRet = new HashSet<ItemNomenclador>();

        // No tomo en cuenta adhesiones vencidas.
        Adhesion a = adhesionService.findOne(adhesionid).get();

        if (!adhesionService.checkVigencia(a)) return null;

        for (Contrato c : a.getCliente().getContratoes()) {
            log.info("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (!contratoService.checkVigencia(c)) continue;

            Plan p = c.getPlan();
            log.info("> Plan: " + p.getId());

            Set<Provision> analizar = p.getProvisions();

            // Antes de analizar, copio las reglas de los Bonos en general, a las pr??cticas individuales, para que ??stas tambi??n las respeten.
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

            // Bucle principal en donde analizo si cada pr??ctica est?? o no habilitada.
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

                // Reglas de cantidad por per??odo
                Pair<Boolean, String> cumpleLimites = provisionService.cumpleLimites(prov, a);
                if (!cumpleLimites.getFirst()) {
                    // Este objeto es ad-hoc, s??lo lleva el nombre, incluso puede ser el nombre de una Prestaci??n ("Bonos")
                    ItemNomenclador rechazada = new ItemNomenclador();
                    String nombre = prov.getItemNomenclador() != null
                        ? prov.getItemNomenclador().getNombre()
                        : prov.getPrestacion().getNombre();
                    rechazada.setNombre(nombre);
                    rechazada.setHabilitado(false);
                    rechazada.setMotivoInhabilitado("No se cumple: " + cumpleLimites.getSecond());

                    // S??lo informativo. Para que si vuelve rechazada por l??mites igual informe que tambi??n fallar??a por carencias. Ojo, no funciona para "todos los bonos"
                    if (prov.getItemNomenclador() != null) {
                        int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                        Pair<Boolean, String> cumpleCarencia = cumpleCarenciaDefinidaODefault(
                            prov.getItemNomenclador(),
                            a,
                            c,
                            diasCarenciaSegunProvision
                        );
                        if (!cumpleCarencia.getFirst()) {
                            rechazada.setMotivoInhabilitado(rechazada.getMotivoInhabilitado() + cumpleCarencia.getSecond() + ".");
                        }
                    }

                    toRet.add(rechazada);
                    continue;
                }

                if (prov.getPrestacion() != null) {
                    // Caso "todos los bonos"
                    LinkedList<ItemNomenclador> toAdd = new LinkedList<ItemNomenclador>(
                        Arrays.asList(prov.getPrestacion().getItemNomencladors().toArray(new ItemNomenclador[0]))
                    );

                    // No tomo en cuenta las pr??cticas que est??n definidas como casos particulares en otra Provisi??n.
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
                    // Caso pr??ctica individual
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

        // Tomo la carencia de la pr??ctica, o si no la de la prestaci??n que la engloba.
        Integer carenciaDefault = i.getDiasCarencia() == null ? i.getPrestacion().getDiasCarencia() : i.getDiasCarencia();
        Integer carenciaFinal = diasCarenciaSegunProvision > 0 ? diasCarenciaSegunProvision : carenciaDefault;

        log.info(">>> Max(adhesion,contrato): " + masReciente.toLocalDate() + ", carencia para: " + i.getNombre() + ", " + carenciaFinal);

        boolean toRet = masReciente.plusDays(carenciaFinal).compareTo(ZonedDateTime.now()) < 0;
        String motivoInhabilitado = !toRet
            ? "Carencia: " + carenciaFinal + " d??as, fecha m??s reciente entre adhesi??n y contrato: " + masReciente.toLocalDate()
            : "";
        return Pair.of(toRet, motivoInhabilitado);
    }

    public Descuento getPrecioReal(Long itemnomencladorid, Long adhesionid) {
        ItemNomenclador i = itemNomencladorRepository.getById(itemnomencladorid);
        Adhesion a = adhesionService.findOne(adhesionid).get();

        float precioBase = i.getPrestacion().getPrecio(); // Ac?? se puede implementar f??cilmente precios por ??tem nomenclador individual
        Descuento precioMenor = new Descuento();
        precioMenor.setDescuento(precioBase);

        // No tomo en cuenta adhesiones vencidas.
        if (a.getFechaBaja() != null && a.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) throw new AdhesionNoHabilitadaException();

        for (Contrato c : a.getCliente().getContratoes()) {
            log.info("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.info("> Plan: " + p.getId());

            for (Provision prov : p.getProvisions()) {
                // Controlo que hablemos de la pr??ctica o prestaci??n solicitada
                if (prov.getItemNomenclador() != i && prov.getPrestacion() != i.getPrestacion()) continue;

                log.info(
                    ">> PROVISION " +
                    prov.getId() +
                    ": " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );

                // Devuelvo el mejor descuento (ej. si en un plan tengo "-30% en bonos y -50% espec??ficamente en radiograf??as", o incluso eso mismo en dos planes diferentes)
                Descuento precioEncontrado = provisionService.procesarDescuento(prov, a, precioBase);
                if (precioEncontrado.getDescuento() < precioMenor.getDescuento()) {
                    precioMenor = precioEncontrado;
                }
            }
        }

        log.info(">> Precio hallado: " + precioMenor.getDescuento() + " " + precioMenor.getMotivoDescuento());
        return precioMenor;
    }
}
