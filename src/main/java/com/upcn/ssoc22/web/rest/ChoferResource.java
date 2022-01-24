package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Chofer;
import com.upcn.ssoc22.repository.ChoferRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Chofer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChoferResource {

    private final Logger log = LoggerFactory.getLogger(ChoferResource.class);

    private static final String ENTITY_NAME = "chofer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChoferRepository choferRepository;

    public ChoferResource(ChoferRepository choferRepository) {
        this.choferRepository = choferRepository;
    }

    /**
     * {@code POST  /chofers} : Create a new chofer.
     *
     * @param chofer the chofer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chofer, or with status {@code 400 (Bad Request)} if the chofer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chofers")
    public ResponseEntity<Chofer> createChofer(@RequestBody Chofer chofer) throws URISyntaxException {
        log.debug("REST request to save Chofer : {}", chofer);
        if (chofer.getId() != null) {
            throw new BadRequestAlertException("A new chofer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chofer result = choferRepository.save(chofer);
        return ResponseEntity
            .created(new URI("/api/chofers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chofers/:id} : Updates an existing chofer.
     *
     * @param id the id of the chofer to save.
     * @param chofer the chofer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chofer,
     * or with status {@code 400 (Bad Request)} if the chofer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chofer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chofers/{id}")
    public ResponseEntity<Chofer> updateChofer(@PathVariable(value = "id", required = false) final Long id, @RequestBody Chofer chofer)
        throws URISyntaxException {
        log.debug("REST request to update Chofer : {}, {}", id, chofer);
        if (chofer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chofer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!choferRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Chofer result = choferRepository.save(chofer);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chofer.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chofers/:id} : Partial updates given fields of an existing chofer, field will ignore if it is null
     *
     * @param id the id of the chofer to save.
     * @param chofer the chofer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chofer,
     * or with status {@code 400 (Bad Request)} if the chofer is not valid,
     * or with status {@code 404 (Not Found)} if the chofer is not found,
     * or with status {@code 500 (Internal Server Error)} if the chofer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chofers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Chofer> partialUpdateChofer(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Chofer chofer
    ) throws URISyntaxException {
        log.debug("REST request to partial update Chofer partially : {}, {}", id, chofer);
        if (chofer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chofer.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!choferRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Chofer> result = choferRepository
            .findById(chofer.getId())
            .map(existingChofer -> {
                if (chofer.getNombre() != null) {
                    existingChofer.setNombre(chofer.getNombre());
                }

                return existingChofer;
            })
            .map(choferRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, chofer.getId().toString())
        );
    }

    /**
     * {@code GET  /chofers} : get all the chofers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chofers in body.
     */
    @GetMapping("/chofers")
    public List<Chofer> getAllChofers() {
        log.debug("REST request to get all Chofers");
        return choferRepository.findAll();
    }

    /**
     * {@code GET  /chofers/:id} : get the "id" chofer.
     *
     * @param id the id of the chofer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chofer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chofers/{id}")
    public ResponseEntity<Chofer> getChofer(@PathVariable Long id) {
        log.debug("REST request to get Chofer : {}", id);
        Optional<Chofer> chofer = choferRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chofer);
    }

    /**
     * {@code DELETE  /chofers/:id} : delete the "id" chofer.
     *
     * @param id the id of the chofer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chofers/{id}")
    public ResponseEntity<Void> deleteChofer(@PathVariable Long id) {
        log.debug("REST request to delete Chofer : {}", id);
        choferRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
