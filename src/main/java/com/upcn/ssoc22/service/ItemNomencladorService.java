package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.ItemNomenclador;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ItemNomenclador}.
 */
public interface ItemNomencladorService {
    /**
     * Save a itemNomenclador.
     *
     * @param itemNomenclador the entity to save.
     * @return the persisted entity.
     */
    ItemNomenclador save(ItemNomenclador itemNomenclador);

    /**
     * Partially updates a itemNomenclador.
     *
     * @param itemNomenclador the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ItemNomenclador> partialUpdate(ItemNomenclador itemNomenclador);

    /**
     * Get all the itemNomencladors.
     *
     * @return the list of entities.
     */
    List<ItemNomenclador> findAll();

    /**
     * Get the "id" itemNomenclador.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemNomenclador> findOne(Long id);

    /**
     * Delete the "id" itemNomenclador.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<ItemNomenclador> getAllItemNomencladorsHabilitadosPorAdhesion(Long adhesionid);
}
