package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Prestacion;
import com.upcn.ssoc22.repository.PrestacionRepository;
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
 * Integration tests for the {@link PrestacionResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PrestacionResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO = 1F;
    private static final Float UPDATED_PRECIO = 2F;

    private static final Integer DEFAULT_DIAS_CARENCIA = 1;
    private static final Integer UPDATED_DIAS_CARENCIA = 2;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/prestacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PrestacionRepository prestacionRepository;

    @Mock
    private PrestacionRepository prestacionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrestacionMockMvc;

    private Prestacion prestacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prestacion createEntity(EntityManager em) {
        Prestacion prestacion = new Prestacion()
            .tipo(DEFAULT_TIPO)
            .precio(DEFAULT_PRECIO)
            .diasCarencia(DEFAULT_DIAS_CARENCIA)
            .nombre(DEFAULT_NOMBRE)
            .codigo(DEFAULT_CODIGO);
        return prestacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prestacion createUpdatedEntity(EntityManager em) {
        Prestacion prestacion = new Prestacion()
            .tipo(UPDATED_TIPO)
            .precio(UPDATED_PRECIO)
            .diasCarencia(UPDATED_DIAS_CARENCIA)
            .nombre(UPDATED_NOMBRE)
            .codigo(UPDATED_CODIGO);
        return prestacion;
    }

    @BeforeEach
    public void initTest() {
        prestacion = createEntity(em);
    }

    @Test
    @Transactional
    void createPrestacion() throws Exception {
        int databaseSizeBeforeCreate = prestacionRepository.findAll().size();
        // Create the Prestacion
        restPrestacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestacion)))
            .andExpect(status().isCreated());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeCreate + 1);
        Prestacion testPrestacion = prestacionList.get(prestacionList.size() - 1);
        assertThat(testPrestacion.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPrestacion.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testPrestacion.getDiasCarencia()).isEqualTo(DEFAULT_DIAS_CARENCIA);
        assertThat(testPrestacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPrestacion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    void createPrestacionWithExistingId() throws Exception {
        // Create the Prestacion with an existing ID
        prestacion.setId(1L);

        int databaseSizeBeforeCreate = prestacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrestacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestacion)))
            .andExpect(status().isBadRequest());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPrestacions() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        // Get all the prestacionList
        restPrestacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prestacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].diasCarencia").value(hasItem(DEFAULT_DIAS_CARENCIA)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPrestacionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(prestacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPrestacionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(prestacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPrestacionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(prestacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPrestacionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(prestacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getPrestacion() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        // Get the prestacion
        restPrestacionMockMvc
            .perform(get(ENTITY_API_URL_ID, prestacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prestacion.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.diasCarencia").value(DEFAULT_DIAS_CARENCIA))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    void getNonExistingPrestacion() throws Exception {
        // Get the prestacion
        restPrestacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPrestacion() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();

        // Update the prestacion
        Prestacion updatedPrestacion = prestacionRepository.findById(prestacion.getId()).get();
        // Disconnect from session so that the updates on updatedPrestacion are not directly saved in db
        em.detach(updatedPrestacion);
        updatedPrestacion
            .tipo(UPDATED_TIPO)
            .precio(UPDATED_PRECIO)
            .diasCarencia(UPDATED_DIAS_CARENCIA)
            .nombre(UPDATED_NOMBRE)
            .codigo(UPDATED_CODIGO);

        restPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPrestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
        Prestacion testPrestacion = prestacionList.get(prestacionList.size() - 1);
        assertThat(testPrestacion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPrestacion.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testPrestacion.getDiasCarencia()).isEqualTo(UPDATED_DIAS_CARENCIA);
        assertThat(testPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPrestacion.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void putNonExistingPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, prestacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prestacion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePrestacionWithPatch() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();

        // Update the prestacion using partial update
        Prestacion partialUpdatedPrestacion = new Prestacion();
        partialUpdatedPrestacion.setId(prestacion.getId());

        partialUpdatedPrestacion.tipo(UPDATED_TIPO).diasCarencia(UPDATED_DIAS_CARENCIA).nombre(UPDATED_NOMBRE);

        restPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
        Prestacion testPrestacion = prestacionList.get(prestacionList.size() - 1);
        assertThat(testPrestacion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPrestacion.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testPrestacion.getDiasCarencia()).isEqualTo(UPDATED_DIAS_CARENCIA);
        assertThat(testPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPrestacion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    void fullUpdatePrestacionWithPatch() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();

        // Update the prestacion using partial update
        Prestacion partialUpdatedPrestacion = new Prestacion();
        partialUpdatedPrestacion.setId(prestacion.getId());

        partialUpdatedPrestacion
            .tipo(UPDATED_TIPO)
            .precio(UPDATED_PRECIO)
            .diasCarencia(UPDATED_DIAS_CARENCIA)
            .nombre(UPDATED_NOMBRE)
            .codigo(UPDATED_CODIGO);

        restPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrestacion))
            )
            .andExpect(status().isOk());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
        Prestacion testPrestacion = prestacionList.get(prestacionList.size() - 1);
        assertThat(testPrestacion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPrestacion.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testPrestacion.getDiasCarencia()).isEqualTo(UPDATED_DIAS_CARENCIA);
        assertThat(testPrestacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPrestacion.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void patchNonExistingPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, prestacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prestacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPrestacion() throws Exception {
        int databaseSizeBeforeUpdate = prestacionRepository.findAll().size();
        prestacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrestacionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(prestacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prestacion in the database
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePrestacion() throws Exception {
        // Initialize the database
        prestacionRepository.saveAndFlush(prestacion);

        int databaseSizeBeforeDelete = prestacionRepository.findAll().size();

        // Delete the prestacion
        restPrestacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, prestacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prestacion> prestacionList = prestacionRepository.findAll();
        assertThat(prestacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
