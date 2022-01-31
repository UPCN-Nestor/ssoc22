package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.repository.ItemNomencladorRepository;
import java.time.Duration;
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
 * Integration tests for the {@link ItemNomencladorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ItemNomencladorResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Duration DEFAULT_CARENCIA = Duration.ofHours(6);
    private static final Duration UPDATED_CARENCIA = Duration.ofHours(12);

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/item-nomencladors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ItemNomencladorRepository itemNomencladorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemNomencladorMockMvc;

    private ItemNomenclador itemNomenclador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemNomenclador createEntity(EntityManager em) {
        ItemNomenclador itemNomenclador = new ItemNomenclador().nombre(DEFAULT_NOMBRE).carencia(DEFAULT_CARENCIA).codigo(DEFAULT_CODIGO);
        return itemNomenclador;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemNomenclador createUpdatedEntity(EntityManager em) {
        ItemNomenclador itemNomenclador = new ItemNomenclador().nombre(UPDATED_NOMBRE).carencia(UPDATED_CARENCIA).codigo(UPDATED_CODIGO);
        return itemNomenclador;
    }

    @BeforeEach
    public void initTest() {
        itemNomenclador = createEntity(em);
    }

    @Test
    @Transactional
    void createItemNomenclador() throws Exception {
        int databaseSizeBeforeCreate = itemNomencladorRepository.findAll().size();
        // Create the ItemNomenclador
        restItemNomencladorMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isCreated());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeCreate + 1);
        ItemNomenclador testItemNomenclador = itemNomencladorList.get(itemNomencladorList.size() - 1);
        assertThat(testItemNomenclador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testItemNomenclador.getCarencia()).isEqualTo(DEFAULT_CARENCIA);
        assertThat(testItemNomenclador.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    void createItemNomencladorWithExistingId() throws Exception {
        // Create the ItemNomenclador with an existing ID
        itemNomenclador.setId(1L);

        int databaseSizeBeforeCreate = itemNomencladorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemNomencladorMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllItemNomencladors() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        // Get all the itemNomencladorList
        restItemNomencladorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemNomenclador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].carencia").value(hasItem(DEFAULT_CARENCIA.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }

    @Test
    @Transactional
    void getItemNomenclador() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        // Get the itemNomenclador
        restItemNomencladorMockMvc
            .perform(get(ENTITY_API_URL_ID, itemNomenclador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemNomenclador.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.carencia").value(DEFAULT_CARENCIA.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    void getNonExistingItemNomenclador() throws Exception {
        // Get the itemNomenclador
        restItemNomencladorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewItemNomenclador() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();

        // Update the itemNomenclador
        ItemNomenclador updatedItemNomenclador = itemNomencladorRepository.findById(itemNomenclador.getId()).get();
        // Disconnect from session so that the updates on updatedItemNomenclador are not directly saved in db
        em.detach(updatedItemNomenclador);
        updatedItemNomenclador.nombre(UPDATED_NOMBRE).carencia(UPDATED_CARENCIA).codigo(UPDATED_CODIGO);

        restItemNomencladorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedItemNomenclador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedItemNomenclador))
            )
            .andExpect(status().isOk());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
        ItemNomenclador testItemNomenclador = itemNomencladorList.get(itemNomencladorList.size() - 1);
        assertThat(testItemNomenclador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testItemNomenclador.getCarencia()).isEqualTo(UPDATED_CARENCIA);
        assertThat(testItemNomenclador.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void putNonExistingItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemNomenclador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateItemNomencladorWithPatch() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();

        // Update the itemNomenclador using partial update
        ItemNomenclador partialUpdatedItemNomenclador = new ItemNomenclador();
        partialUpdatedItemNomenclador.setId(itemNomenclador.getId());

        partialUpdatedItemNomenclador.codigo(UPDATED_CODIGO);

        restItemNomencladorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemNomenclador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemNomenclador))
            )
            .andExpect(status().isOk());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
        ItemNomenclador testItemNomenclador = itemNomencladorList.get(itemNomencladorList.size() - 1);
        assertThat(testItemNomenclador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testItemNomenclador.getCarencia()).isEqualTo(DEFAULT_CARENCIA);
        assertThat(testItemNomenclador.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void fullUpdateItemNomencladorWithPatch() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();

        // Update the itemNomenclador using partial update
        ItemNomenclador partialUpdatedItemNomenclador = new ItemNomenclador();
        partialUpdatedItemNomenclador.setId(itemNomenclador.getId());

        partialUpdatedItemNomenclador.nombre(UPDATED_NOMBRE).carencia(UPDATED_CARENCIA).codigo(UPDATED_CODIGO);

        restItemNomencladorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemNomenclador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemNomenclador))
            )
            .andExpect(status().isOk());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
        ItemNomenclador testItemNomenclador = itemNomencladorList.get(itemNomencladorList.size() - 1);
        assertThat(testItemNomenclador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testItemNomenclador.getCarencia()).isEqualTo(UPDATED_CARENCIA);
        assertThat(testItemNomenclador.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void patchNonExistingItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemNomenclador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamItemNomenclador() throws Exception {
        int databaseSizeBeforeUpdate = itemNomencladorRepository.findAll().size();
        itemNomenclador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemNomencladorMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemNomenclador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemNomenclador in the database
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteItemNomenclador() throws Exception {
        // Initialize the database
        itemNomencladorRepository.saveAndFlush(itemNomenclador);

        int databaseSizeBeforeDelete = itemNomencladorRepository.findAll().size();

        // Delete the itemNomenclador
        restItemNomencladorMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemNomenclador.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemNomenclador> itemNomencladorList = itemNomencladorRepository.findAll();
        assertThat(itemNomencladorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
