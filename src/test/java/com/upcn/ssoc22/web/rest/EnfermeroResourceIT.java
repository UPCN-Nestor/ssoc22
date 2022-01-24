package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Enfermero;
import com.upcn.ssoc22.repository.EnfermeroRepository;
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
 * Integration tests for the {@link EnfermeroResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EnfermeroResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/enfermeros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EnfermeroRepository enfermeroRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEnfermeroMockMvc;

    private Enfermero enfermero;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enfermero createEntity(EntityManager em) {
        Enfermero enfermero = new Enfermero().nombre(DEFAULT_NOMBRE);
        return enfermero;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enfermero createUpdatedEntity(EntityManager em) {
        Enfermero enfermero = new Enfermero().nombre(UPDATED_NOMBRE);
        return enfermero;
    }

    @BeforeEach
    public void initTest() {
        enfermero = createEntity(em);
    }

    @Test
    @Transactional
    void createEnfermero() throws Exception {
        int databaseSizeBeforeCreate = enfermeroRepository.findAll().size();
        // Create the Enfermero
        restEnfermeroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(enfermero)))
            .andExpect(status().isCreated());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeCreate + 1);
        Enfermero testEnfermero = enfermeroList.get(enfermeroList.size() - 1);
        assertThat(testEnfermero.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void createEnfermeroWithExistingId() throws Exception {
        // Create the Enfermero with an existing ID
        enfermero.setId(1L);

        int databaseSizeBeforeCreate = enfermeroRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnfermeroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(enfermero)))
            .andExpect(status().isBadRequest());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEnfermeros() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        // Get all the enfermeroList
        restEnfermeroMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enfermero.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }

    @Test
    @Transactional
    void getEnfermero() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        // Get the enfermero
        restEnfermeroMockMvc
            .perform(get(ENTITY_API_URL_ID, enfermero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(enfermero.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    void getNonExistingEnfermero() throws Exception {
        // Get the enfermero
        restEnfermeroMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEnfermero() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();

        // Update the enfermero
        Enfermero updatedEnfermero = enfermeroRepository.findById(enfermero.getId()).get();
        // Disconnect from session so that the updates on updatedEnfermero are not directly saved in db
        em.detach(updatedEnfermero);
        updatedEnfermero.nombre(UPDATED_NOMBRE);

        restEnfermeroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEnfermero.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEnfermero))
            )
            .andExpect(status().isOk());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
        Enfermero testEnfermero = enfermeroList.get(enfermeroList.size() - 1);
        assertThat(testEnfermero.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void putNonExistingEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, enfermero.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(enfermero))
            )
            .andExpect(status().isBadRequest());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(enfermero))
            )
            .andExpect(status().isBadRequest());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(enfermero)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEnfermeroWithPatch() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();

        // Update the enfermero using partial update
        Enfermero partialUpdatedEnfermero = new Enfermero();
        partialUpdatedEnfermero.setId(enfermero.getId());

        restEnfermeroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEnfermero.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEnfermero))
            )
            .andExpect(status().isOk());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
        Enfermero testEnfermero = enfermeroList.get(enfermeroList.size() - 1);
        assertThat(testEnfermero.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void fullUpdateEnfermeroWithPatch() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();

        // Update the enfermero using partial update
        Enfermero partialUpdatedEnfermero = new Enfermero();
        partialUpdatedEnfermero.setId(enfermero.getId());

        partialUpdatedEnfermero.nombre(UPDATED_NOMBRE);

        restEnfermeroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEnfermero.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEnfermero))
            )
            .andExpect(status().isOk());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
        Enfermero testEnfermero = enfermeroList.get(enfermeroList.size() - 1);
        assertThat(testEnfermero.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void patchNonExistingEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, enfermero.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(enfermero))
            )
            .andExpect(status().isBadRequest());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(enfermero))
            )
            .andExpect(status().isBadRequest());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEnfermero() throws Exception {
        int databaseSizeBeforeUpdate = enfermeroRepository.findAll().size();
        enfermero.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEnfermeroMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(enfermero))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Enfermero in the database
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEnfermero() throws Exception {
        // Initialize the database
        enfermeroRepository.saveAndFlush(enfermero);

        int databaseSizeBeforeDelete = enfermeroRepository.findAll().size();

        // Delete the enfermero
        restEnfermeroMockMvc
            .perform(delete(ENTITY_API_URL_ID, enfermero.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Enfermero> enfermeroList = enfermeroRepository.findAll();
        assertThat(enfermeroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
