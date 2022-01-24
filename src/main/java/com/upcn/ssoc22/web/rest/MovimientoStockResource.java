package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.MovimientoStock;
import com.upcn.ssoc22.repository.MovimientoStockRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.MovimientoStock}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MovimientoStockResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoStockResource.class);

    private static final String ENTITY_NAME = "movimientoStock";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoStockRepository movimientoStockRepository;

    public MovimientoStockResource(MovimientoStockRepository movimientoStockRepository) {
        this.movimientoStockRepository = movimientoStockRepository;
    }

    /**
     * {@code POST  /movimiento-stocks} : Create a new movimientoStock.
     *
     * @param movimientoStock the movimientoStock to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoStock, or with status {@code 400 (Bad Request)} if the movimientoStock has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-stocks")
    public ResponseEntity<MovimientoStock> createMovimientoStock(@RequestBody MovimientoStock movimientoStock) throws URISyntaxException {
        log.debug("REST request to save MovimientoStock : {}", movimientoStock);
        if (movimientoStock.getId() != null) {
            throw new BadRequestAlertException("A new movimientoStock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoStock result = movimientoStockRepository.save(movimientoStock);
        return ResponseEntity
            .created(new URI("/api/movimiento-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-stocks/:id} : Updates an existing movimientoStock.
     *
     * @param id the id of the movimientoStock to save.
     * @param movimientoStock the movimientoStock to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoStock,
     * or with status {@code 400 (Bad Request)} if the movimientoStock is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoStock couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-stocks/{id}")
    public ResponseEntity<MovimientoStock> updateMovimientoStock(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MovimientoStock movimientoStock
    ) throws URISyntaxException {
        log.debug("REST request to update MovimientoStock : {}, {}", id, movimientoStock);
        if (movimientoStock.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoStock.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoStockRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MovimientoStock result = movimientoStockRepository.save(movimientoStock);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoStock.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movimiento-stocks/:id} : Partial updates given fields of an existing movimientoStock, field will ignore if it is null
     *
     * @param id the id of the movimientoStock to save.
     * @param movimientoStock the movimientoStock to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoStock,
     * or with status {@code 400 (Bad Request)} if the movimientoStock is not valid,
     * or with status {@code 404 (Not Found)} if the movimientoStock is not found,
     * or with status {@code 500 (Internal Server Error)} if the movimientoStock couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movimiento-stocks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MovimientoStock> partialUpdateMovimientoStock(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MovimientoStock movimientoStock
    ) throws URISyntaxException {
        log.debug("REST request to partial update MovimientoStock partially : {}, {}", id, movimientoStock);
        if (movimientoStock.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoStock.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoStockRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MovimientoStock> result = movimientoStockRepository
            .findById(movimientoStock.getId())
            .map(existingMovimientoStock -> {
                if (movimientoStock.getFecha() != null) {
                    existingMovimientoStock.setFecha(movimientoStock.getFecha());
                }
                if (movimientoStock.getCantidad() != null) {
                    existingMovimientoStock.setCantidad(movimientoStock.getCantidad());
                }

                return existingMovimientoStock;
            })
            .map(movimientoStockRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoStock.getId().toString())
        );
    }

    /**
     * {@code GET  /movimiento-stocks} : get all the movimientoStocks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoStocks in body.
     */
    @GetMapping("/movimiento-stocks")
    public List<MovimientoStock> getAllMovimientoStocks() {
        log.debug("REST request to get all MovimientoStocks");
        return movimientoStockRepository.findAll();
    }

    /**
     * {@code GET  /movimiento-stocks/:id} : get the "id" movimientoStock.
     *
     * @param id the id of the movimientoStock to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoStock, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-stocks/{id}")
    public ResponseEntity<MovimientoStock> getMovimientoStock(@PathVariable Long id) {
        log.debug("REST request to get MovimientoStock : {}", id);
        Optional<MovimientoStock> movimientoStock = movimientoStockRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movimientoStock);
    }

    /**
     * {@code DELETE  /movimiento-stocks/:id} : delete the "id" movimientoStock.
     *
     * @param id the id of the movimientoStock to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-stocks/{id}")
    public ResponseEntity<Void> deleteMovimientoStock(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoStock : {}", id);
        movimientoStockRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
