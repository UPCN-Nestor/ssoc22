package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.ItemFactura;
import com.upcn.ssoc22.repository.ItemFacturaRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.ItemFactura}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemFacturaResource {

    private final Logger log = LoggerFactory.getLogger(ItemFacturaResource.class);

    private static final String ENTITY_NAME = "itemFactura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemFacturaRepository itemFacturaRepository;

    public ItemFacturaResource(ItemFacturaRepository itemFacturaRepository) {
        this.itemFacturaRepository = itemFacturaRepository;
    }

    /**
     * {@code POST  /item-facturas} : Create a new itemFactura.
     *
     * @param itemFactura the itemFactura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemFactura, or with status {@code 400 (Bad Request)} if the itemFactura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-facturas")
    public ResponseEntity<ItemFactura> createItemFactura(@RequestBody ItemFactura itemFactura) throws URISyntaxException {
        log.debug("REST request to save ItemFactura : {}", itemFactura);
        if (itemFactura.getId() != null) {
            throw new BadRequestAlertException("A new itemFactura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemFactura result = itemFacturaRepository.save(itemFactura);
        return ResponseEntity
            .created(new URI("/api/item-facturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-facturas/:id} : Updates an existing itemFactura.
     *
     * @param id the id of the itemFactura to save.
     * @param itemFactura the itemFactura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemFactura,
     * or with status {@code 400 (Bad Request)} if the itemFactura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemFactura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-facturas/{id}")
    public ResponseEntity<ItemFactura> updateItemFactura(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemFactura itemFactura
    ) throws URISyntaxException {
        log.debug("REST request to update ItemFactura : {}, {}", id, itemFactura);
        if (itemFactura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemFactura.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemFacturaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ItemFactura result = itemFacturaRepository.save(itemFactura);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, itemFactura.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /item-facturas/:id} : Partial updates given fields of an existing itemFactura, field will ignore if it is null
     *
     * @param id the id of the itemFactura to save.
     * @param itemFactura the itemFactura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemFactura,
     * or with status {@code 400 (Bad Request)} if the itemFactura is not valid,
     * or with status {@code 404 (Not Found)} if the itemFactura is not found,
     * or with status {@code 500 (Internal Server Error)} if the itemFactura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/item-facturas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ItemFactura> partialUpdateItemFactura(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemFactura itemFactura
    ) throws URISyntaxException {
        log.debug("REST request to partial update ItemFactura partially : {}, {}", id, itemFactura);
        if (itemFactura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemFactura.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemFacturaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ItemFactura> result = itemFacturaRepository
            .findById(itemFactura.getId())
            .map(existingItemFactura -> {
                return existingItemFactura;
            })
            .map(itemFacturaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, itemFactura.getId().toString())
        );
    }

    /**
     * {@code GET  /item-facturas} : get all the itemFacturas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemFacturas in body.
     */
    @GetMapping("/item-facturas")
    public List<ItemFactura> getAllItemFacturas() {
        log.debug("REST request to get all ItemFacturas");
        return itemFacturaRepository.findAll();
    }

    /**
     * {@code GET  /item-facturas/:id} : get the "id" itemFactura.
     *
     * @param id the id of the itemFactura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemFactura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-facturas/{id}")
    public ResponseEntity<ItemFactura> getItemFactura(@PathVariable Long id) {
        log.debug("REST request to get ItemFactura : {}", id);
        Optional<ItemFactura> itemFactura = itemFacturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemFactura);
    }

    /**
     * {@code DELETE  /item-facturas/:id} : delete the "id" itemFactura.
     *
     * @param id the id of the itemFactura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-facturas/{id}")
    public ResponseEntity<Void> deleteItemFactura(@PathVariable Long id) {
        log.debug("REST request to delete ItemFactura : {}", id);
        itemFacturaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
