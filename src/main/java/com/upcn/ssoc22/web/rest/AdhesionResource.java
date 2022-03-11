package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.service.AdhesionService;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Adhesion}.
 */
@RestController
@RequestMapping("/api")
public class AdhesionResource {

    private final Logger log = LoggerFactory.getLogger(AdhesionResource.class);

    private static final String ENTITY_NAME = "adhesion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdhesionService adhesionService;

    public AdhesionResource(AdhesionService adhesionService) {
        this.adhesionService = adhesionService;
    }

    /**
     * {@code POST  /adhesions} : Create a new adhesion.
     *
     * @param adhesion the adhesion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new adhesion, or with status {@code 400 (Bad Request)} if the adhesion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/adhesions")
    public ResponseEntity<Adhesion> createAdhesion(@RequestBody Adhesion adhesion) throws URISyntaxException {
        log.debug("REST request to save Adhesion : {}", adhesion);
        if (adhesion.getId() != null) {
            throw new BadRequestAlertException("A new adhesion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Adhesion result = adhesionService.save(adhesion);
        return ResponseEntity
            .created(new URI("/api/adhesions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /adhesions/:id} : Updates an existing adhesion.
     *
     * @param id the id of the adhesion to save.
     * @param adhesion the adhesion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adhesion,
     * or with status {@code 400 (Bad Request)} if the adhesion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the adhesion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/adhesions/{id}")
    public ResponseEntity<Adhesion> updateAdhesion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Adhesion adhesion
    ) throws URISyntaxException {
        log.debug("REST request to update Adhesion : {}, {}", id, adhesion);
        if (adhesion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adhesion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        Adhesion result = adhesionService.save(adhesion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adhesion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /adhesions/:id} : Partial updates given fields of an existing adhesion, field will ignore if it is null
     *
     * @param id the id of the adhesion to save.
     * @param adhesion the adhesion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adhesion,
     * or with status {@code 400 (Bad Request)} if the adhesion is not valid,
     * or with status {@code 404 (Not Found)} if the adhesion is not found,
     * or with status {@code 500 (Internal Server Error)} if the adhesion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/adhesions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Adhesion> partialUpdateAdhesion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Adhesion adhesion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Adhesion partially : {}, {}", id, adhesion);
        if (adhesion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adhesion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        Optional<Adhesion> result = adhesionService.partialUpdate(adhesion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, adhesion.getId().toString())
        );
    }

    /**
     * {@code GET  /adhesions} : get all the adhesions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of adhesions in body.
     */
    @GetMapping("/adhesions")
    public List<Adhesion> getAllAdhesions() {
        log.debug("REST request to get all Adhesions");
        return adhesionService.findAll();
    }

    @GetMapping("/adhesions/cliente/{idcliente}")
    public List<Adhesion> getAllVigentesByClienteId(@PathVariable Long idcliente) {
        log.debug("REST request to get all Adhesions");
        return adhesionService.findAllVigentesByClienteId(idcliente);
    }

    /**
     * {@code GET  /adhesions/:id} : get the "id" adhesion.
     *
     * @param id the id of the adhesion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the adhesion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/adhesions/{id}")
    public ResponseEntity<Adhesion> getAdhesion(@PathVariable Long id) {
        log.debug("REST request to get Adhesion : {}", id);
        Optional<Adhesion> adhesion = adhesionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(adhesion);
    }

    /**
     * {@code DELETE  /adhesions/:id} : delete the "id" adhesion.
     *
     * @param id the id of the adhesion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/adhesions/{id}")
    public ResponseEntity<Void> deleteAdhesion(@PathVariable Long id) {
        log.debug("REST request to delete Adhesion : {}", id);
        adhesionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
