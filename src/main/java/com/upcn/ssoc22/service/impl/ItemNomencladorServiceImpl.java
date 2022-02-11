package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.Contrato;
import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.domain.Plan;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.domain.ReglaPrestacion;
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
            log.debug("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.debug("> Plan: " + p.getId());

            for (Provision prov : p.getProvisions()) {
                if (
                    (prov.getItemNomenclador() != null && prov.getItemNomenclador().getPrestacion().getTipo().equals("bono")) ||
                    (prov.getPrestacion() != null && prov.getPrestacion().getTipo().equals("bono"))
                ) {
                    /* Es un bono */
                } else continue;

                log.debug(
                    ">> Provisión " +
                    prov.getId() +
                    " sobre " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );

                // Reglas de cantidad por período
                if (!provisionService.cumpleLimites(prov, a)) continue;

                if (prov.getPrestacion() != null) {
                    LinkedList<ItemNomenclador> toAdd = new LinkedList<ItemNomenclador>(
                        Arrays.asList(prov.getPrestacion().getItemNomencladors().toArray(new ItemNomenclador[0]))
                    );
                    int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                    toAdd.removeIf(i -> !cumpleCarenciaDefinidaODefault(i, a, c, diasCarenciaSegunProvision));
                    toRet.addAll(toAdd);
                    log.debug(">> Habilitadas " + toAdd.size());
                } else {
                    int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                    if (cumpleCarenciaDefinidaODefault(prov.getItemNomenclador(), a, c, diasCarenciaSegunProvision)) {
                        toRet.add(prov.getItemNomenclador());
                        log.debug(">> Habilitada " + prov.getItemNomenclador().getNombre());
                    }
                }
            }
        }

        List<ItemNomenclador> toRetList = Arrays.asList(toRet.toArray(new ItemNomenclador[0]));

        toRetList.sort((i1, i2) -> {
            return i1.getNombre().compareTo(i2.getNombre());
        });
        return toRetList;
    }

    boolean cumpleCarenciaDefinidaODefault(ItemNomenclador i, Adhesion a, Contrato c, int diasCarenciaSegunProvision) {
        ZonedDateTime fechaAdhesion = a.getFechaAlta();
        ZonedDateTime fechaContrato = c.getFechaAlta();
        ZonedDateTime masReciente = fechaAdhesion.compareTo(fechaContrato) > 0 ? fechaAdhesion : fechaContrato;

        // Tomo la carencia de la práctica, o si no la de la prestación que la engloba.
        Integer carenciaDefault = i.getDiasCarencia() == null ? i.getPrestacion().getDiasCarencia() : i.getDiasCarencia();
        Integer carenciaFinal = diasCarenciaSegunProvision > 0 ? diasCarenciaSegunProvision : carenciaDefault;

        log.debug("Mayor alta entre adhesión y contrato: " + masReciente + ", carencia hallada: " + carenciaFinal);

        return masReciente.plusDays(carenciaFinal).compareTo(ZonedDateTime.now()) < 0;
    }

    public float getPrecioReal(Long itemnomencladorid, Long adhesionid) {
        ItemNomenclador i = itemNomencladorRepository.getById(itemnomencladorid);
        Adhesion a = adhesionRepository.getById(adhesionid);

        float precioBase = i.getPrestacion().getPrecio(); // Acá se puede implementar fácilmente precios por ítem nomenclador individual
        float precioMenor = precioBase;

        // No tomo en cuenta adhesiones vencidas.
        if (a.getFechaBaja() != null && a.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) throw new AdhesionNoHabilitadaException();

        for (Contrato c : a.getCliente().getContratoes()) {
            log.debug("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.debug("> Plan: " + p.getId());

            for (Provision prov : p.getProvisions()) {
                // Controlo que hablemos de la práctica o prestación solicitada
                if (prov.getItemNomenclador() != i && prov.getPrestacion() != i.getPrestacion()) continue;

                log.debug(
                    ">> Provisión " +
                    prov.getId() +
                    " sobre " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );
                float precioEncontrado = provisionService.procesarDescuento(prov, a, precioBase);
                // Devuelvo el mejor descuento (ej. si en un plan tengo "-30% en bonos y -50% específicamente en radiografías", o incluso eso mismo en dos planes diferentes)
                precioMenor = precioEncontrado < precioMenor ? precioEncontrado : precioMenor;
            }
        }

        log.debug("> Precio hallado: " + precioMenor);
        return precioMenor;
    }
}
