package com.upcn.ssoc22.web.rest;

import static com.upcn.ssoc22.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Contrato;
import com.upcn.ssoc22.repository.ContratoRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link ContratoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ContratoResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_ALTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_ALTA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_BAJA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_BAJA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PARTICULARIDADES = "AAAAAAAAAA";
    private static final String UPDATED_PARTICULARIDADES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/contratoes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContratoMockMvc;

    private Contrato contrato;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contrato createEntity(EntityManager em) {
        Contrato contrato = new Contrato()
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .fechaBaja(DEFAULT_FECHA_BAJA)
            .particularidades(DEFAULT_PARTICULARIDADES);
        return contrato;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contrato createUpdatedEntity(EntityManager em) {
        Contrato contrato = new Contrato()
            .fechaAlta(UPDATED_FECHA_ALTA)
            .fechaBaja(UPDATED_FECHA_BAJA)
            .particularidades(UPDATED_PARTICULARIDADES);
        return contrato;
    }

    @BeforeEach
    public void initTest() {
        contrato = createEntity(em);
    }

    @Test
    @Transactional
    void createContrato() throws Exception {
        int databaseSizeBeforeCreate = contratoRepository.findAll().size();
        // Create the Contrato
        restContratoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isCreated());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate + 1);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testContrato.getFechaBaja()).isEqualTo(DEFAULT_FECHA_BAJA);
        assertThat(testContrato.getParticularidades()).isEqualTo(DEFAULT_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void createContratoWithExistingId() throws Exception {
        // Create the Contrato with an existing ID
        contrato.setId(1L);

        int databaseSizeBeforeCreate = contratoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restContratoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllContratoes() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get all the contratoList
        restContratoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contrato.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(sameInstant(DEFAULT_FECHA_ALTA))))
            .andExpect(jsonPath("$.[*].fechaBaja").value(hasItem(sameInstant(DEFAULT_FECHA_BAJA))))
            .andExpect(jsonPath("$.[*].particularidades").value(hasItem(DEFAULT_PARTICULARIDADES)));
    }

    @Test
    @Transactional
    void getContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        // Get the contrato
        restContratoMockMvc
            .perform(get(ENTITY_API_URL_ID, contrato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contrato.getId().intValue()))
            .andExpect(jsonPath("$.fechaAlta").value(sameInstant(DEFAULT_FECHA_ALTA)))
            .andExpect(jsonPath("$.fechaBaja").value(sameInstant(DEFAULT_FECHA_BAJA)))
            .andExpect(jsonPath("$.particularidades").value(DEFAULT_PARTICULARIDADES));
    }

    @Test
    @Transactional
    void getNonExistingContrato() throws Exception {
        // Get the contrato
        restContratoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Update the contrato
        Contrato updatedContrato = contratoRepository.findById(contrato.getId()).get();
        // Disconnect from session so that the updates on updatedContrato are not directly saved in db
        em.detach(updatedContrato);
        updatedContrato.fechaAlta(UPDATED_FECHA_ALTA).fechaBaja(UPDATED_FECHA_BAJA).particularidades(UPDATED_PARTICULARIDADES);

        restContratoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedContrato.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedContrato))
            )
            .andExpect(status().isOk());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testContrato.getFechaBaja()).isEqualTo(UPDATED_FECHA_BAJA);
        assertThat(testContrato.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void putNonExistingContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, contrato.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contrato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contrato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateContratoWithPatch() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Update the contrato using partial update
        Contrato partialUpdatedContrato = new Contrato();
        partialUpdatedContrato.setId(contrato.getId());

        restContratoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContrato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContrato))
            )
            .andExpect(status().isOk());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testContrato.getFechaBaja()).isEqualTo(DEFAULT_FECHA_BAJA);
        assertThat(testContrato.getParticularidades()).isEqualTo(DEFAULT_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void fullUpdateContratoWithPatch() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();

        // Update the contrato using partial update
        Contrato partialUpdatedContrato = new Contrato();
        partialUpdatedContrato.setId(contrato.getId());

        partialUpdatedContrato.fechaAlta(UPDATED_FECHA_ALTA).fechaBaja(UPDATED_FECHA_BAJA).particularidades(UPDATED_PARTICULARIDADES);

        restContratoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContrato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContrato))
            )
            .andExpect(status().isOk());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
        Contrato testContrato = contratoList.get(contratoList.size() - 1);
        assertThat(testContrato.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testContrato.getFechaBaja()).isEqualTo(UPDATED_FECHA_BAJA);
        assertThat(testContrato.getParticularidades()).isEqualTo(UPDATED_PARTICULARIDADES);
    }

    @Test
    @Transactional
    void patchNonExistingContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, contrato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contrato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contrato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamContrato() throws Exception {
        int databaseSizeBeforeUpdate = contratoRepository.findAll().size();
        contrato.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContratoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(contrato)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contrato in the database
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteContrato() throws Exception {
        // Initialize the database
        contratoRepository.saveAndFlush(contrato);

        int databaseSizeBeforeDelete = contratoRepository.findAll().size();

        // Delete the contrato
        restContratoMockMvc
            .perform(delete(ENTITY_API_URL_ID, contrato.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contrato> contratoList = contratoRepository.findAll();
        assertThat(contratoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
