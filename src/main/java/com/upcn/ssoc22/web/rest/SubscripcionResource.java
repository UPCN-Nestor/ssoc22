package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Subscripcion;
import com.upcn.ssoc22.repository.SubscripcionRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Subscripcion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscripcionResource {

    private final Logger log = LoggerFactory.getLogger(SubscripcionResource.class);

    private static final String ENTITY_NAME = "subscripcion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscripcionRepository subscripcionRepository;

    public SubscripcionResource(SubscripcionRepository subscripcionRepository) {
        this.subscripcionRepository = subscripcionRepository;
    }

    /**
     * {@code POST  /subscripcions} : Create a new subscripcion.
     *
     * @param subscripcion the subscripcion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscripcion, or with status {@code 400 (Bad Request)} if the subscripcion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscripcions")
    public ResponseEntity<Subscripcion> createSubscripcion(@RequestBody Subscripcion subscripcion) throws URISyntaxException {
        log.debug("REST request to save Subscripcion : {}", subscripcion);
        if (subscripcion.getId() != null) {
            throw new BadRequestAlertException("A new subscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subscripcion result = subscripcionRepository.save(subscripcion);
        return ResponseEntity
            .created(new URI("/api/subscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscripcions/:id} : Updates an existing subscripcion.
     *
     * @param id the id of the subscripcion to save.
     * @param subscripcion the subscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscripcion,
     * or with status {@code 400 (Bad Request)} if the subscripcion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscripcions/{id}")
    public ResponseEntity<Subscripcion> updateSubscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Subscripcion subscripcion
    ) throws URISyntaxException {
        log.debug("REST request to update Subscripcion : {}, {}", id, subscripcion);
        if (subscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Subscripcion result = subscripcionRepository.save(subscripcion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscripcion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /subscripcions/:id} : Partial updates given fields of an existing subscripcion, field will ignore if it is null
     *
     * @param id the id of the subscripcion to save.
     * @param subscripcion the subscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscripcion,
     * or with status {@code 400 (Bad Request)} if the subscripcion is not valid,
     * or with status {@code 404 (Not Found)} if the subscripcion is not found,
     * or with status {@code 500 (Internal Server Error)} if the subscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/subscripcions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Subscripcion> partialUpdateSubscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Subscripcion subscripcion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Subscripcion partially : {}, {}", id, subscripcion);
        if (subscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Subscripcion> result = subscripcionRepository
            .findById(subscripcion.getId())
            .map(existingSubscripcion -> {
                if (subscripcion.getFechaAlta() != null) {
                    existingSubscripcion.setFechaAlta(subscripcion.getFechaAlta());
                }
                if (subscripcion.getParticularidades() != null) {
                    existingSubscripcion.setParticularidades(subscripcion.getParticularidades());
                }

                return existingSubscripcion;
            })
            .map(subscripcionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscripcion.getId().toString())
        );
    }

    /**
     * {@code GET  /subscripcions} : get all the subscripcions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscripcions in body.
     */
    @GetMapping("/subscripcions")
    public List<Subscripcion> getAllSubscripcions() {
        log.debug("REST request to get all Subscripcions");
        return subscripcionRepository.findAll();
    }

    /**
     * {@code GET  /subscripcions/:id} : get the "id" subscripcion.
     *
     * @param id the id of the subscripcion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscripcion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscripcions/{id}")
    public ResponseEntity<Subscripcion> getSubscripcion(@PathVariable Long id) {
        log.debug("REST request to get Subscripcion : {}", id);
        Optional<Subscripcion> subscripcion = subscripcionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscripcion);
    }

    /**
     * {@code DELETE  /subscripcions/:id} : delete the "id" subscripcion.
     *
     * @param id the id of the subscripcion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscripcions/{id}")
    public ResponseEntity<Void> deleteSubscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Subscripcion : {}", id);
        subscripcionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
