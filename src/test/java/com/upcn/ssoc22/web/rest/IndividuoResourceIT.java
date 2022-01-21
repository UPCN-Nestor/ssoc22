package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Individuo;
import com.upcn.ssoc22.repository.IndividuoRepository;
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
 * Integration tests for the {@link IndividuoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IndividuoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DNI = "AAAAAAAAAA";
    private static final String UPDATED_DNI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/individuos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IndividuoRepository individuoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIndividuoMockMvc;

    private Individuo individuo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Individuo createEntity(EntityManager em) {
        Individuo individuo = new Individuo().nombre(DEFAULT_NOMBRE).dni(DEFAULT_DNI);
        return individuo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Individuo createUpdatedEntity(EntityManager em) {
        Individuo individuo = new Individuo().nombre(UPDATED_NOMBRE).dni(UPDATED_DNI);
        return individuo;
    }

    @BeforeEach
    public void initTest() {
        individuo = createEntity(em);
    }

    @Test
    @Transactional
    void createIndividuo() throws Exception {
        int databaseSizeBeforeCreate = individuoRepository.findAll().size();
        // Create the Individuo
        restIndividuoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(individuo)))
            .andExpect(status().isCreated());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeCreate + 1);
        Individuo testIndividuo = individuoList.get(individuoList.size() - 1);
        assertThat(testIndividuo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testIndividuo.getDni()).isEqualTo(DEFAULT_DNI);
    }

    @Test
    @Transactional
    void createIndividuoWithExistingId() throws Exception {
        // Create the Individuo with an existing ID
        individuo.setId(1L);

        int databaseSizeBeforeCreate = individuoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndividuoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(individuo)))
            .andExpect(status().isBadRequest());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllIndividuos() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        // Get all the individuoList
        restIndividuoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(individuo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].dni").value(hasItem(DEFAULT_DNI)));
    }

    @Test
    @Transactional
    void getIndividuo() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        // Get the individuo
        restIndividuoMockMvc
            .perform(get(ENTITY_API_URL_ID, individuo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(individuo.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.dni").value(DEFAULT_DNI));
    }

    @Test
    @Transactional
    void getNonExistingIndividuo() throws Exception {
        // Get the individuo
        restIndividuoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewIndividuo() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();

        // Update the individuo
        Individuo updatedIndividuo = individuoRepository.findById(individuo.getId()).get();
        // Disconnect from session so that the updates on updatedIndividuo are not directly saved in db
        em.detach(updatedIndividuo);
        updatedIndividuo.nombre(UPDATED_NOMBRE).dni(UPDATED_DNI);

        restIndividuoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIndividuo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIndividuo))
            )
            .andExpect(status().isOk());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
        Individuo testIndividuo = individuoList.get(individuoList.size() - 1);
        assertThat(testIndividuo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testIndividuo.getDni()).isEqualTo(UPDATED_DNI);
    }

    @Test
    @Transactional
    void putNonExistingIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, individuo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(individuo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(individuo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(individuo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIndividuoWithPatch() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();

        // Update the individuo using partial update
        Individuo partialUpdatedIndividuo = new Individuo();
        partialUpdatedIndividuo.setId(individuo.getId());

        restIndividuoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIndividuo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIndividuo))
            )
            .andExpect(status().isOk());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
        Individuo testIndividuo = individuoList.get(individuoList.size() - 1);
        assertThat(testIndividuo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testIndividuo.getDni()).isEqualTo(DEFAULT_DNI);
    }

    @Test
    @Transactional
    void fullUpdateIndividuoWithPatch() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();

        // Update the individuo using partial update
        Individuo partialUpdatedIndividuo = new Individuo();
        partialUpdatedIndividuo.setId(individuo.getId());

        partialUpdatedIndividuo.nombre(UPDATED_NOMBRE).dni(UPDATED_DNI);

        restIndividuoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIndividuo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIndividuo))
            )
            .andExpect(status().isOk());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
        Individuo testIndividuo = individuoList.get(individuoList.size() - 1);
        assertThat(testIndividuo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testIndividuo.getDni()).isEqualTo(UPDATED_DNI);
    }

    @Test
    @Transactional
    void patchNonExistingIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, individuo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(individuo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(individuo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIndividuo() throws Exception {
        int databaseSizeBeforeUpdate = individuoRepository.findAll().size();
        individuo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIndividuoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(individuo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Individuo in the database
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIndividuo() throws Exception {
        // Initialize the database
        individuoRepository.saveAndFlush(individuo);

        int databaseSizeBeforeDelete = individuoRepository.findAll().size();

        // Delete the individuo
        restIndividuoMockMvc
            .perform(delete(ENTITY_API_URL_ID, individuo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Individuo> individuoList = individuoRepository.findAll();
        assertThat(individuoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
