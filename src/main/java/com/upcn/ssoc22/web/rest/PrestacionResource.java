package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Prestacion;
import com.upcn.ssoc22.repository.PrestacionRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Prestacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrestacionResource {

    private final Logger log = LoggerFactory.getLogger(PrestacionResource.class);

    private static final String ENTITY_NAME = "prestacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrestacionRepository prestacionRepository;

    public PrestacionResource(PrestacionRepository prestacionRepository) {
        this.prestacionRepository = prestacionRepository;
    }

    /**
     * {@code POST  /prestacions} : Create a new prestacion.
     *
     * @param prestacion the prestacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prestacion, or with status {@code 400 (Bad Request)} if the prestacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prestacions")
    public ResponseEntity<Prestacion> createPrestacion(@RequestBody Prestacion prestacion) throws URISyntaxException {
        log.debug("REST request to save Prestacion : {}", prestacion);
        if (prestacion.getId() != null) {
            throw new BadRequestAlertException("A new prestacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prestacion result = prestacionRepository.save(prestacion);
        return ResponseEntity
            .created(new URI("/api/prestacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prestacions/:id} : Updates an existing prestacion.
     *
     * @param id the id of the prestacion to save.
     * @param prestacion the prestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prestacion,
     * or with status {@code 400 (Bad Request)} if the prestacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prestacions/{id}")
    public ResponseEntity<Prestacion> updatePrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prestacion prestacion
    ) throws URISyntaxException {
        log.debug("REST request to update Prestacion : {}, {}", id, prestacion);
        if (prestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Prestacion result = prestacionRepository.save(prestacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prestacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /prestacions/:id} : Partial updates given fields of an existing prestacion, field will ignore if it is null
     *
     * @param id the id of the prestacion to save.
     * @param prestacion the prestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prestacion,
     * or with status {@code 400 (Bad Request)} if the prestacion is not valid,
     * or with status {@code 404 (Not Found)} if the prestacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the prestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/prestacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Prestacion> partialUpdatePrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prestacion prestacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Prestacion partially : {}, {}", id, prestacion);
        if (prestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Prestacion> result = prestacionRepository
            .findById(prestacion.getId())
            .map(existingPrestacion -> {
                if (prestacion.getTipo() != null) {
                    existingPrestacion.setTipo(prestacion.getTipo());
                }
                if (prestacion.getPrecio() != null) {
                    existingPrestacion.setPrecio(prestacion.getPrecio());
                }
                if (prestacion.getCarencia() != null) {
                    existingPrestacion.setCarencia(prestacion.getCarencia());
                }
                if (prestacion.getNombre() != null) {
                    existingPrestacion.setNombre(prestacion.getNombre());
                }
                if (prestacion.getCodigo() != null) {
                    existingPrestacion.setCodigo(prestacion.getCodigo());
                }

                return existingPrestacion;
            })
            .map(prestacionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prestacion.getId().toString())
        );
    }

    /**
     * {@code GET  /prestacions} : get all the prestacions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prestacions in body.
     */
    @GetMapping("/prestacions")
    public List<Prestacion> getAllPrestacions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Prestacions");
        return prestacionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /prestacions/:id} : get the "id" prestacion.
     *
     * @param id the id of the prestacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prestacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prestacions/{id}")
    public ResponseEntity<Prestacion> getPrestacion(@PathVariable Long id) {
        log.debug("REST request to get Prestacion : {}", id);
        Optional<Prestacion> prestacion = prestacionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(prestacion);
    }

    /**
     * {@code DELETE  /prestacions/:id} : delete the "id" prestacion.
     *
     * @param id the id of the prestacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prestacions/{id}")
    public ResponseEntity<Void> deletePrestacion(@PathVariable Long id) {
        log.debug("REST request to delete Prestacion : {}", id);
        prestacionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
