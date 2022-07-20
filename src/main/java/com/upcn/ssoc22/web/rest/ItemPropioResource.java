package com.upcn.ssoc22.web.rest;

import com.upcn.ssoc22.domain.ItemPropio;
import com.upcn.ssoc22.repository.ItemPropioRepository;
import com.upcn.ssoc22.repository.ItemPropioRepository.FacturaDeWinDTO;
import com.upcn.ssoc22.repository.ItemPropioRepository.ItemFacturaDeWinDTO;
import com.upcn.ssoc22.service.GLMService;
import com.upcn.ssoc22.web.rest.errors.BadRequestAlertException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
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

    //@Scheduled(cron = "0 */10 * * * ?")
    public ResponseEntity<String> migrarFacturasDeWinAutomatico() {
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String hoy = ZonedDateTime.now().format(df);
        return migrarFacturasDeWin(hoy);
    }

    @GetMapping("/item-propios/migrar-factura-individual-de-win/{tipoComp}/{letraComp}/{ptoVtaComp}/{numeroComp}")
    public ResponseEntity<String> migrarFacturaIndividualDeWin(
        @PathVariable Integer tipoComp,
        @PathVariable String letraComp,
        @PathVariable Integer ptoVtaComp,
        @PathVariable Integer numeroComp
    ) {
        return doMigrarFacturasDeWin(itemPropioRepository.obtenerFacturasIndividualDeWinDTO(tipoComp, letraComp, ptoVtaComp, numeroComp));
    }

    @GetMapping("/item-propios/migrar-facturas-de-win/{fechaFactura}")
    public ResponseEntity<String> migrarFacturasDeWin(@PathVariable String fechaFactura) {
        List<FacturaDeWinDTO> facturas = itemPropioRepository.obtenerFacturasDeWinDTO(fechaFactura);

        return doMigrarFacturasDeWin(facturas);
    }

    private ResponseEntity<String> doMigrarFacturasDeWin(List<FacturaDeWinDTO> facturas) {
        log.info("*** Facturando desde WIN, cantidad: " + facturas.size());

        int ix = 0;

        for (FacturaDeWinDTO f : facturas) {
            ix++;
            /* 
            if(ix > 10) {
                break;
            }*/

            try {
                log.info(
                    ix +
                    " | Facturando: " +
                    f.getSocio() +
                    "/" +
                    f.getSuministro() +
                    " " +
                    f.getTipoComp() +
                    "-" +
                    f.getLetraComp() +
                    "-" +
                    f.getPtoVtaComp() +
                    "-" +
                    f.getNumeroComp() +
                    ", vto: " +
                    f.getFechaVto()
                );

                if (
                    itemPropioRepository.yaExiste("" + f.getTipoComp(), f.getLetraComp(), "" + f.getPtoVtaComp(), "" + f.getNumeroComp()) >
                    0
                ) {
                    log.info("Ya fue facturada segun DB, omitiendo. ");
                    continue;
                }

                List<ItemFacturaDeWinDTO> items = itemPropioRepository.obtenerDetalleFacturaDeWinDTO(
                    "" + f.getTipoComp(),
                    f.getLetraComp(),
                    "" + f.getPtoVtaComp(),
                    "" + f.getNumeroComp()
                );

                double importeParaControl = items.stream().map(i -> i.getImporte()).reduce(0.0, (a, b) -> a + b);

                String nuevaFactura = glmService.actualizarFactura(
                    f.getSocio(),
                    f.getSuministro(),
                    f.getFechaVto().toLocalDateTime().atZone(ZoneId.systemDefault()).plusHours(12),
                    f.getTipoComp() + "-" + f.getLetraComp() + "-" + f.getPtoVtaComp() + "-" + f.getNumeroComp(),
                    items
                );

                ItemPropio nuevo = new ItemPropio();
                nuevo.setSocio(f.getSocio());
                nuevo.setSuministro(f.getSuministro());
                nuevo.setTipoComp("" + f.getTipoComp());
                nuevo.setLetraComp(f.getLetraComp());
                nuevo.setPtoVtaComp(f.getPtoVtaComp());
                nuevo.setNumeroComp("" + f.getNumeroComp());
                nuevo.setFechaFactura(f.getFechaVto().toLocalDateTime().atZone(ZoneId.systemDefault()));
                nuevo.setInsertadoEnWeb(nuevaFactura);
                itemPropioRepository.save(nuevo);

                log.info(ix + " | Nueva factura: " + nuevaFactura + " $" + importeParaControl);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }

        return ResponseEntity.ok().body("OK");
    }
}
