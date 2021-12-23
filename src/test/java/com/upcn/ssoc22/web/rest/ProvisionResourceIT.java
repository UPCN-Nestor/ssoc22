package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.repository.ProvisionRepository;
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
 * Integration tests for the {@link ProvisionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProvisionResourceIT {

    private static final String ENTITY_API_URL = "/api/provisions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProvisionRepository provisionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProvisionMockMvc;

    private Provision provision;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provision createEntity(EntityManager em) {
        Provision provision = new Provision();
        return provision;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provision createUpdatedEntity(EntityManager em) {
        Provision provision = new Provision();
        return provision;
    }

    @BeforeEach
    public void initTest() {
        provision = createEntity(em);
    }

    @Test
    @Transactional
    void createProvision() throws Exception {
        int databaseSizeBeforeCreate = provisionRepository.findAll().size();
        // Create the Provision
        restProvisionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(provision)))
            .andExpect(status().isCreated());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeCreate + 1);
        Provision testProvision = provisionList.get(provisionList.size() - 1);
    }

    @Test
    @Transactional
    void createProvisionWithExistingId() throws Exception {
        // Create the Provision with an existing ID
        provision.setId(1L);

        int databaseSizeBeforeCreate = provisionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvisionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(provision)))
            .andExpect(status().isBadRequest());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProvisions() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        // Get all the provisionList
        restProvisionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(provision.getId().intValue())));
    }

    @Test
    @Transactional
    void getProvision() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        // Get the provision
        restProvisionMockMvc
            .perform(get(ENTITY_API_URL_ID, provision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(provision.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingProvision() throws Exception {
        // Get the provision
        restProvisionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewProvision() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();

        // Update the provision
        Provision updatedProvision = provisionRepository.findById(provision.getId()).get();
        // Disconnect from session so that the updates on updatedProvision are not directly saved in db
        em.detach(updatedProvision);

        restProvisionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProvision.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProvision))
            )
            .andExpect(status().isOk());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
        Provision testProvision = provisionList.get(provisionList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, provision.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(provision))
            )
            .andExpect(status().isBadRequest());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(provision))
            )
            .andExpect(status().isBadRequest());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(provision)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProvisionWithPatch() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();

        // Update the provision using partial update
        Provision partialUpdatedProvision = new Provision();
        partialUpdatedProvision.setId(provision.getId());

        restProvisionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProvision.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProvision))
            )
            .andExpect(status().isOk());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
        Provision testProvision = provisionList.get(provisionList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateProvisionWithPatch() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();

        // Update the provision using partial update
        Provision partialUpdatedProvision = new Provision();
        partialUpdatedProvision.setId(provision.getId());

        restProvisionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProvision.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProvision))
            )
            .andExpect(status().isOk());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
        Provision testProvision = provisionList.get(provisionList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, provision.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(provision))
            )
            .andExpect(status().isBadRequest());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(provision))
            )
            .andExpect(status().isBadRequest());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProvision() throws Exception {
        int databaseSizeBeforeUpdate = provisionRepository.findAll().size();
        provision.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProvisionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(provision))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Provision in the database
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProvision() throws Exception {
        // Initialize the database
        provisionRepository.saveAndFlush(provision);

        int databaseSizeBeforeDelete = provisionRepository.findAll().size();

        // Delete the provision
        restProvisionMockMvc
            .perform(delete(ENTITY_API_URL_ID, provision.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Provision> provisionList = provisionRepository.findAll();
        assertThat(provisionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
