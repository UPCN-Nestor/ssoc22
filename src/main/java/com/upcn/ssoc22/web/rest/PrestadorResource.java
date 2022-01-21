package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Prestador;
import com.upcn.ssoc22.repository.PrestadorRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Prestador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrestadorResource {

    private final Logger log = LoggerFactory.getLogger(PrestadorResource.class);

    private static final String ENTITY_NAME = "prestador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrestadorRepository prestadorRepository;

    public PrestadorResource(PrestadorRepository prestadorRepository) {
        this.prestadorRepository = prestadorRepository;
    }

    /**
     * {@code POST  /prestadors} : Create a new prestador.
     *
     * @param prestador the prestador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prestador, or with status {@code 400 (Bad Request)} if the prestador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prestadors")
    public ResponseEntity<Prestador> createPrestador(@RequestBody Prestador prestador) throws URISyntaxException {
        log.debug("REST request to save Prestador : {}", prestador);
        if (prestador.getId() != null) {
            throw new BadRequestAlertException("A new prestador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prestador result = prestadorRepository.save(prestador);
        return ResponseEntity
            .created(new URI("/api/prestadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prestadors/:id} : Updates an existing prestador.
     *
     * @param id the id of the prestador to save.
     * @param prestador the prestador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prestador,
     * or with status {@code 400 (Bad Request)} if the prestador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prestador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prestadors/{id}")
    public ResponseEntity<Prestador> updatePrestador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prestador prestador
    ) throws URISyntaxException {
        log.debug("REST request to update Prestador : {}, {}", id, prestador);
        if (prestador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prestador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prestadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Prestador result = prestadorRepository.save(prestador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prestador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /prestadors/:id} : Partial updates given fields of an existing prestador, field will ignore if it is null
     *
     * @param id the id of the prestador to save.
     * @param prestador the prestador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prestador,
     * or with status {@code 400 (Bad Request)} if the prestador is not valid,
     * or with status {@code 404 (Not Found)} if the prestador is not found,
     * or with status {@code 500 (Internal Server Error)} if the prestador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/prestadors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Prestador> partialUpdatePrestador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prestador prestador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Prestador partially : {}, {}", id, prestador);
        if (prestador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prestador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prestadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Prestador> result = prestadorRepository
            .findById(prestador.getId())
            .map(existingPrestador -> {
                if (prestador.getNombre() != null) {
                    existingPrestador.setNombre(prestador.getNombre());
                }
                if (prestador.getCondicion() != null) {
                    existingPrestador.setCondicion(prestador.getCondicion());
                }

                return existingPrestador;
            })
            .map(prestadorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prestador.getId().toString())
        );
    }

    /**
     * {@code GET  /prestadors} : get all the prestadors.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prestadors in body.
     */
    @GetMapping("/prestadors")
    public List<Prestador> getAllPrestadors(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Prestadors");
        return prestadorRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /prestadors/:id} : get the "id" prestador.
     *
     * @param id the id of the prestador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prestador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prestadors/{id}")
    public ResponseEntity<Prestador> getPrestador(@PathVariable Long id) {
        log.debug("REST request to get Prestador : {}", id);
        Optional<Prestador> prestador = prestadorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(prestador);
    }

    /**
     * {@code DELETE  /prestadors/:id} : delete the "id" prestador.
     *
     * @param id the id of the prestador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prestadors/{id}")
    public ResponseEntity<Void> deletePrestador(@PathVariable Long id) {
        log.debug("REST request to delete Prestador : {}", id);
        prestadorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
