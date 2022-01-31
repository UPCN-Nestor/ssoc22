package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Provision}.
 */
public interface ProvisionService {
    /**
     * Save a provision.
     *
     * @param provision the entity to save.
     * @return the persisted entity.
     */
    Provision save(Provision provision);

    /**
     * Partially updates a provision.
     *
     * @param provision the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Provision> partialUpdate(Provision provision);

    /**
     * Get all the provisions.
     *
     * @return the list of entities.
     */
    List<Provision> findAll();

    /**
     * Get all the provisions with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Provision> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" provision.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Provision> findOne(Long id);

    /**
     * Delete the "id" provision.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    boolean estaHabilitadaPara(Provision p, Adhesion a);

    int diasCarencia(Provision p, Adhesion a);
}
