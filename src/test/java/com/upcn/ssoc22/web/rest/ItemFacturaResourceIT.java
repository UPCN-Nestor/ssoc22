package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.ItemFactura;
import com.upcn.ssoc22.repository.ItemFacturaRepository;
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
 * Integration tests for the {@link ItemFacturaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ItemFacturaResourceIT {

    private static final String ENTITY_API_URL = "/api/item-facturas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ItemFacturaRepository itemFacturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemFacturaMockMvc;

    private ItemFactura itemFactura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemFactura createEntity(EntityManager em) {
        ItemFactura itemFactura = new ItemFactura();
        return itemFactura;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemFactura createUpdatedEntity(EntityManager em) {
        ItemFactura itemFactura = new ItemFactura();
        return itemFactura;
    }

    @BeforeEach
    public void initTest() {
        itemFactura = createEntity(em);
    }

    @Test
    @Transactional
    void createItemFactura() throws Exception {
        int databaseSizeBeforeCreate = itemFacturaRepository.findAll().size();
        // Create the ItemFactura
        restItemFacturaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemFactura)))
            .andExpect(status().isCreated());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeCreate + 1);
        ItemFactura testItemFactura = itemFacturaList.get(itemFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void createItemFacturaWithExistingId() throws Exception {
        // Create the ItemFactura with an existing ID
        itemFactura.setId(1L);

        int databaseSizeBeforeCreate = itemFacturaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemFacturaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemFactura)))
            .andExpect(status().isBadRequest());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllItemFacturas() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        // Get all the itemFacturaList
        restItemFacturaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemFactura.getId().intValue())));
    }

    @Test
    @Transactional
    void getItemFactura() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        // Get the itemFactura
        restItemFacturaMockMvc
            .perform(get(ENTITY_API_URL_ID, itemFactura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemFactura.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingItemFactura() throws Exception {
        // Get the itemFactura
        restItemFacturaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewItemFactura() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();

        // Update the itemFactura
        ItemFactura updatedItemFactura = itemFacturaRepository.findById(itemFactura.getId()).get();
        // Disconnect from session so that the updates on updatedItemFactura are not directly saved in db
        em.detach(updatedItemFactura);

        restItemFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedItemFactura.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedItemFactura))
            )
            .andExpect(status().isOk());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
        ItemFactura testItemFactura = itemFacturaList.get(itemFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemFactura.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(itemFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(itemFactura)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateItemFacturaWithPatch() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();

        // Update the itemFactura using partial update
        ItemFactura partialUpdatedItemFactura = new ItemFactura();
        partialUpdatedItemFactura.setId(itemFactura.getId());

        restItemFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemFactura))
            )
            .andExpect(status().isOk());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
        ItemFactura testItemFactura = itemFacturaList.get(itemFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateItemFacturaWithPatch() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();

        // Update the itemFactura using partial update
        ItemFactura partialUpdatedItemFactura = new ItemFactura();
        partialUpdatedItemFactura.setId(itemFactura.getId());

        restItemFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedItemFactura))
            )
            .andExpect(status().isOk());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
        ItemFactura testItemFactura = itemFacturaList.get(itemFacturaList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemFactura.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(itemFactura))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamItemFactura() throws Exception {
        int databaseSizeBeforeUpdate = itemFacturaRepository.findAll().size();
        itemFactura.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemFacturaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(itemFactura))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemFactura in the database
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteItemFactura() throws Exception {
        // Initialize the database
        itemFacturaRepository.saveAndFlush(itemFactura);

        int databaseSizeBeforeDelete = itemFacturaRepository.findAll().size();

        // Delete the itemFactura
        restItemFacturaMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemFactura.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemFactura> itemFacturaList = itemFacturaRepository.findAll();
        assertThat(itemFacturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
