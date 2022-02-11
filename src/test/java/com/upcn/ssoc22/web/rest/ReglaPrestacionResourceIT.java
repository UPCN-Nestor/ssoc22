package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ReglaPrestacionRepository;
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
 * Integration tests for the {@link ReglaPrestacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReglaPrestacionResourceIT {

    private static final String DEFAULT_CODIGO_REGLA = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_REGLA = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_REGLA = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_REGLA = "BBBBBBBBBB";

    private static final String DEFAULT_DATOS = "AAAAAAAAAA";
    private static final String UPDATED_DATOS = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/regla-prestacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReglaPrestacionRepository reglaPrestacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReglaPrestacionMockMvc;

    private ReglaPrestacion reglaPrestacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReglaPrestacion createEntity(EntityManager em) {
        ReglaPrestacion reglaPrestacion = new ReglaPrestacion()
            .codigoRegla(DEFAULT_CODIGO_REGLA)
            .tipoRegla(DEFAULT_TIPO_REGLA)
            .datos(DEFAULT_DATOS)
            .nombre(DEFAULT_NOMBRE);
        return reglaPrestacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReglaPrestacion createUpdatedEntity(EntityManager em) {
        ReglaPrestacion reglaPrestacion = new ReglaPrestacion()
            .codigoRegla(UPDATED_CODIGO_REGLA)
            .tipoRegla(UPDATED_TIPO_REGLA)
            .datos(UPDATED_DATOS)
            .nombre(UPDATED_NOMBRE);
        return reglaPrestacion;
    }

    @BeforeEach
    public void initTest() {
        reglaPrestacion = createEntity(em);
    }

    @Test
    @Transactional
    void createReglaPrestacion() throws Exception {
        int databaseSizeBeforeCreate = reglaPrestacionRepository.findAll().size();
        // Create the ReglaPrestacion
        restReglaPrestacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isCreated());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeCreate + 1);
        ReglaPrestacion testReglaPrestacion = reglaPrestacionList.get(reglaPrestacionList.size() - 1);
        assertThat(testReglaPrestacion.getCodigoRegla()).isEqualTo(DEFAULT_CODIGO_REGLA);
        assertThat(testReglaPrestacion.getTipoRegla()).isEqualTo(DEFAULT_TIPO_REGLA);
        assertThat(testReglaPrestacion.getDatos()).isEqualTo(DEFAULT_DATOS);
        assertThat(testReglaPrestacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void createReglaPrestacionWithExistingId() throws Exception {
        // Create the ReglaPrestacion with an existing ID
        reglaPrestacion.setId(1L);

        int databaseSizeBeforeCreate = reglaPrestacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReglaPrestacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReglaPrestacions() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        // Get all the reglaPrestacionList
        restReglaPrestacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reglaPrestacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoRegla").value(hasItem(DEFAULT_CODIGO_REGLA)))
            .andExpect(jsonPath("$.[*].tipoRegla").value(hasItem(DEFAULT_TIPO_REGLA)))
            .andExpect(jsonPath("$.[*].datos").value(hasItem(DEFAULT_DATOS)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }

    @Test
    @Transactional
    void getReglaPrestacion() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        // Get the reglaPrestacion
        restReglaPrestacionMockMvc
            .perform(get(ENTITY_API_URL_ID, reglaPrestacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reglaPrestacion.getId().intValue()))
            .andExpect(jsonPath("$.codigoRegla").value(DEFAULT_CODIGO_REGLA))
            .andExpect(jsonPath("$.tipoRegla").value(DEFAULT_TIPO_REGLA))
            .andExpect(jsonPath("$.datos").value(DEFAULT_DATOS))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    void getNonExistingReglaPrestacion() throws Exception {
        // Get the reglaPrestacion
        restReglaPrestacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReglaPrestacion() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();

        // Update the reglaPrestacion
        ReglaPrestacion updatedReglaPrestacion = reglaPrestacionRepository.findById(reglaPrestacion.getId()).get();
        // Disconnect from session so that the updates on updatedReglaPrestacion are not directly saved in db
        em.detach(updatedReglaPrestacion);
        updatedReglaPrestacion.codigoRegla(UPDATED_CODIGO_REGLA).tipoRegla(UPDATED_TIPO_REGLA).datos(UPDATED_DATOS).nombre(UPDATED_NOMBRE);

        restReglaPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReglaPrestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReglaPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
        ReglaPrestacion testReglaPrestacion = reglaPrestacionList.get(reglaPrestacionList.size() - 1);
        assertThat(testReglaPrestacion.getCodigoRegla()).isEqualTo(UPDATED_CODIGO_REGLA);
        assertThat(testReglaPrestacion.getTipoRegla()).isEqualTo(UPDATED_TIPO_REGLA);
        assertThat(testReglaPrestacion.getDatos()).isEqualTo(UPDATED_DATOS);
        assertThat(testReglaPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void putNonExistingReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reglaPrestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReglaPrestacionWithPatch() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();

        // Update the reglaPrestacion using partial update
        ReglaPrestacion partialUpdatedReglaPrestacion = new ReglaPrestacion();
        partialUpdatedReglaPrestacion.setId(reglaPrestacion.getId());

        partialUpdatedReglaPrestacion.tipoRegla(UPDATED_TIPO_REGLA).nombre(UPDATED_NOMBRE);

        restReglaPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReglaPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReglaPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
        ReglaPrestacion testReglaPrestacion = reglaPrestacionList.get(reglaPrestacionList.size() - 1);
        assertThat(testReglaPrestacion.getCodigoRegla()).isEqualTo(DEFAULT_CODIGO_REGLA);
        assertThat(testReglaPrestacion.getTipoRegla()).isEqualTo(UPDATED_TIPO_REGLA);
        assertThat(testReglaPrestacion.getDatos()).isEqualTo(DEFAULT_DATOS);
        assertThat(testReglaPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void fullUpdateReglaPrestacionWithPatch() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();

        // Update the reglaPrestacion using partial update
        ReglaPrestacion partialUpdatedReglaPrestacion = new ReglaPrestacion();
        partialUpdatedReglaPrestacion.setId(reglaPrestacion.getId());

        partialUpdatedReglaPrestacion
            .codigoRegla(UPDATED_CODIGO_REGLA)
            .tipoRegla(UPDATED_TIPO_REGLA)
            .datos(UPDATED_DATOS)
            .nombre(UPDATED_NOMBRE);

        restReglaPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReglaPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReglaPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
        ReglaPrestacion testReglaPrestacion = reglaPrestacionList.get(reglaPrestacionList.size() - 1);
        assertThat(testReglaPrestacion.getCodigoRegla()).isEqualTo(UPDATED_CODIGO_REGLA);
        assertThat(testReglaPrestacion.getTipoRegla()).isEqualTo(UPDATED_TIPO_REGLA);
        assertThat(testReglaPrestacion.getDatos()).isEqualTo(UPDATED_DATOS);
        assertThat(testReglaPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void patchNonExistingReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reglaPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReglaPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = reglaPrestacionRepository.findAll().size();
        reglaPrestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReglaPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reglaPrestacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReglaPrestacion in the database
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReglaPrestacion() throws Exception {
        // Initialize the database
        reglaPrestacionRepository.saveAndFlush(reglaPrestacion);

        int databaseSizeBeforeDelete = reglaPrestacionRepository.findAll().size();

        // Delete the reglaPrestacion
        restReglaPrestacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, reglaPrestacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReglaPrestacion> reglaPrestacionList = reglaPrestacionRepository.findAll();
        assertThat(reglaPrestacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
