package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.SolicitudPrestacion;
import com.upcn.ssoc22.repository.SolicitudPrestacionRepository;
import com.upcn.ssoc22.service.UserService;
import com.upcn.ssoc22.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
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
 * REST controller for managing {@link com.upcn.ssoc22.domain.SolicitudPrestacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SolicitudPrestacionResource {

    private final Logger log = LoggerFactory.getLogger(SolicitudPrestacionResource.class);

    private static final String ENTITY_NAME = "solicitudPrestacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolicitudPrestacionRepository solicitudPrestacionRepository;
    private final UserService userService;

    public SolicitudPrestacionResource(SolicitudPrestacionRepository solicitudPrestacionRepository, UserService userService) {
        this.solicitudPrestacionRepository = solicitudPrestacionRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /solicitud-prestacions} : Create a new solicitudPrestacion.
     *
     * @param solicitudPrestacion the solicitudPrestacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solicitudPrestacion, or with status {@code 400 (Bad Request)} if the solicitudPrestacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solicitud-prestacions")
    public ResponseEntity<SolicitudPrestacion> createSolicitudPrestacion(@RequestBody SolicitudPrestacion solicitudPrestacion)
        throws URISyntaxException {
        log.debug("REST request to save SolicitudPrestacion : {}", solicitudPrestacion);
        if (solicitudPrestacion.getId() != null) {
            throw new BadRequestAlertException("A new solicitudPrestacion cannot already have an ID", ENTITY_NAME, "idexists");
        }

        solicitudPrestacion.setHoraSolicitud(ZonedDateTime.now());
        solicitudPrestacion.setUsuarioSolicitud(userService.getUserWithAuthorities().get());

        SolicitudPrestacion result = solicitudPrestacionRepository.save(solicitudPrestacion);
        return ResponseEntity
            .created(new URI("/api/solicitud-prestacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solicitud-prestacions/:id} : Updates an existing solicitudPrestacion.
     *
     * @param id the id of the solicitudPrestacion to save.
     * @param solicitudPrestacion the solicitudPrestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitudPrestacion,
     * or with status {@code 400 (Bad Request)} if the solicitudPrestacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solicitudPrestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solicitud-prestacions/{id}")
    public ResponseEntity<SolicitudPrestacion> updateSolicitudPrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitudPrestacion solicitudPrestacion
    ) throws URISyntaxException {
        log.debug("REST request to update SolicitudPrestacion : {}, {}", id, solicitudPrestacion);
        if (solicitudPrestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitudPrestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitudPrestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SolicitudPrestacion result = solicitudPrestacionRepository.save(solicitudPrestacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitudPrestacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /solicitud-prestacions/:id} : Partial updates given fields of an existing solicitudPrestacion, field will ignore if it is null
     *
     * @param id the id of the solicitudPrestacion to save.
     * @param solicitudPrestacion the solicitudPrestacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitudPrestacion,
     * or with status {@code 400 (Bad Request)} if the solicitudPrestacion is not valid,
     * or with status {@code 404 (Not Found)} if the solicitudPrestacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the solicitudPrestacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/solicitud-prestacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SolicitudPrestacion> partialUpdateSolicitudPrestacion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitudPrestacion solicitudPrestacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update SolicitudPrestacion partially : {}, {}", id, solicitudPrestacion);
        if (solicitudPrestacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitudPrestacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitudPrestacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SolicitudPrestacion> result = solicitudPrestacionRepository
            .findById(solicitudPrestacion.getId())
            .map(existingSolicitudPrestacion -> {
                if (solicitudPrestacion.getTipo() != null) {
                    existingSolicitudPrestacion.setTipo(solicitudPrestacion.getTipo());
                }
                if (solicitudPrestacion.getNumero() != null) {
                    existingSolicitudPrestacion.setNumero(solicitudPrestacion.getNumero());
                }
                if (solicitudPrestacion.getHoraSolicitud() != null) {
                    existingSolicitudPrestacion.setHoraSolicitud(solicitudPrestacion.getHoraSolicitud());
                }
                if (solicitudPrestacion.getDomicilio() != null) {
                    existingSolicitudPrestacion.setDomicilio(solicitudPrestacion.getDomicilio());
                }
                if (solicitudPrestacion.getTelefono() != null) {
                    existingSolicitudPrestacion.setTelefono(solicitudPrestacion.getTelefono());
                }
                if (solicitudPrestacion.getEdad() != null) {
                    existingSolicitudPrestacion.setEdad(solicitudPrestacion.getEdad());
                }
                if (solicitudPrestacion.getMotivoLlamado() != null) {
                    existingSolicitudPrestacion.setMotivoLlamado(solicitudPrestacion.getMotivoLlamado());
                }
                if (solicitudPrestacion.getSeEfectuo() != null) {
                    existingSolicitudPrestacion.setSeEfectuo(solicitudPrestacion.getSeEfectuo());
                }
                if (solicitudPrestacion.getInternacion() != null) {
                    existingSolicitudPrestacion.setInternacion(solicitudPrestacion.getInternacion());
                }
                if (solicitudPrestacion.getObservaciones() != null) {
                    existingSolicitudPrestacion.setObservaciones(solicitudPrestacion.getObservaciones());
                }
                if (solicitudPrestacion.getIndividuoAdhoc() != null) {
                    existingSolicitudPrestacion.setIndividuoAdhoc(solicitudPrestacion.getIndividuoAdhoc());
                }

                return existingSolicitudPrestacion;
            })
            .map(solicitudPrestacionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitudPrestacion.getId().toString())
        );
    }

    /**
     * {@code GET  /solicitud-prestacions} : get all the solicitudPrestacions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solicitudPrestacions in body.
     */
    @GetMapping("/solicitud-prestacions")
    public List<SolicitudPrestacion> getAllSolicitudPrestacions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all SolicitudPrestacions");
        return solicitudPrestacionRepository.findAllWithEagerRelationships();
    }

    @GetMapping("/solicitud-prestacions/tipo/{tipo}")
    public List<SolicitudPrestacion> getAllSolicitudPrestacionsPorTipo(
        @RequestParam(required = false, defaultValue = "false") boolean eagerload,
        @PathVariable String tipo
    ) {
        log.debug("REST request to get all SolicitudPrestacions por Tipo " + tipo);
        List<SolicitudPrestacion> toRet = solicitudPrestacionRepository.findAllWithEagerRelationships();
        toRet.removeIf(s -> !s.getTipo().equals(tipo)); // Filter

        return toRet;
    }

    /**
     * {@code GET  /solicitud-prestacions/:id} : get the "id" solicitudPrestacion.
     *
     * @param id the id of the solicitudPrestacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solicitudPrestacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solicitud-prestacions/{id}")
    public ResponseEntity<SolicitudPrestacion> getSolicitudPrestacion(@PathVariable Long id) {
        log.debug("REST request to get SolicitudPrestacion : {}", id);
        Optional<SolicitudPrestacion> solicitudPrestacion = solicitudPrestacionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(solicitudPrestacion);
    }

    /**
     * {@code DELETE  /solicitud-prestacions/:id} : delete the "id" solicitudPrestacion.
     *
     * @param id the id of the solicitudPrestacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solicitud-prestacions/{id}")
    public ResponseEntity<Void> deleteSolicitudPrestacion(@PathVariable Long id) {
        log.debug("REST request to delete SolicitudPrestacion : {}", id);
        solicitudPrestacionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
