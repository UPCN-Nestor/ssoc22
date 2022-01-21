package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Tarifa;
import com.upcn.ssoc22.repository.TarifaRepository;
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
 * Integration tests for the {@link TarifaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TarifaResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_DATOS = "AAAAAAAAAA";
    private static final String UPDATED_DATOS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_VIGENCIA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VIGENCIA_HASTA = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/tarifas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TarifaRepository tarifaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTarifaMockMvc;

    private Tarifa tarifa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarifa createEntity(EntityManager em) {
        Tarifa tarifa = new Tarifa().tipo(DEFAULT_TIPO).datos(DEFAULT_DATOS).vigenciaHasta(DEFAULT_VIGENCIA_HASTA);
        return tarifa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarifa createUpdatedEntity(EntityManager em) {
        Tarifa tarifa = new Tarifa().tipo(UPDATED_TIPO).datos(UPDATED_DATOS).vigenciaHasta(UPDATED_VIGENCIA_HASTA);
        return tarifa;
    }

    @BeforeEach
    public void initTest() {
        tarifa = createEntity(em);
    }

    @Test
    @Transactional
    void createTarifa() throws Exception {
        int databaseSizeBeforeCreate = tarifaRepository.findAll().size();
        // Create the Tarifa
        restTarifaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifa)))
            .andExpect(status().isCreated());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeCreate + 1);
        Tarifa testTarifa = tarifaList.get(tarifaList.size() - 1);
        assertThat(testTarifa.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testTarifa.getDatos()).isEqualTo(DEFAULT_DATOS);
        assertThat(testTarifa.getVigenciaHasta()).isEqualTo(DEFAULT_VIGENCIA_HASTA);
    }

    @Test
    @Transactional
    void createTarifaWithExistingId() throws Exception {
        // Create the Tarifa with an existing ID
        tarifa.setId(1L);

        int databaseSizeBeforeCreate = tarifaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifa)))
            .andExpect(status().isBadRequest());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTarifas() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        // Get all the tarifaList
        restTarifaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifa.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].datos").value(hasItem(DEFAULT_DATOS)))
            .andExpect(jsonPath("$.[*].vigenciaHasta").value(hasItem(DEFAULT_VIGENCIA_HASTA.toString())));
    }

    @Test
    @Transactional
    void getTarifa() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        // Get the tarifa
        restTarifaMockMvc
            .perform(get(ENTITY_API_URL_ID, tarifa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tarifa.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.datos").value(DEFAULT_DATOS))
            .andExpect(jsonPath("$.vigenciaHasta").value(DEFAULT_VIGENCIA_HASTA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTarifa() throws Exception {
        // Get the tarifa
        restTarifaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTarifa() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();

        // Update the tarifa
        Tarifa updatedTarifa = tarifaRepository.findById(tarifa.getId()).get();
        // Disconnect from session so that the updates on updatedTarifa are not directly saved in db
        em.detach(updatedTarifa);
        updatedTarifa.tipo(UPDATED_TIPO).datos(UPDATED_DATOS).vigenciaHasta(UPDATED_VIGENCIA_HASTA);

        restTarifaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTarifa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTarifa))
            )
            .andExpect(status().isOk());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
        Tarifa testTarifa = tarifaList.get(tarifaList.size() - 1);
        assertThat(testTarifa.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testTarifa.getDatos()).isEqualTo(UPDATED_DATOS);
        assertThat(testTarifa.getVigenciaHasta()).isEqualTo(UPDATED_VIGENCIA_HASTA);
    }

    @Test
    @Transactional
    void putNonExistingTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tarifa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTarifaWithPatch() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();

        // Update the tarifa using partial update
        Tarifa partialUpdatedTarifa = new Tarifa();
        partialUpdatedTarifa.setId(tarifa.getId());

        partialUpdatedTarifa.tipo(UPDATED_TIPO);

        restTarifaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifa))
            )
            .andExpect(status().isOk());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
        Tarifa testTarifa = tarifaList.get(tarifaList.size() - 1);
        assertThat(testTarifa.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testTarifa.getDatos()).isEqualTo(DEFAULT_DATOS);
        assertThat(testTarifa.getVigenciaHasta()).isEqualTo(DEFAULT_VIGENCIA_HASTA);
    }

    @Test
    @Transactional
    void fullUpdateTarifaWithPatch() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();

        // Update the tarifa using partial update
        Tarifa partialUpdatedTarifa = new Tarifa();
        partialUpdatedTarifa.setId(tarifa.getId());

        partialUpdatedTarifa.tipo(UPDATED_TIPO).datos(UPDATED_DATOS).vigenciaHasta(UPDATED_VIGENCIA_HASTA);

        restTarifaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifa))
            )
            .andExpect(status().isOk());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
        Tarifa testTarifa = tarifaList.get(tarifaList.size() - 1);
        assertThat(testTarifa.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testTarifa.getDatos()).isEqualTo(UPDATED_DATOS);
        assertThat(testTarifa.getVigenciaHasta()).isEqualTo(UPDATED_VIGENCIA_HASTA);
    }

    @Test
    @Transactional
    void patchNonExistingTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tarifa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTarifa() throws Exception {
        int databaseSizeBeforeUpdate = tarifaRepository.findAll().size();
        tarifa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tarifa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tarifa in the database
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTarifa() throws Exception {
        // Initialize the database
        tarifaRepository.saveAndFlush(tarifa);

        int databaseSizeBeforeDelete = tarifaRepository.findAll().size();

        // Delete the tarifa
        restTarifaMockMvc
            .perform(delete(ENTITY_API_URL_ID, tarifa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tarifa> tarifaList = tarifaRepository.findAll();
        assertThat(tarifaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
