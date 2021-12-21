package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.repository.AdhesionRepository;
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
 * Integration tests for the {@link AdhesionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AdhesionResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PARTICULARIDADES = "AAAAAAAAAA";
    private static final String UPDATED_PARTICULARIDADES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/adhesions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AdhesionRepository adhesionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdhesionMockMvc;

    private Adhesion adhesion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Adhesion createEntity(EntityManager em) {
        Adhesion adhesion = new Adhesion().fecha(DEFAULT_FECHA).particularidades(DEFAULT_PARTICULARIDADES);
        return adhesion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Adhesion createUpdatedEntity(EntityManager em) {
        Adhesion adhesion = new Adhesion().fecha(UPDATED_FECHA).particularidades(UPDATED_PARTICULARIDADES);
        return adhesion;
    }

    @BeforeEach
    public void initTest() {
        adhesion = createEntity(em);
    }

    @Test
    @Transactional
    void createAdhesion() throws Exception {
        int databaseSizeBeforeCreate = adhesionRepository.findAll().size();
        // Create the Adhesion
        restAdhesionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adhesion)))
            .andExpect(status().isCreated());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeCreate + 1);
        Adhesion testAdhesion = adhesionList.get(adhesionList.size() - 1);
        assertThat(testAdhesion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAdhesion.getParticularidades()).isEqualTo(DEFAULT_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void createAdhesionWithExistingId() throws Exception {
        // Create the Adhesion with an existing ID
        adhesion.setId(1L);

        int databaseSizeBeforeCreate = adhesionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdhesionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adhesion)))
            .andExpect(status().isBadRequest());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAdhesions() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        // Get all the adhesionList
        restAdhesionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adhesion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].particularidades").value(hasItem(DEFAULT_PARTICULARIDADES)));
    }

    @Test
    @Transactional
    void getAdhesion() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        // Get the adhesion
        restAdhesionMockMvc
            .perform(get(ENTITY_API_URL_ID, adhesion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(adhesion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.particularidades").value(DEFAULT_PARTICULARIDADES));
    }

    @Test
    @Transactional
    void getNonExistingAdhesion() throws Exception {
        // Get the adhesion
        restAdhesionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAdhesion() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();

        // Update the adhesion
        Adhesion updatedAdhesion = adhesionRepository.findById(adhesion.getId()).get();
        // Disconnect from session so that the updates on updatedAdhesion are not directly saved in db
        em.detach(updatedAdhesion);
        updatedAdhesion.fecha(UPDATED_FECHA).particularidades(UPDATED_PARTICULARIDADES);

        restAdhesionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAdhesion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAdhesion))
            )
            .andExpect(status().isOk());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
        Adhesion testAdhesion = adhesionList.get(adhesionList.size() - 1);
        assertThat(testAdhesion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAdhesion.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void putNonExistingAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, adhesion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adhesion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adhesion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adhesion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAdhesionWithPatch() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();

        // Update the adhesion using partial update
        Adhesion partialUpdatedAdhesion = new Adhesion();
        partialUpdatedAdhesion.setId(adhesion.getId());

        restAdhesionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdhesion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdhesion))
            )
            .andExpect(status().isOk());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
        Adhesion testAdhesion = adhesionList.get(adhesionList.size() - 1);
        assertThat(testAdhesion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAdhesion.getParticularidades()).isEqualTo(DEFAULT_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void fullUpdateAdhesionWithPatch() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();

        // Update the adhesion using partial update
        Adhesion partialUpdatedAdhesion = new Adhesion();
        partialUpdatedAdhesion.setId(adhesion.getId());

        partialUpdatedAdhesion.fecha(UPDATED_FECHA).particularidades(UPDATED_PARTICULARIDADES);

        restAdhesionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdhesion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdhesion))
            )
            .andExpect(status().isOk());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
        Adhesion testAdhesion = adhesionList.get(adhesionList.size() - 1);
        assertThat(testAdhesion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAdhesion.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void patchNonExistingAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, adhesion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adhesion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adhesion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAdhesion() throws Exception {
        int databaseSizeBeforeUpdate = adhesionRepository.findAll().size();
        adhesion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdhesionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(adhesion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Adhesion in the database
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAdhesion() throws Exception {
        // Initialize the database
        adhesionRepository.saveAndFlush(adhesion);

        int databaseSizeBeforeDelete = adhesionRepository.findAll().size();

        // Delete the adhesion
        restAdhesionMockMvc
            .perform(delete(ENTITY_API_URL_ID, adhesion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Adhesion> adhesionList = adhesionRepository.findAll();
        assertThat(adhesionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
