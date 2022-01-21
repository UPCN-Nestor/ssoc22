package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.repository.ItemNomencladorRepository;
import com.upcn.ssoc22.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.upcn.ssoc22.domain.ItemNomenclador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemNomencladorResource {

    private final Logger log = LoggerFactory.getLogger(ItemNomencladorResource.class);

    private static final String ENTITY_NAME = "itemNomenclador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemNomencladorRepository itemNomencladorRepository;

    public ItemNomencladorResource(ItemNomencladorRepository itemNomencladorRepository) {
        this.itemNomencladorRepository = itemNomencladorRepository;
    }

    /**
     * {@code POST  /item-nomencladors} : Create a new itemNomenclador.
     *
     * @param itemNomenclador the itemNomenclador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemNomenclador, or with status {@code 400 (Bad Request)} if the itemNomenclador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-nomencladors")
    public ResponseEntity<ItemNomenclador> createItemNomenclador(@RequestBody ItemNomenclador itemNomenclador) throws URISyntaxException {
        log.debug("REST request to save ItemNomenclador : {}", itemNomenclador);
        if (itemNomenclador.getId() != null) {
            throw new BadRequestAlertException("A new itemNomenclador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemNomenclador result = itemNomencladorRepository.save(itemNomenclador);
        return ResponseEntity
            .created(new URI("/api/item-nomencladors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-nomencladors/:id} : Updates an existing itemNomenclador.
     *
     * @param id the id of the itemNomenclador to save.
     * @param itemNomenclador the itemNomenclador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemNomenclador,
     * or with status {@code 400 (Bad Request)} if the itemNomenclador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemNomenclador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-nomencladors/{id}")
    public ResponseEntity<ItemNomenclador> updateItemNomenclador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemNomenclador itemNomenclador
    ) throws URISyntaxException {
        log.debug("REST request to update ItemNomenclador : {}, {}", id, itemNomenclador);
        if (itemNomenclador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemNomenclador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemNomencladorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ItemNomenclador result = itemNomencladorRepository.save(itemNomenclador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemNomenclador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /item-nomencladors/:id} : Partial updates given fields of an existing itemNomenclador, field will ignore if it is null
     *
     * @param id the id of the itemNomenclador to save.
     * @param itemNomenclador the itemNomenclador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemNomenclador,
     * or with status {@code 400 (Bad Request)} if the itemNomenclador is not valid,
     * or with status {@code 404 (Not Found)} if the itemNomenclador is not found,
     * or with status {@code 500 (Internal Server Error)} if the itemNomenclador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/item-nomencladors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ItemNomenclador> partialUpdateItemNomenclador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemNomenclador itemNomenclador
    ) throws URISyntaxException {
        log.debug("REST request to partial update ItemNomenclador partially : {}, {}", id, itemNomenclador);
        if (itemNomenclador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemNomenclador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemNomencladorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ItemNomenclador> result = itemNomencladorRepository
            .findById(itemNomenclador.getId())
            .map(existingItemNomenclador -> {
                return existingItemNomenclador;
            })
            .map(itemNomencladorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemNomenclador.getId().toString())
        );
    }

    /**
     * {@code GET  /item-nomencladors} : get all the itemNomencladors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemNomencladors in body.
     */
    @GetMapping("/item-nomencladors")
    public List<ItemNomenclador> getAllItemNomencladors() {
        log.debug("REST request to get all ItemNomencladors");
        return itemNomencladorRepository.findAll();
    }

    /**
     * {@code GET  /item-nomencladors/:id} : get the "id" itemNomenclador.
     *
     * @param id the id of the itemNomenclador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemNomenclador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-nomencladors/{id}")
    public ResponseEntity<ItemNomenclador> getItemNomenclador(@PathVariable Long id) {
        log.debug("REST request to get ItemNomenclador : {}", id);
        Optional<ItemNomenclador> itemNomenclador = itemNomencladorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemNomenclador);
    }

    /**
     * {@code DELETE  /item-nomencladors/:id} : delete the "id" itemNomenclador.
     *
     * @param id the id of the itemNomenclador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-nomencladors/{id}")
    public ResponseEntity<Void> deleteItemNomenclador(@PathVariable Long id) {
        log.debug("REST request to delete ItemNomenclador : {}", id);
        itemNomencladorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
