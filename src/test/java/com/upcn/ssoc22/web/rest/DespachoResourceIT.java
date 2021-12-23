package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Despacho;
import com.upcn.ssoc22.repository.DespachoRepository;
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
 * Integration tests for the {@link DespachoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DespachoResourceIT {

    private static final String ENTITY_API_URL = "/api/despachos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DespachoRepository despachoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDespachoMockMvc;

    private Despacho despacho;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Despacho createEntity(EntityManager em) {
        Despacho despacho = new Despacho();
        return despacho;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Despacho createUpdatedEntity(EntityManager em) {
        Despacho despacho = new Despacho();
        return despacho;
    }

    @BeforeEach
    public void initTest() {
        despacho = createEntity(em);
    }

    @Test
    @Transactional
    void createDespacho() throws Exception {
        int databaseSizeBeforeCreate = despachoRepository.findAll().size();
        // Create the Despacho
        restDespachoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(despacho)))
            .andExpect(status().isCreated());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeCreate + 1);
        Despacho testDespacho = despachoList.get(despachoList.size() - 1);
    }

    @Test
    @Transactional
    void createDespachoWithExistingId() throws Exception {
        // Create the Despacho with an existing ID
        despacho.setId(1L);

        int databaseSizeBeforeCreate = despachoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDespachoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(despacho)))
            .andExpect(status().isBadRequest());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDespachos() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        // Get all the despachoList
        restDespachoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(despacho.getId().intValue())));
    }

    @Test
    @Transactional
    void getDespacho() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        // Get the despacho
        restDespachoMockMvc
            .perform(get(ENTITY_API_URL_ID, despacho.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(despacho.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDespacho() throws Exception {
        // Get the despacho
        restDespachoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDespacho() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();

        // Update the despacho
        Despacho updatedDespacho = despachoRepository.findById(despacho.getId()).get();
        // Disconnect from session so that the updates on updatedDespacho are not directly saved in db
        em.detach(updatedDespacho);

        restDespachoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDespacho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDespacho))
            )
            .andExpect(status().isOk());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
        Despacho testDespacho = despachoList.get(despachoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, despacho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(despacho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(despacho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(despacho)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDespachoWithPatch() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();

        // Update the despacho using partial update
        Despacho partialUpdatedDespacho = new Despacho();
        partialUpdatedDespacho.setId(despacho.getId());

        restDespachoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDespacho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDespacho))
            )
            .andExpect(status().isOk());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
        Despacho testDespacho = despachoList.get(despachoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateDespachoWithPatch() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();

        // Update the despacho using partial update
        Despacho partialUpdatedDespacho = new Despacho();
        partialUpdatedDespacho.setId(despacho.getId());

        restDespachoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDespacho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDespacho))
            )
            .andExpect(status().isOk());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
        Despacho testDespacho = despachoList.get(despachoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, despacho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(despacho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(despacho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDespacho() throws Exception {
        int databaseSizeBeforeUpdate = despachoRepository.findAll().size();
        despacho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDespachoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(despacho)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Despacho in the database
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDespacho() throws Exception {
        // Initialize the database
        despachoRepository.saveAndFlush(despacho);

        int databaseSizeBeforeDelete = despachoRepository.findAll().size();

        // Delete the despacho
        restDespachoMockMvc
            .perform(delete(ENTITY_API_URL_ID, despacho.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Despacho> despachoList = despachoRepository.findAll();
        assertThat(despachoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
