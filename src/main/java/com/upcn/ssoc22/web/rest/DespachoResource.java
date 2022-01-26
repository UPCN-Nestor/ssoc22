package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.Despacho;
import com.upcn.ssoc22.domain.User;
import com.upcn.ssoc22.repository.DespachoRepository;
import com.upcn.ssoc22.service.UserService;
import com.upcn.ssoc22.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.upcn.ssoc22.domain.Despacho}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DespachoResource {

    private final Logger log = LoggerFactory.getLogger(DespachoResource.class);

    private static final String ENTITY_NAME = "despacho";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DespachoRepository despachoRepository;
    private final UserService userService;

    public DespachoResource(DespachoRepository despachoRepository, UserService userService) {
        this.userService = userService;
        this.despachoRepository = despachoRepository;
    }

    /**
     * {@code POST  /despachos} : Create a new despacho.
     *
     * @param despacho the despacho to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new despacho, or with status {@code 400 (Bad Request)} if the despacho has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/despachos")
    public ResponseEntity<Despacho> createDespacho(@RequestBody Despacho despacho) throws URISyntaxException {
        log.debug("REST request to save Despacho : {}", despacho);
        if (despacho.getId() != null) {
            throw new BadRequestAlertException("A new despacho cannot already have an ID", ENTITY_NAME, "idexists");
        }
        despacho.setUsuarioSalida(userService.getUserWithAuthorities().get());
        Despacho result = despachoRepository.save(despacho);
        return ResponseEntity
            .created(new URI("/api/despachos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /despachos/:id} : Updates an existing despacho.
     *
     * @param id the id of the despacho to save.
     * @param despacho the despacho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated despacho,
     * or with status {@code 400 (Bad Request)} if the despacho is not valid,
     * or with status {@code 500 (Internal Server Error)} if the despacho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/despachos/{id}")
    public ResponseEntity<Despacho> updateDespacho(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Despacho despacho
    ) throws URISyntaxException {
        log.debug("REST request to update Despacho : {}, {}", id, despacho);
        if (despacho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, despacho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!despachoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Despacho result = despachoRepository.save(despacho);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, despacho.getId().toString()))
            .body(result);
    }

    @PutMapping("/despachos/{id}/res/{campoResponsable}")
    public ResponseEntity<Despacho> updateDespachoConResponsableLogueado(
        @PathVariable(value = "id", required = false) final Long id,
        @PathVariable final String campoResponsable,
        @RequestBody Despacho despacho
    ) throws URISyntaxException {
        User responsable = userService.getUserWithAuthorities().get();
        if (campoResponsable.equals("Salida")) despacho.setUsuarioSalida(responsable);
        if (campoResponsable.equals("Llegada")) despacho.setUsuarioLlegada(responsable);
        if (campoResponsable.equals("Libre")) despacho.setUsuarioLibre(responsable);

        return updateDespacho(id, despacho);
    }

    /**
     * {@code PATCH  /despachos/:id} : Partial updates given fields of an existing despacho, field will ignore if it is null
     *
     * @param id the id of the despacho to save.
     * @param despacho the despacho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated despacho,
     * or with status {@code 400 (Bad Request)} if the despacho is not valid,
     * or with status {@code 404 (Not Found)} if the despacho is not found,
     * or with status {@code 500 (Internal Server Error)} if the despacho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/despachos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Despacho> partialUpdateDespacho(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Despacho despacho
    ) throws URISyntaxException {
        log.debug("REST request to partial update Despacho partially : {}, {}", id, despacho);
        if (despacho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, despacho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!despachoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Despacho> result = despachoRepository
            .findById(despacho.getId())
            .map(existingDespacho -> {
                if (despacho.getHoraSalida() != null) {
                    existingDespacho.setHoraSalida(despacho.getHoraSalida());
                }
                if (despacho.getHoraLlegada() != null) {
                    existingDespacho.setHoraLlegada(despacho.getHoraLlegada());
                }
                if (despacho.getHoraLibre() != null) {
                    existingDespacho.setHoraLibre(despacho.getHoraLibre());
                }

                return existingDespacho;
            })
            .map(despachoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, despacho.getId().toString())
        );
    }

    /**
     * {@code GET  /despachos} : get all the despachos.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of despachos in body.
     */
    @GetMapping("/despachos")
    public List<Despacho> getAllDespachos(@RequestParam(required = false) String filter) {
        if ("solicitudprestacion-is-null".equals(filter)) {
            log.debug("REST request to get all Despachos where solicitudPrestacion is null");
            return StreamSupport
                .stream(despachoRepository.findAll().spliterator(), false)
                .filter(despacho -> despacho.getSolicitudPrestacion() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Despachos");
        return despachoRepository.findAll();
    }

    /**
     * {@code GET  /despachos/:id} : get the "id" despacho.
     *
     * @param id the id of the despacho to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the despacho, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/despachos/{id}")
    public ResponseEntity<Despacho> getDespacho(@PathVariable Long id) {
        log.debug("REST request to get Despacho : {}", id);
        Optional<Despacho> despacho = despachoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(despacho);
    }

    /**
     * {@code DELETE  /despachos/:id} : delete the "id" despacho.
     *
     * @param id the id of the despacho to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/despachos/{id}")
    public ResponseEntity<Void> deleteDespacho(@PathVariable Long id) {
        log.debug("REST request to delete Despacho : {}", id);
        despachoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
