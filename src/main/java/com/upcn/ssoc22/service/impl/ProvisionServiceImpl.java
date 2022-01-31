package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ProvisionRepository;
import com.upcn.ssoc22.service.ProvisionService;
import com.upcn.ssoc22.service.ReglaPrestacionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Provision}.
 */
@Service
@Transactional
public class ProvisionServiceImpl implements ProvisionService {

    private final Logger log = LoggerFactory.getLogger(ProvisionServiceImpl.class);

    private final ProvisionRepository provisionRepository;
    private final ReglaPrestacionService reglaPrestacionService;

    public ProvisionServiceImpl(ProvisionRepository provisionRepository, ReglaPrestacionService reglaPrestacionService) {
        this.provisionRepository = provisionRepository;
        this.reglaPrestacionService = reglaPrestacionService;
    }

    @Override
    public Provision save(Provision provision) {
        log.debug("Request to save Provision : {}", provision);
        return provisionRepository.save(provision);
    }

    @Override
    public Optional<Provision> partialUpdate(Provision provision) {
        log.debug("Request to partially update Provision : {}", provision);

        return provisionRepository
            .findById(provision.getId())
            .map(existingProvision -> {
                return existingProvision;
            })
            .map(provisionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Provision> findAll() {
        log.debug("Request to get all Provisions");
        return provisionRepository.findAllWithEagerRelationships();
    }

    public Page<Provision> findAllWithEagerRelationships(Pageable pageable) {
        return provisionRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Provision> findOne(Long id) {
        log.debug("Request to get Provision : {}", id);
        return provisionRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Provision : {}", id);
        provisionRepository.deleteById(id);
    }

    public boolean estaHabilitadaPara(Provision p, Adhesion a) {
        boolean habilitada = false;

        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            log.debug(">>> Regla de habilitación: " + r.getId());
            if (r.getTipoRegla().equals("Habilita")) {
                if (reglaPrestacionService.habilita(r, a)) {
                    log.debug(">>> Ok.");
                    habilitada = true;
                    break;
                }
            }
        }

        return habilitada;
    }
}
