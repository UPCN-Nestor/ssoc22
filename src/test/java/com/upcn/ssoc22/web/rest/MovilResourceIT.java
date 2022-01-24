package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Movil;
import com.upcn.ssoc22.repository.MovilRepository;
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
 * Integration tests for the {@link MovilResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovilResourceIT {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final String ENTITY_API_URL = "/api/movils";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovilRepository movilRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovilMockMvc;

    private Movil movil;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movil createEntity(EntityManager em) {
        Movil movil = new Movil().numero(DEFAULT_NUMERO);
        return movil;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movil createUpdatedEntity(EntityManager em) {
        Movil movil = new Movil().numero(UPDATED_NUMERO);
        return movil;
    }

    @BeforeEach
    public void initTest() {
        movil = createEntity(em);
    }

    @Test
    @Transactional
    void createMovil() throws Exception {
        int databaseSizeBeforeCreate = movilRepository.findAll().size();
        // Create the Movil
        restMovilMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movil)))
            .andExpect(status().isCreated());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeCreate + 1);
        Movil testMovil = movilList.get(movilList.size() - 1);
        assertThat(testMovil.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    void createMovilWithExistingId() throws Exception {
        // Create the Movil with an existing ID
        movil.setId(1L);

        int databaseSizeBeforeCreate = movilRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovilMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movil)))
            .andExpect(status().isBadRequest());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMovils() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        // Get all the movilList
        restMovilMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movil.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }

    @Test
    @Transactional
    void getMovil() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        // Get the movil
        restMovilMockMvc
            .perform(get(ENTITY_API_URL_ID, movil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movil.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO));
    }

    @Test
    @Transactional
    void getNonExistingMovil() throws Exception {
        // Get the movil
        restMovilMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovil() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        int databaseSizeBeforeUpdate = movilRepository.findAll().size();

        // Update the movil
        Movil updatedMovil = movilRepository.findById(movil.getId()).get();
        // Disconnect from session so that the updates on updatedMovil are not directly saved in db
        em.detach(updatedMovil);
        updatedMovil.numero(UPDATED_NUMERO);

        restMovilMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovil.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovil))
            )
            .andExpect(status().isOk());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
        Movil testMovil = movilList.get(movilList.size() - 1);
        assertThat(testMovil.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    void putNonExistingMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movil.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movil))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movil))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movil)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovilWithPatch() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        int databaseSizeBeforeUpdate = movilRepository.findAll().size();

        // Update the movil using partial update
        Movil partialUpdatedMovil = new Movil();
        partialUpdatedMovil.setId(movil.getId());

        restMovilMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovil.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovil))
            )
            .andExpect(status().isOk());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
        Movil testMovil = movilList.get(movilList.size() - 1);
        assertThat(testMovil.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    void fullUpdateMovilWithPatch() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        int databaseSizeBeforeUpdate = movilRepository.findAll().size();

        // Update the movil using partial update
        Movil partialUpdatedMovil = new Movil();
        partialUpdatedMovil.setId(movil.getId());

        partialUpdatedMovil.numero(UPDATED_NUMERO);

        restMovilMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovil.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovil))
            )
            .andExpect(status().isOk());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
        Movil testMovil = movilList.get(movilList.size() - 1);
        assertThat(testMovil.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    void patchNonExistingMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movil.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movil))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movil))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovil() throws Exception {
        int databaseSizeBeforeUpdate = movilRepository.findAll().size();
        movil.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovilMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(movil)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movil in the database
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovil() throws Exception {
        // Initialize the database
        movilRepository.saveAndFlush(movil);

        int databaseSizeBeforeDelete = movilRepository.findAll().size();

        // Delete the movil
        restMovilMockMvc
            .perform(delete(ENTITY_API_URL_ID, movil.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movil> movilList = movilRepository.findAll();
        assertThat(movilList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
