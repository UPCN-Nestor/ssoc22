package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ReglaPrestacionRepository;
import com.upcn.ssoc22.service.ReglaPrestacionService;
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
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.upcn.ssoc22.domain.ReglaPrestacion}.
 */
@RestController
@RequestMapping("/api")
public class ReglaPrestacionResource {

    private final Logger log = LoggerFactory.getLogger(ReglaPrestacionResource.class);

    private static final String ENTITY_NAME = "reglaPrestacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReglaPrestacionService reglaPrestacionService;

    private final ReglaPrestacionRepository reglaPrestacionRepository;

    public ReglaPrestacionResource(ReglaPrestacionService reglaPrestacionService, ReglaPrestacionRepository reglaPrestacionRepository) {
        this.reglaPrestacionService = reglaPrestacionService;
        this.reglaPrestacionRepository = reglaPrestacionRepository;
    }

    /**
     * {@code POST  /regla-prestacions} : Create a new reglaPrestacion.
     *
     * @param reglaPrestacion the reglaPrestacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reglaPrestacion, or with status {@code 400 (Bad Request)} if the reglaPrestacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/regla-prestacions")
    public ResponseEntity<ReglaPrestacion> createReglaPrestacion(@RequestBody ReglaPrestacion reglaPrestacion) throws URISyntaxException {
        log.debug("REST request to save ReglaPrestacion : {}", reglaPrestacion);
        if (reglaPrestacion.getId() != null) {
            throw new BadRequestAlertException("A new reglaPrestacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReglaPrestacion result = reglaPrestacionService.save(reglaPrestacion);
        return ResponseEntity
            .created(new URI("/api/regla-prestacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /regla-prestacions/:id} : Updates an existing reglaPrestacion.
     *
     * @param id the id of the reglaPrestacion to save.
     * @param reglaPrestacion the reglaPrestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reglaPrestacion,
     * or with status {@code 400 (Bad Request)} if the reglaPrestacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reglaPrestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/regla-prestacions/{id}")
    public ResponseEntity<ReglaPrestacion> updateReglaPrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReglaPrestacion reglaPrestacion
    ) throws URISyntaxException {
        log.debug("REST request to update ReglaPrestacion : {}, {}", id, reglaPrestacion);
        if (reglaPrestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reglaPrestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reglaPrestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReglaPrestacion result = reglaPrestacionService.save(reglaPrestacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reglaPrestacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /regla-prestacions/:id} : Partial updates given fields of an existing reglaPrestacion, field will ignore if it is null
     *
     * @param id the id of the reglaPrestacion to save.
     * @param reglaPrestacion the reglaPrestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reglaPrestacion,
     * or with status {@code 400 (Bad Request)} if the reglaPrestacion is not valid,
     * or with status {@code 404 (Not Found)} if the reglaPrestacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the reglaPrestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/regla-prestacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReglaPrestacion> partialUpdateReglaPrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReglaPrestacion reglaPrestacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update ReglaPrestacion partially : {}, {}", id, reglaPrestacion);
        if (reglaPrestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reglaPrestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reglaPrestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReglaPrestacion> result = reglaPrestacionService.partialUpdate(reglaPrestacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reglaPrestacion.getId().toString())
        );
    }

    /**
     * {@code GET  /regla-prestacions} : get all the reglaPrestacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reglaPrestacions in body.
     */
    @GetMapping("/regla-prestacions")
    public List<ReglaPrestacion> getAllReglaPrestacions() {
        log.debug("REST request to get all ReglaPrestacions");
        return reglaPrestacionService.findAll();
    }

    /**
     * {@code GET  /regla-prestacions/:id} : get the "id" reglaPrestacion.
     *
     * @param id the id of the reglaPrestacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reglaPrestacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/regla-prestacions/{id}")
    public ResponseEntity<ReglaPrestacion> getReglaPrestacion(@PathVariable Long id) {
        log.debug("REST request to get ReglaPrestacion : {}", id);
        Optional<ReglaPrestacion> reglaPrestacion = reglaPrestacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reglaPrestacion);
    }

    /**
     * {@code DELETE  /regla-prestacions/:id} : delete the "id" reglaPrestacion.
     *
     * @param id the id of the reglaPrestacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/regla-prestacions/{id}")
    public ResponseEntity<Void> deleteReglaPrestacion(@PathVariable Long id) {
        log.debug("REST request to delete ReglaPrestacion : {}", id);
        reglaPrestacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
