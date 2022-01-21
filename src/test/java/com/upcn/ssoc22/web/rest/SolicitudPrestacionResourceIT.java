package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.SolicitudPrestacion;
import com.upcn.ssoc22.repository.SolicitudPrestacionRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link SolicitudPrestacionResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SolicitudPrestacionResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final LocalDate DEFAULT_HORA_SOLICITUD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HORA_SOLICITUD = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_DOMICILIO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final Integer DEFAULT_EDAD = 1;
    private static final Integer UPDATED_EDAD = 2;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/solicitud-prestacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SolicitudPrestacionRepository solicitudPrestacionRepository;

    @Mock
    private SolicitudPrestacionRepository solicitudPrestacionRepositoryMock;

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
        SolicitudPrestacion solicitudPrestacion = new SolicitudPrestacion()
            .fecha(DEFAULT_FECHA)
            .numero(DEFAULT_NUMERO)
            .horaSolicitud(DEFAULT_HORA_SOLICITUD)
            .domicilio(DEFAULT_DOMICILIO)
            .telefono(DEFAULT_TELEFONO)
            .edad(DEFAULT_EDAD)
            .observaciones(DEFAULT_OBSERVACIONES);
        return solicitudPrestacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SolicitudPrestacion createUpdatedEntity(EntityManager em) {
        SolicitudPrestacion solicitudPrestacion = new SolicitudPrestacion()
            .fecha(UPDATED_FECHA)
            .numero(UPDATED_NUMERO)
            .horaSolicitud(UPDATED_HORA_SOLICITUD)
            .domicilio(UPDATED_DOMICILIO)
            .telefono(UPDATED_TELEFONO)
            .edad(UPDATED_EDAD)
            .observaciones(UPDATED_OBSERVACIONES);
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
        assertThat(testSolicitudPrestacion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testSolicitudPrestacion.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testSolicitudPrestacion.getHoraSolicitud()).isEqualTo(DEFAULT_HORA_SOLICITUD);
        assertThat(testSolicitudPrestacion.getDomicilio()).isEqualTo(DEFAULT_DOMICILIO);
        assertThat(testSolicitudPrestacion.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testSolicitudPrestacion.getEdad()).isEqualTo(DEFAULT_EDAD);
        assertThat(testSolicitudPrestacion.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
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
            .andExpect(jsonPath("$.[*].id").value(hasItem(solicitudPrestacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].horaSolicitud").value(hasItem(DEFAULT_HORA_SOLICITUD.toString())))
            .andExpect(jsonPath("$.[*].domicilio").value(hasItem(DEFAULT_DOMICILIO)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].edad").value(hasItem(DEFAULT_EDAD)))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSolicitudPrestacionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(solicitudPrestacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSolicitudPrestacionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(solicitudPrestacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSolicitudPrestacionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(solicitudPrestacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSolicitudPrestacionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(solicitudPrestacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
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
            .andExpect(jsonPath("$.id").value(solicitudPrestacion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.horaSolicitud").value(DEFAULT_HORA_SOLICITUD.toString()))
            .andExpect(jsonPath("$.domicilio").value(DEFAULT_DOMICILIO))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.edad").value(DEFAULT_EDAD))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES));
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
        updatedSolicitudPrestacion
            .fecha(UPDATED_FECHA)
            .numero(UPDATED_NUMERO)
            .horaSolicitud(UPDATED_HORA_SOLICITUD)
            .domicilio(UPDATED_DOMICILIO)
            .telefono(UPDATED_TELEFONO)
            .edad(UPDATED_EDAD)
            .observaciones(UPDATED_OBSERVACIONES);

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
        assertThat(testSolicitudPrestacion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testSolicitudPrestacion.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testSolicitudPrestacion.getHoraSolicitud()).isEqualTo(UPDATED_HORA_SOLICITUD);
        assertThat(testSolicitudPrestacion.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testSolicitudPrestacion.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testSolicitudPrestacion.getEdad()).isEqualTo(UPDATED_EDAD);
        assertThat(testSolicitudPrestacion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
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

        partialUpdatedSolicitudPrestacion
            .fecha(UPDATED_FECHA)
            .numero(UPDATED_NUMERO)
            .domicilio(UPDATED_DOMICILIO)
            .telefono(UPDATED_TELEFONO)
            .edad(UPDATED_EDAD)
            .observaciones(UPDATED_OBSERVACIONES);

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
        assertThat(testSolicitudPrestacion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testSolicitudPrestacion.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testSolicitudPrestacion.getHoraSolicitud()).isEqualTo(DEFAULT_HORA_SOLICITUD);
        assertThat(testSolicitudPrestacion.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testSolicitudPrestacion.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testSolicitudPrestacion.getEdad()).isEqualTo(UPDATED_EDAD);
        assertThat(testSolicitudPrestacion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
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

        partialUpdatedSolicitudPrestacion
            .fecha(UPDATED_FECHA)
            .numero(UPDATED_NUMERO)
            .horaSolicitud(UPDATED_HORA_SOLICITUD)
            .domicilio(UPDATED_DOMICILIO)
            .telefono(UPDATED_TELEFONO)
            .edad(UPDATED_EDAD)
            .observaciones(UPDATED_OBSERVACIONES);

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
        assertThat(testSolicitudPrestacion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testSolicitudPrestacion.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testSolicitudPrestacion.getHoraSolicitud()).isEqualTo(UPDATED_HORA_SOLICITUD);
        assertThat(testSolicitudPrestacion.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testSolicitudPrestacion.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testSolicitudPrestacion.getEdad()).isEqualTo(UPDATED_EDAD);
        assertThat(testSolicitudPrestacion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
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
