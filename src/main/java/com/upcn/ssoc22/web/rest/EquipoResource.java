package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Equipo;
import com.upcn.ssoc22.repository.EquipoRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Equipo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EquipoResource {

    private final Logger log = LoggerFactory.getLogger(EquipoResource.class);

    private static final String ENTITY_NAME = "equipo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EquipoRepository equipoRepository;

    public EquipoResource(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    /**
     * {@code POST  /equipos} : Create a new equipo.
     *
     * @param equipo the equipo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equipo, or with status {@code 400 (Bad Request)} if the equipo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equipos")
    public ResponseEntity<Equipo> createEquipo(@RequestBody Equipo equipo) throws URISyntaxException {
        log.debug("REST request to save Equipo : {}", equipo);
        if (equipo.getId() != null) {
            throw new BadRequestAlertException("A new equipo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Equipo result = equipoRepository.save(equipo);
        return ResponseEntity
            .created(new URI("/api/equipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equipos/:id} : Updates an existing equipo.
     *
     * @param id the id of the equipo to save.
     * @param equipo the equipo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipo,
     * or with status {@code 400 (Bad Request)} if the equipo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equipo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equipos/{id}")
    public ResponseEntity<Equipo> updateEquipo(@PathVariable(value = "id", required = false) final Long id, @RequestBody Equipo equipo)
        throws URISyntaxException {
        log.debug("REST request to update Equipo : {}, {}", id, equipo);
        if (equipo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, equipo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!equipoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Equipo result = equipoRepository.save(equipo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /equipos/:id} : Partial updates given fields of an existing equipo, field will ignore if it is null
     *
     * @param id the id of the equipo to save.
     * @param equipo the equipo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equipo,
     * or with status {@code 400 (Bad Request)} if the equipo is not valid,
     * or with status {@code 404 (Not Found)} if the equipo is not found,
     * or with status {@code 500 (Internal Server Error)} if the equipo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/equipos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Equipo> partialUpdateEquipo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Equipo equipo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Equipo partially : {}, {}", id, equipo);
        if (equipo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, equipo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!equipoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Equipo> result = equipoRepository
            .findById(equipo.getId())
            .map(existingEquipo -> {
                return existingEquipo;
            })
            .map(equipoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equipo.getId().toString())
        );
    }

    /**
     * {@code GET  /equipos} : get all the equipos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equipos in body.
     */
    @GetMapping("/equipos")
    public List<Equipo> getAllEquipos() {
        log.debug("REST request to get all Equipos");
        return equipoRepository.findAll();
    }

    /**
     * {@code GET  /equipos/:id} : get the "id" equipo.
     *
     * @param id the id of the equipo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equipo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equipos/{id}")
    public ResponseEntity<Equipo> getEquipo(@PathVariable Long id) {
        log.debug("REST request to get Equipo : {}", id);
        Optional<Equipo> equipo = equipoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(equipo);
    }

    /**
     * {@code DELETE  /equipos/:id} : delete the "id" equipo.
     *
     * @param id the id of the equipo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equipos/{id}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable Long id) {
        log.debug("REST request to delete Equipo : {}", id);
        equipoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
