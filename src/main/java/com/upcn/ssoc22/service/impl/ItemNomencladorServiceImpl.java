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

    // Busco los EXPLÍCITAMENTE habilitados por adhesión, esto lo usaríamos para los bonos
    public List<ItemNomenclador> getAllItemNomencladorsHabilitadosPorAdhesion(Long adhesionid) throws AdhesionNoHabilitadaException {
        log.debug("REST request to get all ItemNomencladors habilitados para adhesión " + adhesionid);

        List<ItemNomenclador> toRet = new LinkedList<ItemNomenclador>();

        Adhesion a = adhesionRepository.findById(adhesionid).get();

        if (a.getFechaBaja() != null && a.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) throw new AdhesionNoHabilitadaException();

        for (Contrato c : a.getCliente().getContratoes()) {
            log.debug("> Contrato: " + c.getId());

            // No tomo en cuenta los contratos vencidos.
            if (c.getFechaBaja() != null && c.getFechaBaja().compareTo(ZonedDateTime.now()) < 0) continue;

            Plan p = c.getPlan();
            log.debug("> Plan: " + p.getId());

            for (Provision prov : p.getProvisions()) {
                log.debug(
                    ">> Provisión " +
                    prov.getId() +
                    " sobre " +
                    (prov.getPrestacion() != null ? prov.getPrestacion().getNombre() : prov.getItemNomenclador().getNombre())
                );

                // En realidad creo que este IF es lo único que diferencia Bonos de la lógica de las demás prestaciones
                if (provisionService.estaHabilitadaPara(prov, a)) {
                    // Si la Provisión es sobre una Prestación, agrego como disponibles todos los ItemNomencladors asociados. Si no, sólo el indicado.
                    if (prov.getPrestacion() != null) {
                        LinkedList<ItemNomenclador> toAdd = new LinkedList<ItemNomenclador>(
                            Arrays.asList(prov.getPrestacion().getItemNomencladors().toArray(new ItemNomenclador[0]))
                        );
                        int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                        toAdd.removeIf(i -> !cumpleCarenciaDefinidaODefault(i, a, c, diasCarenciaSegunProvision));
                        toRet.addAll(toAdd);
                    } else {
                        int diasCarenciaSegunProvision = provisionService.diasCarencia(prov, a);
                        if (cumpleCarenciaDefinidaODefault(prov.getItemNomenclador(), a, c, diasCarenciaSegunProvision)) toRet.add(
                            prov.getItemNomenclador()
                        );
                    }
                    log.debug(">> Habilitada.");
                }
            }
        }

        return toRet;
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
}