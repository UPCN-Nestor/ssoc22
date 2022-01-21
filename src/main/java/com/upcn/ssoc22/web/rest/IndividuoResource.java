package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Individuo;
import com.upcn.ssoc22.repository.IndividuoRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Individuo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IndividuoResource {

    private final Logger log = LoggerFactory.getLogger(IndividuoResource.class);

    private static final String ENTITY_NAME = "individuo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IndividuoRepository individuoRepository;

    public IndividuoResource(IndividuoRepository individuoRepository) {
        this.individuoRepository = individuoRepository;
    }

    /**
     * {@code POST  /individuos} : Create a new individuo.
     *
     * @param individuo the individuo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new individuo, or with status {@code 400 (Bad Request)} if the individuo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/individuos")
    public ResponseEntity<Individuo> createIndividuo(@RequestBody Individuo individuo) throws URISyntaxException {
        log.debug("REST request to save Individuo : {}", individuo);
        if (individuo.getId() != null) {
            throw new BadRequestAlertException("A new individuo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Individuo result = individuoRepository.save(individuo);
        return ResponseEntity
            .created(new URI("/api/individuos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /individuos/:id} : Updates an existing individuo.
     *
     * @param id the id of the individuo to save.
     * @param individuo the individuo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated individuo,
     * or with status {@code 400 (Bad Request)} if the individuo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the individuo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/individuos/{id}")
    public ResponseEntity<Individuo> updateIndividuo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Individuo individuo
    ) throws URISyntaxException {
        log.debug("REST request to update Individuo : {}, {}", id, individuo);
        if (individuo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, individuo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!individuoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Individuo result = individuoRepository.save(individuo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, individuo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /individuos/:id} : Partial updates given fields of an existing individuo, field will ignore if it is null
     *
     * @param id the id of the individuo to save.
     * @param individuo the individuo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated individuo,
     * or with status {@code 400 (Bad Request)} if the individuo is not valid,
     * or with status {@code 404 (Not Found)} if the individuo is not found,
     * or with status {@code 500 (Internal Server Error)} if the individuo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/individuos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Individuo> partialUpdateIndividuo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Individuo individuo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Individuo partially : {}, {}", id, individuo);
        if (individuo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, individuo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!individuoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Individuo> result = individuoRepository
            .findById(individuo.getId())
            .map(existingIndividuo -> {
                if (individuo.getNombre() != null) {
                    existingIndividuo.setNombre(individuo.getNombre());
                }
                if (individuo.getDni() != null) {
                    existingIndividuo.setDni(individuo.getDni());
                }

                return existingIndividuo;
            })
            .map(individuoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, individuo.getId().toString())
        );
    }

    /**
     * {@code GET  /individuos} : get all the individuos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of individuos in body.
     */
    @GetMapping("/individuos")
    public List<Individuo> getAllIndividuos() {
        log.debug("REST request to get all Individuos");
        return individuoRepository.findAll();
    }

    /**
     * {@code GET  /individuos/:id} : get the "id" individuo.
     *
     * @param id the id of the individuo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the individuo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/individuos/{id}")
    public ResponseEntity<Individuo> getIndividuo(@PathVariable Long id) {
        log.debug("REST request to get Individuo : {}", id);
        Optional<Individuo> individuo = individuoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(individuo);
    }

    /**
     * {@code DELETE  /individuos/:id} : delete the "id" individuo.
     *
     * @param id the id of the individuo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/individuos/{id}")
    public ResponseEntity<Void> deleteIndividuo(@PathVariable Long id) {
        log.debug("REST request to delete Individuo : {}", id);
        individuoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
