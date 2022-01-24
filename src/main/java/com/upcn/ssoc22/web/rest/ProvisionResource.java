package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.repository.ProvisionRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Provision}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProvisionResource {

    private final Logger log = LoggerFactory.getLogger(ProvisionResource.class);

    private static final String ENTITY_NAME = "provision";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProvisionRepository provisionRepository;

    public ProvisionResource(ProvisionRepository provisionRepository) {
        this.provisionRepository = provisionRepository;
    }

    /**
     * {@code POST  /provisions} : Create a new provision.
     *
     * @param provision the provision to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new provision, or with status {@code 400 (Bad Request)} if the provision has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/provisions")
    public ResponseEntity<Provision> createProvision(@RequestBody Provision provision) throws URISyntaxException {
        log.debug("REST request to save Provision : {}", provision);
        if (provision.getId() != null) {
            throw new BadRequestAlertException("A new provision cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Provision result = provisionRepository.save(provision);
        return ResponseEntity
            .created(new URI("/api/provisions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /provisions/:id} : Updates an existing provision.
     *
     * @param id the id of the provision to save.
     * @param provision the provision to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provision,
     * or with status {@code 400 (Bad Request)} if the provision is not valid,
     * or with status {@code 500 (Internal Server Error)} if the provision couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/provisions/{id}")
    public ResponseEntity<Provision> updateProvision(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Provision provision
    ) throws URISyntaxException {
        log.debug("REST request to update Provision : {}, {}", id, provision);
        if (provision.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, provision.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!provisionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Provision result = provisionRepository.save(provision);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, provision.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /provisions/:id} : Partial updates given fields of an existing provision, field will ignore if it is null
     *
     * @param id the id of the provision to save.
     * @param provision the provision to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provision,
     * or with status {@code 400 (Bad Request)} if the provision is not valid,
     * or with status {@code 404 (Not Found)} if the provision is not found,
     * or with status {@code 500 (Internal Server Error)} if the provision couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/provisions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Provision> partialUpdateProvision(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Provision provision
    ) throws URISyntaxException {
        log.debug("REST request to partial update Provision partially : {}, {}", id, provision);
        if (provision.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, provision.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!provisionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Provision> result = provisionRepository
            .findById(provision.getId())
            .map(existingProvision -> {
                return existingProvision;
            })
            .map(provisionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, provision.getId().toString())
        );
    }

    /**
     * {@code GET  /provisions} : get all the provisions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of provisions in body.
     */
    @GetMapping("/provisions")
    public List<Provision> getAllProvisions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Provisions");
        return provisionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /provisions/:id} : get the "id" provision.
     *
     * @param id the id of the provision to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the provision, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/provisions/{id}")
    public ResponseEntity<Provision> getProvision(@PathVariable Long id) {
        log.debug("REST request to get Provision : {}", id);
        Optional<Provision> provision = provisionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(provision);
    }

    /**
     * {@code DELETE  /provisions/:id} : delete the "id" provision.
     *
     * @param id the id of the provision to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/provisions/{id}")
    public ResponseEntity<Void> deleteProvision(@PathVariable Long id) {
        log.debug("REST request to delete Provision : {}", id);
        provisionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
