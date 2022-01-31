package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ReglaPrestacion}.
 */
public interface ReglaPrestacionService {
    /**
     * Save a reglaPrestacion.
     *
     * @param reglaPrestacion the entity to save.
     * @return the persisted entity.
     */
    ReglaPrestacion save(ReglaPrestacion reglaPrestacion);

    /**
     * Partially updates a reglaPrestacion.
     *
     * @param reglaPrestacion the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReglaPrestacion> partialUpdate(ReglaPrestacion reglaPrestacion);

    /**
     * Get all the reglaPrestacions.
     *
     * @return the list of entities.
     */
    List<ReglaPrestacion> findAll();

    /**
     * Get the "id" reglaPrestacion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReglaPrestacion> findOne(Long id);

    /**
     * Delete the "id" reglaPrestacion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    boolean procesarReglaDeHabilitacion(ReglaPrestacion r, Adhesion a);
}
