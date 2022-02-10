package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ReglaPrestacionRepository;
import com.upcn.ssoc22.service.ReglaPrestacionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ReglaPrestacion}.
 */
@Service
@Transactional
public class ReglaPrestacionServiceImpl implements ReglaPrestacionService {

    private final Logger log = LoggerFactory.getLogger(ReglaPrestacionServiceImpl.class);

    private final ReglaPrestacionRepository reglaPrestacionRepository;

    public ReglaPrestacionServiceImpl(ReglaPrestacionRepository reglaPrestacionRepository) {
        this.reglaPrestacionRepository = reglaPrestacionRepository;
    }

    @Override
    public ReglaPrestacion save(ReglaPrestacion reglaPrestacion) {
        log.debug("Request to save ReglaPrestacion : {}", reglaPrestacion);
        return reglaPrestacionRepository.save(reglaPrestacion);
    }

    @Override
    public Optional<ReglaPrestacion> partialUpdate(ReglaPrestacion reglaPrestacion) {
        log.debug("Request to partially update ReglaPrestacion : {}", reglaPrestacion);

        return reglaPrestacionRepository
            .findById(reglaPrestacion.getId())
            .map(existingReglaPrestacion -> {
                if (reglaPrestacion.getCodigoRegla() != null) {
                    existingReglaPrestacion.setCodigoRegla(reglaPrestacion.getCodigoRegla());
                }
                if (reglaPrestacion.getTipoRegla() != null) {
                    existingReglaPrestacion.setTipoRegla(reglaPrestacion.getTipoRegla());
                }
                if (reglaPrestacion.getDatos() != null) {
                    existingReglaPrestacion.setDatos(reglaPrestacion.getDatos());
                }

                return existingReglaPrestacion;
            })
            .map(reglaPrestacionRepository::save);
    }

    // Esto devuelve todas las Reglas "prototipo" disponibles
    @Override
    @Transactional(readOnly = true)
    public List<ReglaPrestacion> findAllPrototipos() {
        log.debug("Request to get all ReglaPrestacions");
        return reglaPrestacionRepository.findAllByProvisionId(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReglaPrestacion> findOne(Long id) {
        log.debug("Request to get ReglaPrestacion : {}", id);
        return reglaPrestacionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReglaPrestacion : {}", id);
        reglaPrestacionRepository.deleteById(id);
    }

    public boolean procesarReglaDeHabilitacion(ReglaPrestacion r, Adhesion a) {
        if (r.getTipoRegla().equals("Habilita")) {
            // Ejemplo
            return true;
        }

        return false;
    }

    @Override
    public int procesarReglaDeCarencia(ReglaPrestacion r, Adhesion a) {
        if (r.getTipoRegla().equals("Carencia")) {
            // Ejemplo
            return Integer.parseInt(r.getDatos());
        }
        return 0;
    }

    @Override
    public float procesarReglaDeDescuento(ReglaPrestacion r, Adhesion a, float precioBase) {
        if (r.getTipoRegla().equals("Descuento")) {
            // Ejemplo
            return precioBase * (100 - (Integer.parseInt(r.getDatos()))) / 100;
        }

        return precioBase;
    }
}
