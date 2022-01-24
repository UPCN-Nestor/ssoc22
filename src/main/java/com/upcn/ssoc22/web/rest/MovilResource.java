package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Movil;
import com.upcn.ssoc22.repository.MovilRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Movil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MovilResource {

    private final Logger log = LoggerFactory.getLogger(MovilResource.class);

    private static final String ENTITY_NAME = "movil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovilRepository movilRepository;

    public MovilResource(MovilRepository movilRepository) {
        this.movilRepository = movilRepository;
    }

    /**
     * {@code POST  /movils} : Create a new movil.
     *
     * @param movil the movil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movil, or with status {@code 400 (Bad Request)} if the movil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movils")
    public ResponseEntity<Movil> createMovil(@RequestBody Movil movil) throws URISyntaxException {
        log.debug("REST request to save Movil : {}", movil);
        if (movil.getId() != null) {
            throw new BadRequestAlertException("A new movil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movil result = movilRepository.save(movil);
        return ResponseEntity
            .created(new URI("/api/movils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movils/:id} : Updates an existing movil.
     *
     * @param id the id of the movil to save.
     * @param movil the movil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movil,
     * or with status {@code 400 (Bad Request)} if the movil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movils/{id}")
    public ResponseEntity<Movil> updateMovil(@PathVariable(value = "id", required = false) final Long id, @RequestBody Movil movil)
        throws URISyntaxException {
        log.debug("REST request to update Movil : {}, {}", id, movil);
        if (movil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Movil result = movilRepository.save(movil);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movil.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movils/:id} : Partial updates given fields of an existing movil, field will ignore if it is null
     *
     * @param id the id of the movil to save.
     * @param movil the movil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movil,
     * or with status {@code 400 (Bad Request)} if the movil is not valid,
     * or with status {@code 404 (Not Found)} if the movil is not found,
     * or with status {@code 500 (Internal Server Error)} if the movil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movils/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Movil> partialUpdateMovil(@PathVariable(value = "id", required = false) final Long id, @RequestBody Movil movil)
        throws URISyntaxException {
        log.debug("REST request to partial update Movil partially : {}, {}", id, movil);
        if (movil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Movil> result = movilRepository
            .findById(movil.getId())
            .map(existingMovil -> {
                if (movil.getNumero() != null) {
                    existingMovil.setNumero(movil.getNumero());
                }

                return existingMovil;
            })
            .map(movilRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movil.getId().toString())
        );
    }

    /**
     * {@code GET  /movils} : get all the movils.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movils in body.
     */
    @GetMapping("/movils")
    public List<Movil> getAllMovils() {
        log.debug("REST request to get all Movils");
        return movilRepository.findAll();
    }

    /**
     * {@code GET  /movils/:id} : get the "id" movil.
     *
     * @param id the id of the movil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movils/{id}")
    public ResponseEntity<Movil> getMovil(@PathVariable Long id) {
        log.debug("REST request to get Movil : {}", id);
        Optional<Movil> movil = movilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movil);
    }

    /**
     * {@code DELETE  /movils/:id} : delete the "id" movil.
     *
     * @param id the id of the movil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movils/{id}")
    public ResponseEntity<Void> deleteMovil(@PathVariable Long id) {
        log.debug("REST request to delete Movil : {}", id);
        movilRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
