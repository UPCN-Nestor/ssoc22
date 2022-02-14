package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.Adhesion;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Adhesion}.
 */
public interface AdhesionService {
    /**
     * Save a adhesion.
     *
     * @param adhesion the entity to save.
     * @return the persisted entity.
     */
    Adhesion save(Adhesion adhesion);

    /**
     * Partially updates a adhesion.
     *
     * @param adhesion the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Adhesion> partialUpdate(Adhesion adhesion);

    /**
     * Get all the adhesions.
     *
     * @return the list of entities.
     */
    List<Adhesion> findAll();

    /**
     * Get the "id" adhesion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Adhesion> findOne(Long id);

    /**
     * Delete the "id" adhesion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<Adhesion> findAllVigentesByClienteId(Long idcliente);

    boolean checkVigencia(Adhesion a);
}
