package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Enfermero;
import com.upcn.ssoc22.repository.EnfermeroRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Enfermero}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EnfermeroResource {

    private final Logger log = LoggerFactory.getLogger(EnfermeroResource.class);

    private static final String ENTITY_NAME = "enfermero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnfermeroRepository enfermeroRepository;

    public EnfermeroResource(EnfermeroRepository enfermeroRepository) {
        this.enfermeroRepository = enfermeroRepository;
    }

    /**
     * {@code POST  /enfermeros} : Create a new enfermero.
     *
     * @param enfermero the enfermero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enfermero, or with status {@code 400 (Bad Request)} if the enfermero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enfermeros")
    public ResponseEntity<Enfermero> createEnfermero(@RequestBody Enfermero enfermero) throws URISyntaxException {
        log.debug("REST request to save Enfermero : {}", enfermero);
        if (enfermero.getId() != null) {
            throw new BadRequestAlertException("A new enfermero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enfermero result = enfermeroRepository.save(enfermero);
        return ResponseEntity
            .created(new URI("/api/enfermeros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enfermeros/:id} : Updates an existing enfermero.
     *
     * @param id the id of the enfermero to save.
     * @param enfermero the enfermero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enfermero,
     * or with status {@code 400 (Bad Request)} if the enfermero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enfermero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enfermeros/{id}")
    public ResponseEntity<Enfermero> updateEnfermero(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Enfermero enfermero
    ) throws URISyntaxException {
        log.debug("REST request to update Enfermero : {}, {}", id, enfermero);
        if (enfermero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, enfermero.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!enfermeroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Enfermero result = enfermeroRepository.save(enfermero);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enfermero.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /enfermeros/:id} : Partial updates given fields of an existing enfermero, field will ignore if it is null
     *
     * @param id the id of the enfermero to save.
     * @param enfermero the enfermero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enfermero,
     * or with status {@code 400 (Bad Request)} if the enfermero is not valid,
     * or with status {@code 404 (Not Found)} if the enfermero is not found,
     * or with status {@code 500 (Internal Server Error)} if the enfermero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/enfermeros/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Enfermero> partialUpdateEnfermero(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Enfermero enfermero
    ) throws URISyntaxException {
        log.debug("REST request to partial update Enfermero partially : {}, {}", id, enfermero);
        if (enfermero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, enfermero.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!enfermeroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Enfermero> result = enfermeroRepository
            .findById(enfermero.getId())
            .map(existingEnfermero -> {
                if (enfermero.getNombre() != null) {
                    existingEnfermero.setNombre(enfermero.getNombre());
                }

                return existingEnfermero;
            })
            .map(enfermeroRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enfermero.getId().toString())
        );
    }

    /**
     * {@code GET  /enfermeros} : get all the enfermeros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enfermeros in body.
     */
    @GetMapping("/enfermeros")
    public List<Enfermero> getAllEnfermeros() {
        log.debug("REST request to get all Enfermeros");
        return enfermeroRepository.findAll();
    }

    /**
     * {@code GET  /enfermeros/:id} : get the "id" enfermero.
     *
     * @param id the id of the enfermero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enfermero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enfermeros/{id}")
    public ResponseEntity<Enfermero> getEnfermero(@PathVariable Long id) {
        log.debug("REST request to get Enfermero : {}", id);
        Optional<Enfermero> enfermero = enfermeroRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enfermero);
    }

    /**
     * {@code DELETE  /enfermeros/:id} : delete the "id" enfermero.
     *
     * @param id the id of the enfermero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enfermeros/{id}")
    public ResponseEntity<Void> deleteEnfermero(@PathVariable Long id) {
        log.debug("REST request to delete Enfermero : {}", id);
        enfermeroRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
