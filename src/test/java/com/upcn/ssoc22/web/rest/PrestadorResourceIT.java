package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Prestador;
import com.upcn.ssoc22.repository.PrestadorRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PrestadorResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PrestadorResourceIT {

    private static final String ENTITY_API_URL = "/api/prestadors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Mock
    private PrestadorRepository prestadorRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrestadorMockMvc;

    private Prestador prestador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prestador createEntity(EntityManager em) {
        Prestador prestador = new Prestador();
        return prestador;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prestador createUpdatedEntity(EntityManager em) {
        Prestador prestador = new Prestador();
        return prestador;
    }

    @BeforeEach
    public void initTest() {
        prestador = createEntity(em);
    }

    @Test
    @Transactional
    void createPrestador() throws Exception {
        int databaseSizeBeforeCreate = prestadorRepository.findAll().size();
        // Create the Prestador
        restPrestadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestador)))
            .andExpect(status().isCreated());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeCreate + 1);
        Prestador testPrestador = prestadorList.get(prestadorList.size() - 1);
    }

    @Test
    @Transactional
    void createPrestadorWithExistingId() throws Exception {
        // Create the Prestador with an existing ID
        prestador.setId(1L);

        int databaseSizeBeforeCreate = prestadorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrestadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestador)))
            .andExpect(status().isBadRequest());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPrestadors() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        // Get all the prestadorList
        restPrestadorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prestador.getId().intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPrestadorsWithEagerRelationshipsIsEnabled() throws Exception {
        when(prestadorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPrestadorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(prestadorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPrestadorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(prestadorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPrestadorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(prestadorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getPrestador() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        // Get the prestador
        restPrestadorMockMvc
            .perform(get(ENTITY_API_URL_ID, prestador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prestador.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingPrestador() throws Exception {
        // Get the prestador
        restPrestadorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPrestador() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();

        // Update the prestador
        Prestador updatedPrestador = prestadorRepository.findById(prestador.getId()).get();
        // Disconnect from session so that the updates on updatedPrestador are not directly saved in db
        em.detach(updatedPrestador);

        restPrestadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPrestador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPrestador))
            )
            .andExpect(status().isOk());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
        Prestador testPrestador = prestadorList.get(prestadorList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, prestador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prestador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prestador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestador)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePrestadorWithPatch() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();

        // Update the prestador using partial update
        Prestador partialUpdatedPrestador = new Prestador();
        partialUpdatedPrestador.setId(prestador.getId());

        restPrestadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrestador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrestador))
            )
            .andExpect(status().isOk());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
        Prestador testPrestador = prestadorList.get(prestadorList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdatePrestadorWithPatch() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();

        // Update the prestador using partial update
        Prestador partialUpdatedPrestador = new Prestador();
        partialUpdatedPrestador.setId(prestador.getId());

        restPrestadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrestador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrestador))
            )
            .andExpect(status().isOk());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
        Prestador testPrestador = prestadorList.get(prestadorList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, prestador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prestador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prestador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPrestador() throws Exception {
        int databaseSizeBeforeUpdate = prestadorRepository.findAll().size();
        prestador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestadorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(prestador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prestador in the database
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePrestador() throws Exception {
        // Initialize the database
        prestadorRepository.saveAndFlush(prestador);

        int databaseSizeBeforeDelete = prestadorRepository.findAll().size();

        // Delete the prestador
        restPrestadorMockMvc
            .perform(delete(ENTITY_API_URL_ID, prestador.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prestador> prestadorList = prestadorRepository.findAll();
        assertThat(prestadorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
