package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Subscripcion;
import com.upcn.ssoc22.repository.SubscripcionRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link SubscripcionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SubscripcionResourceIT {

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PARTICULARIDADES = "AAAAAAAAAA";
    private static final String UPDATED_PARTICULARIDADES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/subscripcions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SubscripcionRepository subscripcionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscripcionMockMvc;

    private Subscripcion subscripcion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscripcion createEntity(EntityManager em) {
        Subscripcion subscripcion = new Subscripcion().fechaAlta(DEFAULT_FECHA_ALTA).particularidades(DEFAULT_PARTICULARIDADES);
        return subscripcion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscripcion createUpdatedEntity(EntityManager em) {
        Subscripcion subscripcion = new Subscripcion().fechaAlta(UPDATED_FECHA_ALTA).particularidades(UPDATED_PARTICULARIDADES);
        return subscripcion;
    }

    @BeforeEach
    public void initTest() {
        subscripcion = createEntity(em);
    }

    @Test
    @Transactional
    void createSubscripcion() throws Exception {
        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();
        // Create the Subscripcion
        restSubscripcionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isCreated());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testSubscripcion.getParticularidades()).isEqualTo(DEFAULT_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void createSubscripcionWithExistingId() throws Exception {
        // Create the Subscripcion with an existing ID
        subscripcion.setId(1L);

        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscripcionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSubscripcions() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get all the subscripcionList
        restSubscripcionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].particularidades").value(hasItem(DEFAULT_PARTICULARIDADES)));
    }

    @Test
    @Transactional
    void getSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get the subscripcion
        restSubscripcionMockMvc
            .perform(get(ENTITY_API_URL_ID, subscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.particularidades").value(DEFAULT_PARTICULARIDADES));
    }

    @Test
    @Transactional
    void getNonExistingSubscripcion() throws Exception {
        // Get the subscripcion
        restSubscripcionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Update the subscripcion
        Subscripcion updatedSubscripcion = subscripcionRepository.findById(subscripcion.getId()).get();
        // Disconnect from session so that the updates on updatedSubscripcion are not directly saved in db
        em.detach(updatedSubscripcion);
        updatedSubscripcion.fechaAlta(UPDATED_FECHA_ALTA).particularidades(UPDATED_PARTICULARIDADES);

        restSubscripcionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSubscripcion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSubscripcion))
            )
            .andExpect(status().isOk());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testSubscripcion.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void putNonExistingSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, subscripcion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subscripcion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subscripcion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSubscripcionWithPatch() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Update the subscripcion using partial update
        Subscripcion partialUpdatedSubscripcion = new Subscripcion();
        partialUpdatedSubscripcion.setId(subscripcion.getId());

        partialUpdatedSubscripcion.fechaAlta(UPDATED_FECHA_ALTA).particularidades(UPDATED_PARTICULARIDADES);

        restSubscripcionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubscripcion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubscripcion))
            )
            .andExpect(status().isOk());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testSubscripcion.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void fullUpdateSubscripcionWithPatch() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Update the subscripcion using partial update
        Subscripcion partialUpdatedSubscripcion = new Subscripcion();
        partialUpdatedSubscripcion.setId(subscripcion.getId());

        partialUpdatedSubscripcion.fechaAlta(UPDATED_FECHA_ALTA).particularidades(UPDATED_PARTICULARIDADES);

        restSubscripcionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubscripcion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubscripcion))
            )
            .andExpect(status().isOk());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testSubscripcion.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void patchNonExistingSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, subscripcion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subscripcion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subscripcion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();
        subscripcion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(subscripcion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeDelete = subscripcionRepository.findAll().size();

        // Delete the subscripcion
        restSubscripcionMockMvc
            .perform(delete(ENTITY_API_URL_ID, subscripcion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
