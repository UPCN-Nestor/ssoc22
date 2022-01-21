package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.Insumo;
import com.upcn.ssoc22.repository.InsumoRepository;
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
 * Integration tests for the {@link InsumoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InsumoResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO_VENTA = 1F;
    private static final Float UPDATED_PRECIO_VENTA = 2F;

    private static final Boolean DEFAULT_ES_MODIFICABLE = false;
    private static final Boolean UPDATED_ES_MODIFICABLE = true;

    private static final String ENTITY_API_URL = "/api/insumos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInsumoMockMvc;

    private Insumo insumo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insumo createEntity(EntityManager em) {
        Insumo insumo = new Insumo().tipo(DEFAULT_TIPO).precioVenta(DEFAULT_PRECIO_VENTA).esModificable(DEFAULT_ES_MODIFICABLE);
        return insumo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insumo createUpdatedEntity(EntityManager em) {
        Insumo insumo = new Insumo().tipo(UPDATED_TIPO).precioVenta(UPDATED_PRECIO_VENTA).esModificable(UPDATED_ES_MODIFICABLE);
        return insumo;
    }

    @BeforeEach
    public void initTest() {
        insumo = createEntity(em);
    }

    @Test
    @Transactional
    void createInsumo() throws Exception {
        int databaseSizeBeforeCreate = insumoRepository.findAll().size();
        // Create the Insumo
        restInsumoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isCreated());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeCreate + 1);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testInsumo.getPrecioVenta()).isEqualTo(DEFAULT_PRECIO_VENTA);
        assertThat(testInsumo.getEsModificable()).isEqualTo(DEFAULT_ES_MODIFICABLE);
    }

    @Test
    @Transactional
    void createInsumoWithExistingId() throws Exception {
        // Create the Insumo with an existing ID
        insumo.setId(1L);

        int databaseSizeBeforeCreate = insumoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInsumoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInsumos() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        // Get all the insumoList
        restInsumoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(insumo.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].precioVenta").value(hasItem(DEFAULT_PRECIO_VENTA.doubleValue())))
            .andExpect(jsonPath("$.[*].esModificable").value(hasItem(DEFAULT_ES_MODIFICABLE.booleanValue())));
    }

    @Test
    @Transactional
    void getInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        // Get the insumo
        restInsumoMockMvc
            .perform(get(ENTITY_API_URL_ID, insumo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(insumo.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.precioVenta").value(DEFAULT_PRECIO_VENTA.doubleValue()))
            .andExpect(jsonPath("$.esModificable").value(DEFAULT_ES_MODIFICABLE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingInsumo() throws Exception {
        // Get the insumo
        restInsumoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();

        // Update the insumo
        Insumo updatedInsumo = insumoRepository.findById(insumo.getId()).get();
        // Disconnect from session so that the updates on updatedInsumo are not directly saved in db
        em.detach(updatedInsumo);
        updatedInsumo.tipo(UPDATED_TIPO).precioVenta(UPDATED_PRECIO_VENTA).esModificable(UPDATED_ES_MODIFICABLE);

        restInsumoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInsumo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInsumo))
            )
            .andExpect(status().isOk());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInsumo.getPrecioVenta()).isEqualTo(UPDATED_PRECIO_VENTA);
        assertThat(testInsumo.getEsModificable()).isEqualTo(UPDATED_ES_MODIFICABLE);
    }

    @Test
    @Transactional
    void putNonExistingInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, insumo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(insumo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(insumo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInsumoWithPatch() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();

        // Update the insumo using partial update
        Insumo partialUpdatedInsumo = new Insumo();
        partialUpdatedInsumo.setId(insumo.getId());

        partialUpdatedInsumo.tipo(UPDATED_TIPO);

        restInsumoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInsumo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInsumo))
            )
            .andExpect(status().isOk());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInsumo.getPrecioVenta()).isEqualTo(DEFAULT_PRECIO_VENTA);
        assertThat(testInsumo.getEsModificable()).isEqualTo(DEFAULT_ES_MODIFICABLE);
    }

    @Test
    @Transactional
    void fullUpdateInsumoWithPatch() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();

        // Update the insumo using partial update
        Insumo partialUpdatedInsumo = new Insumo();
        partialUpdatedInsumo.setId(insumo.getId());

        partialUpdatedInsumo.tipo(UPDATED_TIPO).precioVenta(UPDATED_PRECIO_VENTA).esModificable(UPDATED_ES_MODIFICABLE);

        restInsumoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInsumo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInsumo))
            )
            .andExpect(status().isOk());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
        Insumo testInsumo = insumoList.get(insumoList.size() - 1);
        assertThat(testInsumo.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInsumo.getPrecioVenta()).isEqualTo(UPDATED_PRECIO_VENTA);
        assertThat(testInsumo.getEsModificable()).isEqualTo(UPDATED_ES_MODIFICABLE);
    }

    @Test
    @Transactional
    void patchNonExistingInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, insumo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(insumo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(insumo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInsumo() throws Exception {
        int databaseSizeBeforeUpdate = insumoRepository.findAll().size();
        insumo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInsumoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(insumo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Insumo in the database
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInsumo() throws Exception {
        // Initialize the database
        insumoRepository.saveAndFlush(insumo);

        int databaseSizeBeforeDelete = insumoRepository.findAll().size();

        // Delete the insumo
        restInsumoMockMvc
            .perform(delete(ENTITY_API_URL_ID, insumo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Insumo> insumoList = insumoRepository.findAll();
        assertThat(insumoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
