package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Chofer;
import com.upcn.ssoc22.repository.ChoferRepository;
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
 * Integration tests for the {@link ChoferResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChoferResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/chofers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChoferRepository choferRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChoferMockMvc;

    private Chofer chofer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chofer createEntity(EntityManager em) {
        Chofer chofer = new Chofer().nombre(DEFAULT_NOMBRE);
        return chofer;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chofer createUpdatedEntity(EntityManager em) {
        Chofer chofer = new Chofer().nombre(UPDATED_NOMBRE);
        return chofer;
    }

    @BeforeEach
    public void initTest() {
        chofer = createEntity(em);
    }

    @Test
    @Transactional
    void createChofer() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();
        // Create the Chofer
        restChoferMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isCreated());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate + 1);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void createChoferWithExistingId() throws Exception {
        // Create the Chofer with an existing ID
        chofer.setId(1L);

        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoferMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChofers() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get all the choferList
        restChoferMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chofer.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }

    @Test
    @Transactional
    void getChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get the chofer
        restChoferMockMvc
            .perform(get(ENTITY_API_URL_ID, chofer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chofer.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    void getNonExistingChofer() throws Exception {
        // Get the chofer
        restChoferMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer
        Chofer updatedChofer = choferRepository.findById(chofer.getId()).get();
        // Disconnect from session so that the updates on updatedChofer are not directly saved in db
        em.detach(updatedChofer);
        updatedChofer.nombre(UPDATED_NOMBRE);

        restChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChofer.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChofer))
            )
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void putNonExistingChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chofer.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChoferWithPatch() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer using partial update
        Chofer partialUpdatedChofer = new Chofer();
        partialUpdatedChofer.setId(chofer.getId());

        restChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChofer))
            )
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    void fullUpdateChoferWithPatch() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer using partial update
        Chofer partialUpdatedChofer = new Chofer();
        partialUpdatedChofer.setId(chofer.getId());

        partialUpdatedChofer.nombre(UPDATED_NOMBRE);

        restChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChofer))
            )
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void patchNonExistingChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chofer.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chofer))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();
        chofer.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChoferMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeDelete = choferRepository.findAll().size();

        // Delete the chofer
        restChoferMockMvc
            .perform(delete(ENTITY_API_URL_ID, chofer.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
