package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Contrato;
import com.upcn.ssoc22.repository.ContratoRepository;
import com.upcn.ssoc22.service.ContratoService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Contrato}.
 */
@Service
@Transactional
public class ContratoServiceImpl implements ContratoService {

    private final Logger log = LoggerFactory.getLogger(ContratoServiceImpl.class);

    private final ContratoRepository contratoRepository;

    public ContratoServiceImpl(ContratoRepository contratoRepository) {
        this.contratoRepository = contratoRepository;
    }

    @Override
    public Contrato save(Contrato contrato) {
        log.debug("Request to save Contrato : {}", contrato);
        return contratoRepository.save(contrato);
    }

    @Override
    public Optional<Contrato> partialUpdate(Contrato contrato) {
        log.debug("Request to partially update Contrato : {}", contrato);

        return contratoRepository
            .findById(contrato.getId())
            .map(existingContrato -> {
                if (contrato.getFechaAlta() != null) {
                    existingContrato.setFechaAlta(contrato.getFechaAlta());
                }
                if (contrato.getFechaBaja() != null) {
                    existingContrato.setFechaBaja(contrato.getFechaBaja());
                }
                if (contrato.getParticularidades() != null) {
                    existingContrato.setParticularidades(contrato.getParticularidades());
                }

                return existingContrato;
            })
            .map(contratoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Contrato> findAll() {
        log.debug("Request to get all Contratoes");
        return contratoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Contrato> findOne(Long id) {
        log.debug("Request to get Contrato : {}", id);
        return contratoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Contrato : {}", id);
        contratoRepository.deleteById(id);
    }
}
