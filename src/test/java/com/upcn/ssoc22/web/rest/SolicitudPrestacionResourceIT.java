package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.SolicitudPrestacion;
import com.upcn.ssoc22.repository.SolicitudPrestacionRepository;
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
 * Integration tests for the {@link SolicitudPrestacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SolicitudPrestacionResourceIT {

    private static final String ENTITY_API_URL = "/api/solicitud-prestacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SolicitudPrestacionRepository solicitudPrestacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSolicitudPrestacionMockMvc;

    private SolicitudPrestacion solicitudPrestacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SolicitudPrestacion createEntity(EntityManager em) {
        SolicitudPrestacion solicitudPrestacion = new SolicitudPrestacion();
        return solicitudPrestacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SolicitudPrestacion createUpdatedEntity(EntityManager em) {
        SolicitudPrestacion solicitudPrestacion = new SolicitudPrestacion();
        return solicitudPrestacion;
    }

    @BeforeEach
    public void initTest() {
        solicitudPrestacion = createEntity(em);
    }

    @Test
    @Transactional
    void createSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeCreate = solicitudPrestacionRepository.findAll().size();
        // Create the SolicitudPrestacion
        restSolicitudPrestacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isCreated());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeCreate + 1);
        SolicitudPrestacion testSolicitudPrestacion = solicitudPrestacionList.get(solicitudPrestacionList.size() - 1);
    }

    @Test
    @Transactional
    void createSolicitudPrestacionWithExistingId() throws Exception {
        // Create the SolicitudPrestacion with an existing ID
        solicitudPrestacion.setId(1L);

        int databaseSizeBeforeCreate = solicitudPrestacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolicitudPrestacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSolicitudPrestacions() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        // Get all the solicitudPrestacionList
        restSolicitudPrestacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudPrestacion.getId().intValue())));
    }

    @Test
    @Transactional
    void getSolicitudPrestacion() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        // Get the solicitudPrestacion
        restSolicitudPrestacionMockMvc
            .perform(get(ENTITY_API_URL_ID, solicitudPrestacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(solicitudPrestacion.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingSolicitudPrestacion() throws Exception {
        // Get the solicitudPrestacion
        restSolicitudPrestacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSolicitudPrestacion() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();

        // Update the solicitudPrestacion
        SolicitudPrestacion updatedSolicitudPrestacion = solicitudPrestacionRepository.findById(solicitudPrestacion.getId()).get();
        // Disconnect from session so that the updates on updatedSolicitudPrestacion are not directly saved in db
        em.detach(updatedSolicitudPrestacion);

        restSolicitudPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSolicitudPrestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSolicitudPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
        SolicitudPrestacion testSolicitudPrestacion = solicitudPrestacionList.get(solicitudPrestacionList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, solicitudPrestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSolicitudPrestacionWithPatch() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();

        // Update the solicitudPrestacion using partial update
        SolicitudPrestacion partialUpdatedSolicitudPrestacion = new SolicitudPrestacion();
        partialUpdatedSolicitudPrestacion.setId(solicitudPrestacion.getId());

        restSolicitudPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSolicitudPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSolicitudPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
        SolicitudPrestacion testSolicitudPrestacion = solicitudPrestacionList.get(solicitudPrestacionList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateSolicitudPrestacionWithPatch() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();

        // Update the solicitudPrestacion using partial update
        SolicitudPrestacion partialUpdatedSolicitudPrestacion = new SolicitudPrestacion();
        partialUpdatedSolicitudPrestacion.setId(solicitudPrestacion.getId());

        restSolicitudPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSolicitudPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSolicitudPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
        SolicitudPrestacion testSolicitudPrestacion = solicitudPrestacionList.get(solicitudPrestacionList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, solicitudPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSolicitudPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = solicitudPrestacionRepository.findAll().size();
        solicitudPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSolicitudPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(solicitudPrestacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SolicitudPrestacion in the database
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSolicitudPrestacion() throws Exception {
        // Initialize the database
        solicitudPrestacionRepository.saveAndFlush(solicitudPrestacion);

        int databaseSizeBeforeDelete = solicitudPrestacionRepository.findAll().size();

        // Delete the solicitudPrestacion
        restSolicitudPrestacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, solicitudPrestacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SolicitudPrestacion> solicitudPrestacionList = solicitudPrestacionRepository.findAll();
        assertThat(solicitudPrestacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
