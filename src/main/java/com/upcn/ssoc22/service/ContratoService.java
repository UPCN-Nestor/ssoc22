package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.Contrato;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Contrato}.
 */
public interface ContratoService {
    /**
     * Save a contrato.
     *
     * @param contrato the entity to save.
     * @return the persisted entity.
     */
    Contrato save(Contrato contrato);

    /**
     * Partially updates a contrato.
     *
     * @param contrato the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Contrato> partialUpdate(Contrato contrato);

    /**
     * Get all the contratoes.
     *
     * @return the list of entities.
     */
    List<Contrato> findAll();

    /**
     * Get the "id" contrato.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Contrato> findOne(Long id);

    /**
     * Delete the "id" contrato.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
