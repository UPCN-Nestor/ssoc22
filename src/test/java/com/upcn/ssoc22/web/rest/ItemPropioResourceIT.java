package com.upcn.ssoc22.web.rest;

import static com.upcn.ssoc22.web.rest.TestUtil.sameInstant;
import static com.upcn.ssoc22.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.ItemPropio;
import com.upcn.ssoc22.repository.ItemPropioRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ItemPropioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ItemPropioResourceIT {

    private static final Integer DEFAULT_SOCIO = 1;
    private static final Integer UPDATED_SOCIO = 2;

    private static final Integer DEFAULT_SUMINISTRO = 1;
    private static final Integer UPDATED_SUMINISTRO = 2;

    private static final ZonedDateTime DEFAULT_FECHA_FACTURA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_FACTURA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TIPO_COMP = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_COMP = "BBBBBBBBBB";

    private static final String DEFAULT_LETRA_COMP = "AAAAAAAAAA";
    private static final String UPDATED_LETRA_COMP = "BBBBBBBBBB";

    private static final Integer DEFAULT_PTO_VTA_COMP = 1;
    private static final Integer UPDATED_PTO_VTA_COMP = 2;

    private static final String DEFAULT_NUMERO_COMP = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_COMP = "BBBBBBBBBB";

    private static final Integer DEFAULT_SERVICIO = 1;
    private static final Integer UPDATED_SERVICIO = 2;

    private static final Integer DEFAULT_ITEM = 1;
    private static final Integer UPDATED_ITEM = 2;

    private static final Integer DEFAULT_ORDEN = 1;
    private static final Integer UPDATED_ORDEN = 2;

    private static final BigDecimal DEFAULT_IMPORTE = new BigDecimal(1);
    private static final BigDecimal UPDATED_IMPORTE = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/item-propios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ItemPropioRepository itemPropioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemPropioMockMvc;

    private ItemPropio itemPropio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPropio createEntity(EntityManager em) {
        ItemPropio itemPropio = new ItemPropio()
            .socio(DEFAULT_SOCIO)
            .suministro(DEFAULT_SUMINISTRO)
            .fechaFactura(DEFAULT_FECHA_FACTURA)
            .tipoComp(DEFAULT_TIPO_COMP)
            .letraComp(DEFAULT_LETRA_COMP)
            .ptoVtaComp(DEFAULT_PTO_VTA_COMP)
            .numeroComp(DEFAULT_NUMERO_COMP)
            .servicio(DEFAULT_SERVICIO)
            .item(DEFAULT_ITEM)
            .orden(DEFAULT_ORDEN)
            .importe(DEFAULT_IMPORTE);
        return itemPropio;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPropio createUpdatedEntity(EntityManager em) {
        ItemPropio itemPropio = new ItemPropio()
            .socio(UPDATED_SOCIO)
            .suministro(UPDATED_SUMINISTRO)
            .fechaFactura(UPDATED_FECHA_FACTURA)
            .tipoComp(UPDATED_TIPO_COMP)
            .letraComp(UPDATED_LETRA_COMP)
            .ptoVtaComp(UPDATED_PTO_VTA_COMP)
            .numeroComp(UPDATED_NUMERO_COMP)
            .servicio(UPDATED_SERVICIO)
            .item(UPDATED_ITEM)
            .orden(UPDATED_ORDEN)
            .importe(UPDATED_IMPORTE);
        return itemPropio;
    }

    @BeforeEach
    public void initTest() {
        itemPropio = createEntity(em);
    }

    @Test
    @Transactional
    void createItemPropio() throws Exception {
        int databaseSizeBeforeCreate = itemPropioRepository.findAll().size();
        // Create the ItemPropio
        restItemPropioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPropio)))
            .andExpect(status().isCreated());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPropio testItemPropio = itemPropioList.get(itemPropioList.size() - 1);
        assertThat(testItemPropio.getSocio()).isEqualTo(DEFAULT_SOCIO);
        assertThat(testItemPropio.getSuministro()).isEqualTo(DEFAULT_SUMINISTRO);
        assertThat(testItemPropio.getFechaFactura()).isEqualTo(DEFAULT_FECHA_FACTURA);
        assertThat(testItemPropio.getTipoComp()).isEqualTo(DEFAULT_TIPO_COMP);
        assertThat(testItemPropio.getLetraComp()).isEqualTo(DEFAULT_LETRA_COMP);
        assertThat(testItemPropio.getPtoVtaComp()).isEqualTo(DEFAULT_PTO_VTA_COMP);
        assertThat(testItemPropio.getNumeroComp()).isEqualTo(DEFAULT_NUMERO_COMP);
        assertThat(testItemPropio.getServicio()).isEqualTo(DEFAULT_SERVICIO);
        assertThat(testItemPropio.getItem()).isEqualTo(DEFAULT_ITEM);
        assertThat(testItemPropio.getOrden()).isEqualTo(DEFAULT_ORDEN);
        assertThat(testItemPropio.getImporte()).isEqualByComparingTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    void createItemPropioWithExistingId() throws Exception {
        // Create the ItemPropio with an existing ID
        itemPropio.setId(1L);

        int databaseSizeBeforeCreate = itemPropioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPropioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPropio)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllItemPropios() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        // Get all the itemPropioList
        restItemPropioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPropio.getId().intValue())))
            .andExpect(jsonPath("$.[*].socio").value(hasItem(DEFAULT_SOCIO)))
            .andExpect(jsonPath("$.[*].suministro").value(hasItem(DEFAULT_SUMINISTRO)))
            .andExpect(jsonPath("$.[*].fechaFactura").value(hasItem(sameInstant(DEFAULT_FECHA_FACTURA))))
            .andExpect(jsonPath("$.[*].tipoComp").value(hasItem(DEFAULT_TIPO_COMP)))
            .andExpect(jsonPath("$.[*].letraComp").value(hasItem(DEFAULT_LETRA_COMP)))
            .andExpect(jsonPath("$.[*].ptoVtaComp").value(hasItem(DEFAULT_PTO_VTA_COMP)))
            .andExpect(jsonPath("$.[*].numeroComp").value(hasItem(DEFAULT_NUMERO_COMP)))
            .andExpect(jsonPath("$.[*].servicio").value(hasItem(DEFAULT_SERVICIO)))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM)))
            .andExpect(jsonPath("$.[*].orden").value(hasItem(DEFAULT_ORDEN)))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(sameNumber(DEFAULT_IMPORTE))));
    }

    @Test
    @Transactional
    void getItemPropio() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        // Get the itemPropio
        restItemPropioMockMvc
            .perform(get(ENTITY_API_URL_ID, itemPropio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemPropio.getId().intValue()))
            .andExpect(jsonPath("$.socio").value(DEFAULT_SOCIO))
            .andExpect(jsonPath("$.suministro").value(DEFAULT_SUMINISTRO))
            .andExpect(jsonPath("$.fechaFactura").value(sameInstant(DEFAULT_FECHA_FACTURA)))
            .andExpect(jsonPath("$.tipoComp").value(DEFAULT_TIPO_COMP))
            .andExpect(jsonPath("$.letraComp").value(DEFAULT_LETRA_COMP))
            .andExpect(jsonPath("$.ptoVtaComp").value(DEFAULT_PTO_VTA_COMP))
            .andExpect(jsonPath("$.numeroComp").value(DEFAULT_NUMERO_COMP))
            .andExpect(jsonPath("$.servicio").value(DEFAULT_SERVICIO))
            .andExpect(jsonPath("$.item").value(DEFAULT_ITEM))
            .andExpect(jsonPath("$.orden").value(DEFAULT_ORDEN))
            .andExpect(jsonPath("$.importe").value(sameNumber(DEFAULT_IMPORTE)));
    }

    @Test
    @Transactional
    void getNonExistingItemPropio() throws Exception {
        // Get the itemPropio
        restItemPropioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewItemPropio() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();

        // Update the itemPropio
        ItemPropio updatedItemPropio = itemPropioRepository.findById(itemPropio.getId()).get();
        // Disconnect from session so that the updates on updatedItemPropio are not directly saved in db
        em.detach(updatedItemPropio);
        updatedItemPropio
            .socio(UPDATED_SOCIO)
            .suministro(UPDATED_SUMINISTRO)
            .fechaFactura(UPDATED_FECHA_FACTURA)
            .tipoComp(UPDATED_TIPO_COMP)
            .letraComp(UPDATED_LETRA_COMP)
            .ptoVtaComp(UPDATED_PTO_VTA_COMP)
            .numeroComp(UPDATED_NUMERO_COMP)
            .servicio(UPDATED_SERVICIO)
            .item(UPDATED_ITEM)
            .orden(UPDATED_ORDEN)
            .importe(UPDATED_IMPORTE);

        restItemPropioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedItemPropio.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedItemPropio))
            )
            .andExpect(status().isOk());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
        ItemPropio testItemPropio = itemPropioList.get(itemPropioList.size() - 1);
        assertThat(testItemPropio.getSocio()).isEqualTo(UPDATED_SOCIO);
        assertThat(testItemPropio.getSuministro()).isEqualTo(UPDATED_SUMINISTRO);
        assertThat(testItemPropio.getFechaFactura()).isEqualTo(UPDATED_FECHA_FACTURA);
        assertThat(testItemPropio.getTipoComp()).isEqualTo(UPDATED_TIPO_COMP);
        assertThat(testItemPropio.getLetraComp()).isEqualTo(UPDATED_LETRA_COMP);
        assertThat(testItemPropio.getPtoVtaComp()).isEqualTo(UPDATED_PTO_VTA_COMP);
        assertThat(testItemPropio.getNumeroComp()).isEqualTo(UPDATED_NUMERO_COMP);
        assertThat(testItemPropio.getServicio()).isEqualTo(UPDATED_SERVICIO);
        assertThat(testItemPropio.getItem()).isEqualTo(UPDATED_ITEM);
        assertThat(testItemPropio.getOrden()).isEqualTo(UPDATED_ORDEN);
        assertThat(testItemPropio.getImporte()).isEqualByComparingTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    void putNonExistingItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemPropio.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemPropio))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemPropio))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemPropio)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateItemPropioWithPatch() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();

        // Update the itemPropio using partial update
        ItemPropio partialUpdatedItemPropio = new ItemPropio();
        partialUpdatedItemPropio.setId(itemPropio.getId());

        partialUpdatedItemPropio
            .socio(UPDATED_SOCIO)
            .tipoComp(UPDATED_TIPO_COMP)
            .letraComp(UPDATED_LETRA_COMP)
            .numeroComp(UPDATED_NUMERO_COMP)
            .servicio(UPDATED_SERVICIO);

        restItemPropioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPropio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemPropio))
            )
            .andExpect(status().isOk());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
        ItemPropio testItemPropio = itemPropioList.get(itemPropioList.size() - 1);
        assertThat(testItemPropio.getSocio()).isEqualTo(UPDATED_SOCIO);
        assertThat(testItemPropio.getSuministro()).isEqualTo(DEFAULT_SUMINISTRO);
        assertThat(testItemPropio.getFechaFactura()).isEqualTo(DEFAULT_FECHA_FACTURA);
        assertThat(testItemPropio.getTipoComp()).isEqualTo(UPDATED_TIPO_COMP);
        assertThat(testItemPropio.getLetraComp()).isEqualTo(UPDATED_LETRA_COMP);
        assertThat(testItemPropio.getPtoVtaComp()).isEqualTo(DEFAULT_PTO_VTA_COMP);
        assertThat(testItemPropio.getNumeroComp()).isEqualTo(UPDATED_NUMERO_COMP);
        assertThat(testItemPropio.getServicio()).isEqualTo(UPDATED_SERVICIO);
        assertThat(testItemPropio.getItem()).isEqualTo(DEFAULT_ITEM);
        assertThat(testItemPropio.getOrden()).isEqualTo(DEFAULT_ORDEN);
        assertThat(testItemPropio.getImporte()).isEqualByComparingTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    void fullUpdateItemPropioWithPatch() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();

        // Update the itemPropio using partial update
        ItemPropio partialUpdatedItemPropio = new ItemPropio();
        partialUpdatedItemPropio.setId(itemPropio.getId());

        partialUpdatedItemPropio
            .socio(UPDATED_SOCIO)
            .suministro(UPDATED_SUMINISTRO)
            .fechaFactura(UPDATED_FECHA_FACTURA)
            .tipoComp(UPDATED_TIPO_COMP)
            .letraComp(UPDATED_LETRA_COMP)
            .ptoVtaComp(UPDATED_PTO_VTA_COMP)
            .numeroComp(UPDATED_NUMERO_COMP)
            .servicio(UPDATED_SERVICIO)
            .item(UPDATED_ITEM)
            .orden(UPDATED_ORDEN)
            .importe(UPDATED_IMPORTE);

        restItemPropioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemPropio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemPropio))
            )
            .andExpect(status().isOk());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
        ItemPropio testItemPropio = itemPropioList.get(itemPropioList.size() - 1);
        assertThat(testItemPropio.getSocio()).isEqualTo(UPDATED_SOCIO);
        assertThat(testItemPropio.getSuministro()).isEqualTo(UPDATED_SUMINISTRO);
        assertThat(testItemPropio.getFechaFactura()).isEqualTo(UPDATED_FECHA_FACTURA);
        assertThat(testItemPropio.getTipoComp()).isEqualTo(UPDATED_TIPO_COMP);
        assertThat(testItemPropio.getLetraComp()).isEqualTo(UPDATED_LETRA_COMP);
        assertThat(testItemPropio.getPtoVtaComp()).isEqualTo(UPDATED_PTO_VTA_COMP);
        assertThat(testItemPropio.getNumeroComp()).isEqualTo(UPDATED_NUMERO_COMP);
        assertThat(testItemPropio.getServicio()).isEqualTo(UPDATED_SERVICIO);
        assertThat(testItemPropio.getItem()).isEqualTo(UPDATED_ITEM);
        assertThat(testItemPropio.getOrden()).isEqualTo(UPDATED_ORDEN);
        assertThat(testItemPropio.getImporte()).isEqualByComparingTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    void patchNonExistingItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemPropio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemPropio))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemPropio))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamItemPropio() throws Exception {
        int databaseSizeBeforeUpdate = itemPropioRepository.findAll().size();
        itemPropio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemPropioMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(itemPropio))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemPropio in the database
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteItemPropio() throws Exception {
        // Initialize the database
        itemPropioRepository.saveAndFlush(itemPropio);

        int databaseSizeBeforeDelete = itemPropioRepository.findAll().size();

        // Delete the itemPropio
        restItemPropioMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemPropio.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPropio> itemPropioList = itemPropioRepository.findAll();
        assertThat(itemPropioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
