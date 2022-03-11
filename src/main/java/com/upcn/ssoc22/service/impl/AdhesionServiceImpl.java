package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.repository.AdhesionRepository;
import com.upcn.ssoc22.service.AdhesionService;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Adhesion}.
 */
@Service
@Transactional
public class AdhesionServiceImpl implements AdhesionService {

    private final Logger log = LoggerFactory.getLogger(AdhesionServiceImpl.class);

    private final AdhesionRepository adhesionRepository;

    public AdhesionServiceImpl(AdhesionRepository adhesionRepository) {
        this.adhesionRepository = adhesionRepository;
    }

    @Override
    public Adhesion save(Adhesion adhesion) {
        log.debug("Request to save Adhesion : {}", adhesion);
        return adhesionRepository.save(adhesion);
    }

    @Override
    public Optional<Adhesion> partialUpdate(Adhesion adhesion) {
        log.debug("Request to partially update Adhesion : {}", adhesion);

        return adhesionRepository
            .findById(adhesion.getId())
            .map(existingAdhesion -> {
                if (adhesion.getFechaAlta() != null) {
                    existingAdhesion.setFechaAlta(adhesion.getFechaAlta());
                }
                if (adhesion.getFechaBaja() != null) {
                    existingAdhesion.setFechaBaja(adhesion.getFechaBaja());
                }
                if (adhesion.getEstado() != null) {
                    existingAdhesion.setEstado(adhesion.getEstado());
                }
                if (adhesion.getCondicion() != null) {
                    existingAdhesion.setCondicion(adhesion.getCondicion());
                }

                return existingAdhesion;
            })
            .map(adhesionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Adhesion> findAll() {
        log.debug("Request to get all Adhesions");
        return adhesionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Adhesion> findOne(Long id) {
        log.debug("Request to get Adhesion : {}", id);
        return adhesionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Adhesion : {}", id);
        adhesionRepository.deleteById(id);
    }

    @Override
    public List<Adhesion> findAllVigentesByClienteId(Long idcliente) {
        // Esto probablemente necesite refactorizar, usando "checkVigencia(...)"
        return adhesionRepository.findAllVigentesByClienteId(idcliente);
    }

    @Override
    public boolean checkVigencia(Adhesion a) {
        return a.getFechaBaja() == null || a.getFechaBaja().compareTo(ZonedDateTime.now()) > 0;
    }
}
