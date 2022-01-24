package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Insumo;
import com.upcn.ssoc22.repository.InsumoRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Insumo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InsumoResource {

    private final Logger log = LoggerFactory.getLogger(InsumoResource.class);

    private static final String ENTITY_NAME = "insumo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InsumoRepository insumoRepository;

    public InsumoResource(InsumoRepository insumoRepository) {
        this.insumoRepository = insumoRepository;
    }

    /**
     * {@code POST  /insumos} : Create a new insumo.
     *
     * @param insumo the insumo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new insumo, or with status {@code 400 (Bad Request)} if the insumo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/insumos")
    public ResponseEntity<Insumo> createInsumo(@RequestBody Insumo insumo) throws URISyntaxException {
        log.debug("REST request to save Insumo : {}", insumo);
        if (insumo.getId() != null) {
            throw new BadRequestAlertException("A new insumo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Insumo result = insumoRepository.save(insumo);
        return ResponseEntity
            .created(new URI("/api/insumos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /insumos/:id} : Updates an existing insumo.
     *
     * @param id the id of the insumo to save.
     * @param insumo the insumo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated insumo,
     * or with status {@code 400 (Bad Request)} if the insumo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the insumo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/insumos/{id}")
    public ResponseEntity<Insumo> updateInsumo(@PathVariable(value = "id", required = false) final Long id, @RequestBody Insumo insumo)
        throws URISyntaxException {
        log.debug("REST request to update Insumo : {}, {}", id, insumo);
        if (insumo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, insumo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!insumoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Insumo result = insumoRepository.save(insumo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, insumo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /insumos/:id} : Partial updates given fields of an existing insumo, field will ignore if it is null
     *
     * @param id the id of the insumo to save.
     * @param insumo the insumo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated insumo,
     * or with status {@code 400 (Bad Request)} if the insumo is not valid,
     * or with status {@code 404 (Not Found)} if the insumo is not found,
     * or with status {@code 500 (Internal Server Error)} if the insumo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/insumos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Insumo> partialUpdateInsumo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Insumo insumo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Insumo partially : {}, {}", id, insumo);
        if (insumo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, insumo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!insumoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Insumo> result = insumoRepository
            .findById(insumo.getId())
            .map(existingInsumo -> {
                if (insumo.getTipo() != null) {
                    existingInsumo.setTipo(insumo.getTipo());
                }
                if (insumo.getPrecioVenta() != null) {
                    existingInsumo.setPrecioVenta(insumo.getPrecioVenta());
                }
                if (insumo.getEsModificable() != null) {
                    existingInsumo.setEsModificable(insumo.getEsModificable());
                }

                return existingInsumo;
            })
            .map(insumoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, insumo.getId().toString())
        );
    }

    /**
     * {@code GET  /insumos} : get all the insumos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of insumos in body.
     */
    @GetMapping("/insumos")
    public List<Insumo> getAllInsumos() {
        log.debug("REST request to get all Insumos");
        return insumoRepository.findAll();
    }

    /**
     * {@code GET  /insumos/:id} : get the "id" insumo.
     *
     * @param id the id of the insumo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the insumo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/insumos/{id}")
    public ResponseEntity<Insumo> getInsumo(@PathVariable Long id) {
        log.debug("REST request to get Insumo : {}", id);
        Optional<Insumo> insumo = insumoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(insumo);
    }

    /**
     * {@code DELETE  /insumos/:id} : delete the "id" insumo.
     *
     * @param id the id of the insumo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/insumos/{id}")
    public ResponseEntity<Void> deleteInsumo(@PathVariable Long id) {
        log.debug("REST request to delete Insumo : {}", id);
        insumoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
