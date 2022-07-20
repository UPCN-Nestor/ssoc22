package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.ItemPropio;
import com.upcn.ssoc22.repository.ItemPropioRepository;
import com.upcn.ssoc22.service.GLMService;
import com.upcn.ssoc22.web.rest.errors.BadRequestAlertException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.upcn.ssoc22.domain.ItemPropio}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemPropioResource {

    private final Logger log = LoggerFactory.getLogger(ItemPropioResource.class);

    private static final String ENTITY_NAME = "itemPropio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPropioRepository itemPropioRepository;
    private final GLMService glmService;

    public ItemPropioResource(ItemPropioRepository itemPropioRepository, GLMService glmService) {
        this.itemPropioRepository = itemPropioRepository;
        this.glmService = glmService;
    }

    /**
     * {@code POST  /item-propios} : Create a new itemPropio.
     *
     * @param itemPropio the itemPropio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemPropio, or with status {@code 400 (Bad Request)} if the itemPropio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-propios")
    public ResponseEntity<ItemPropio> createItemPropio(@RequestBody ItemPropio itemPropio) throws URISyntaxException {
        log.debug("REST request to save ItemPropio : {}", itemPropio);
        if (itemPropio.getId() != null) {
            throw new BadRequestAlertException("A new itemPropio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemPropio result = itemPropioRepository.save(itemPropio);
        return ResponseEntity
            .created(new URI("/api/item-propios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-propios/:id} : Updates an existing itemPropio.
     *
     * @param id the id of the itemPropio to save.
     * @param itemPropio the itemPropio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPropio,
     * or with status {@code 400 (Bad Request)} if the itemPropio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemPropio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-propios/{id}")
    public ResponseEntity<ItemPropio> updateItemPropio(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemPropio itemPropio
    ) throws URISyntaxException {
        log.debug("REST request to update ItemPropio : {}, {}", id, itemPropio);
        if (itemPropio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemPropio.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemPropioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ItemPropio result = itemPropioRepository.save(itemPropio);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemPropio.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /item-propios/:id} : Partial updates given fields of an existing itemPropio, field will ignore if it is null
     *
     * @param id the id of the itemPropio to save.
     * @param itemPropio the itemPropio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPropio,
     * or with status {@code 400 (Bad Request)} if the itemPropio is not valid,
     * or with status {@code 404 (Not Found)} if the itemPropio is not found,
     * or with status {@code 500 (Internal Server Error)} if the itemPropio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/item-propios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ItemPropio> partialUpdateItemPropio(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ItemPropio itemPropio
    ) throws URISyntaxException {
        log.debug("REST request to partial update ItemPropio partially : {}, {}", id, itemPropio);
        if (itemPropio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemPropio.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemPropioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ItemPropio> result = itemPropioRepository
            .findById(itemPropio.getId())
            .map(existingItemPropio -> {
                if (itemPropio.getSocio() != null) {
                    existingItemPropio.setSocio(itemPropio.getSocio());
                }
                if (itemPropio.getSuministro() != null) {
                    existingItemPropio.setSuministro(itemPropio.getSuministro());
                }
                if (itemPropio.getFechaFactura() != null) {
                    existingItemPropio.setFechaFactura(itemPropio.getFechaFactura());
                }
                if (itemPropio.getTipoComp() != null) {
                    existingItemPropio.setTipoComp(itemPropio.getTipoComp());
                }
                if (itemPropio.getLetraComp() != null) {
                    existingItemPropio.setLetraComp(itemPropio.getLetraComp());
                }
                if (itemPropio.getPtoVtaComp() != null) {
                    existingItemPropio.setPtoVtaComp(itemPropio.getPtoVtaComp());
                }
                if (itemPropio.getNumeroComp() != null) {
                    existingItemPropio.setNumeroComp(itemPropio.getNumeroComp());
                }
                if (itemPropio.getServicio() != null) {
                    existingItemPropio.setServicio(itemPropio.getServicio());
                }
                if (itemPropio.getItem() != null) {
                    existingItemPropio.setItem(itemPropio.getItem());
                }
                if (itemPropio.getOrden() != null) {
                    existingItemPropio.setOrden(itemPropio.getOrden());
                }
                if (itemPropio.getImporte() != null) {
                    existingItemPropio.setImporte(itemPropio.getImporte());
                }
                if (itemPropio.getInsertadoEnWeb() != null) {
                    existingItemPropio.setInsertadoEnWeb(itemPropio.getInsertadoEnWeb());
                }

                return existingItemPropio;
            })
            .map(itemPropioRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemPropio.getId().toString())
        );
    }

    /**
     * {@code GET  /item-propios} : get all the itemPropios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemPropios in body.
     */
    @GetMapping("/item-propios")
    public List<ItemPropio> getAllItemPropios() {
        log.debug("REST request to get all ItemPropios");
        return itemPropioRepository.findAll();
    }

    /**
     * {@code GET  /item-propios/:id} : get the "id" itemPropio.
     *
     * @param id the id of the itemPropio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemPropio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-propios/{id}")
    public ResponseEntity<ItemPropio> getItemPropio(@PathVariable Long id) {
        log.debug("REST request to get ItemPropio : {}", id);
        Optional<ItemPropio> itemPropio = itemPropioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemPropio);
    }

    /**
     * {@code DELETE  /item-propios/:id} : delete the "id" itemPropio.
     *
     * @param id the id of the itemPropio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-propios/{id}")
    public ResponseEntity<Void> deleteItemPropio(@PathVariable Long id) {
        log.debug("REST request to delete ItemPropio : {}", id);
        itemPropioRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/item-propios/migrar-items-de-win/{fechaFactura}")
    public ResponseEntity<List<ItemPropio>> migrarItemsDeWin(@PathVariable String fechaFactura) {
        List<ItemPropio> items = itemPropioRepository.obtenerItemsDeWin(fechaFactura);

        return ResponseEntity.ok().body(items);
    }

    @Transactional
    @GetMapping("/item-propios/migrar-facturas-de-win/{fechaFactura}")
    public ResponseEntity<String> migrarFacturasDeWin(@PathVariable String fechaFactura) {
        List<Map<String, Object>> facturas = itemPropioRepository.obtenerFacturasDeWinDTO(fechaFactura);

        log.info("Facturando desde WIN, cantidad: " + facturas.size());

        int limiteParaTest = 0;

        for (Map<String, Object> f : facturas) {
            limiteParaTest++;
            if (limiteParaTest > 5) break;

            try {
                log.info(
                    "Facturando: " +
                    f.get("socio") +
                    "/" +
                    f.get("suministro") +
                    " " +
                    f.get("tipo_comp") +
                    "-" +
                    f.get("letra_comp") +
                    "-" +
                    f.get("letra_comp") +
                    "-" +
                    f.get("numero_comp") +
                    ", vto: " +
                    f.get("fecha_vto")
                );

                // ******************************* Caché??
                /* 
                if(itemPropioRepository.getById(f.getId()).getInsertadoEnWeb() != null) {
                    log.info("Ya fue facturada segun DB, omitiendo. " + itemPropioRepository.getById(f.getId()));
                    continue;
                }
*/
                List<Map<String, Object>> items = itemPropioRepository.obtenerDetalleFacturaDeWinDTO(
                    "" + f.get("tipo_comp"),
                    "" + f.get("letra_comp"),
                    "" + f.get("pto_vta_comp"),
                    "" + f.get("numero_comp")
                );

                //double importeParaControl = items.stream().map(i->i.get("importe")).reduce(0, (a,b)->((double)a)+((double)b));

                String nuevaFacturaWeb = glmService.actualizarFactura(
                    (Integer) f.get("socio"),
                    (Integer) f.get("suministro"),
                    (ZonedDateTime) f.get("fecha_vto"),
                    "PRUEBA",
                    items
                );

                // ******************* NO ANDA
                ItemPropio nueva = new ItemPropio();
                nueva.setSocio((Integer) f.get("socio"));
                nueva.setSuministro((Integer) f.get("suministro"));
                nueva.setTipoComp("" + f.get("tipo_comp"));
                nueva.setLetraComp("" + f.get("letra_comp"));
                nueva.setPtoVtaComp((Integer) f.get("pto_vta_comp"));
                nueva.setNumeroComp("" + f.get("numero_comp"));
                nueva.setInsertadoEnWeb(nuevaFacturaWeb);
                itemPropioRepository.save(nueva);

                log.info("Nueva factura: " + nuevaFacturaWeb); //+ " $" + importeParaControl);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }

        return ResponseEntity.ok().body("OK");
    }
}
