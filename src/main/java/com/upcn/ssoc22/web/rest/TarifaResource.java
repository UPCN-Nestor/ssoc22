package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Tarifa;
import com.upcn.ssoc22.repository.TarifaRepository;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.Tarifa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TarifaResource {

    private final Logger log = LoggerFactory.getLogger(TarifaResource.class);

    private static final String ENTITY_NAME = "tarifa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TarifaRepository tarifaRepository;

    public TarifaResource(TarifaRepository tarifaRepository) {
        this.tarifaRepository = tarifaRepository;
    }

    /**
     * {@code POST  /tarifas} : Create a new tarifa.
     *
     * @param tarifa the tarifa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tarifa, or with status {@code 400 (Bad Request)} if the tarifa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tarifas")
    public ResponseEntity<Tarifa> createTarifa(@RequestBody Tarifa tarifa) throws URISyntaxException {
        log.debug("REST request to save Tarifa : {}", tarifa);
        if (tarifa.getId() != null) {
            throw new BadRequestAlertException("A new tarifa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tarifa result = tarifaRepository.save(tarifa);
        return ResponseEntity
            .created(new URI("/api/tarifas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tarifas/:id} : Updates an existing tarifa.
     *
     * @param id the id of the tarifa to save.
     * @param tarifa the tarifa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifa,
     * or with status {@code 400 (Bad Request)} if the tarifa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tarifa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tarifas/{id}")
    public ResponseEntity<Tarifa> updateTarifa(@PathVariable(value = "id", required = false) final Long id, @RequestBody Tarifa tarifa)
        throws URISyntaxException {
        log.debug("REST request to update Tarifa : {}, {}", id, tarifa);
        if (tarifa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Tarifa result = tarifaRepository.save(tarifa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tarifas/:id} : Partial updates given fields of an existing tarifa, field will ignore if it is null
     *
     * @param id the id of the tarifa to save.
     * @param tarifa the tarifa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifa,
     * or with status {@code 400 (Bad Request)} if the tarifa is not valid,
     * or with status {@code 404 (Not Found)} if the tarifa is not found,
     * or with status {@code 500 (Internal Server Error)} if the tarifa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tarifas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Tarifa> partialUpdateTarifa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Tarifa tarifa
    ) throws URISyntaxException {
        log.debug("REST request to partial update Tarifa partially : {}, {}", id, tarifa);
        if (tarifa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Tarifa> result = tarifaRepository
            .findById(tarifa.getId())
            .map(existingTarifa -> {
                if (tarifa.getTipo() != null) {
                    existingTarifa.setTipo(tarifa.getTipo());
                }
                if (tarifa.getDatos() != null) {
                    existingTarifa.setDatos(tarifa.getDatos());
                }
                if (tarifa.getVigenciaHasta() != null) {
                    existingTarifa.setVigenciaHasta(tarifa.getVigenciaHasta());
                }

                return existingTarifa;
            })
            .map(tarifaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifa.getId().toString())
        );
    }

    /**
     * {@code GET  /tarifas} : get all the tarifas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tarifas in body.
     */
    @GetMapping("/tarifas")
    public List<Tarifa> getAllTarifas() {
        log.debug("REST request to get all Tarifas");
        return tarifaRepository.findAll();
    }

    /**
     * {@code GET  /tarifas/:id} : get the "id" tarifa.
     *
     * @param id the id of the tarifa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tarifa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tarifas/{id}")
    public ResponseEntity<Tarifa> getTarifa(@PathVariable Long id) {
        log.debug("REST request to get Tarifa : {}", id);
        Optional<Tarifa> tarifa = tarifaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarifa);
    }

    /**
     * {@code DELETE  /tarifas/:id} : delete the "id" tarifa.
     *
     * @param id the id of the tarifa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tarifas/{id}")
    public ResponseEntity<Void> deleteTarifa(@PathVariable Long id) {
        log.debug("REST request to delete Tarifa : {}", id);
        tarifaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
