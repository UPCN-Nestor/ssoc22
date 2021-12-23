package com.upcn.ssoc22.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.upcn.ssoc22.IntegrationTest;
import com.upcn.ssoc22.domain.MovimientoStock;
import com.upcn.ssoc22.repository.MovimientoStockRepository;
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
 * Integration tests for the {@link MovimientoStockResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientoStockResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_CANTIDAD = 1F;
    private static final Float UPDATED_CANTIDAD = 2F;

    private static final String ENTITY_API_URL = "/api/movimiento-stocks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientoStockRepository movimientoStockRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoStockMockMvc;

    private MovimientoStock movimientoStock;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoStock createEntity(EntityManager em) {
        MovimientoStock movimientoStock = new MovimientoStock().fecha(DEFAULT_FECHA).cantidad(DEFAULT_CANTIDAD);
        return movimientoStock;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoStock createUpdatedEntity(EntityManager em) {
        MovimientoStock movimientoStock = new MovimientoStock().fecha(UPDATED_FECHA).cantidad(UPDATED_CANTIDAD);
        return movimientoStock;
    }

    @BeforeEach
    public void initTest() {
        movimientoStock = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimientoStock() throws Exception {
        int databaseSizeBeforeCreate = movimientoStockRepository.findAll().size();
        // Create the MovimientoStock
        restMovimientoStockMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isCreated());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoStock testMovimientoStock = movimientoStockList.get(movimientoStockList.size() - 1);
        assertThat(testMovimientoStock.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimientoStock.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void createMovimientoStockWithExistingId() throws Exception {
        // Create the MovimientoStock with an existing ID
        movimientoStock.setId(1L);

        int databaseSizeBeforeCreate = movimientoStockRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoStockMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMovimientoStocks() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        // Get all the movimientoStockList
        restMovimientoStockMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.doubleValue())));
    }

    @Test
    @Transactional
    void getMovimientoStock() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        // Get the movimientoStock
        restMovimientoStockMockMvc
            .perform(get(ENTITY_API_URL_ID, movimientoStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoStock.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingMovimientoStock() throws Exception {
        // Get the movimientoStock
        restMovimientoStockMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimientoStock() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();

        // Update the movimientoStock
        MovimientoStock updatedMovimientoStock = movimientoStockRepository.findById(movimientoStock.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoStock are not directly saved in db
        em.detach(updatedMovimientoStock);
        updatedMovimientoStock.fecha(UPDATED_FECHA).cantidad(UPDATED_CANTIDAD);

        restMovimientoStockMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimientoStock.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoStock))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
        MovimientoStock testMovimientoStock = movimientoStockList.get(movimientoStockList.size() - 1);
        assertThat(testMovimientoStock.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientoStock.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void putNonExistingMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimientoStock.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientoStockWithPatch() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();

        // Update the movimientoStock using partial update
        MovimientoStock partialUpdatedMovimientoStock = new MovimientoStock();
        partialUpdatedMovimientoStock.setId(movimientoStock.getId());

        partialUpdatedMovimientoStock.fecha(UPDATED_FECHA);

        restMovimientoStockMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoStock.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoStock))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
        MovimientoStock testMovimientoStock = movimientoStockList.get(movimientoStockList.size() - 1);
        assertThat(testMovimientoStock.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientoStock.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void fullUpdateMovimientoStockWithPatch() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();

        // Update the movimientoStock using partial update
        MovimientoStock partialUpdatedMovimientoStock = new MovimientoStock();
        partialUpdatedMovimientoStock.setId(movimientoStock.getId());

        partialUpdatedMovimientoStock.fecha(UPDATED_FECHA).cantidad(UPDATED_CANTIDAD);

        restMovimientoStockMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoStock.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoStock))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
        MovimientoStock testMovimientoStock = movimientoStockList.get(movimientoStockList.size() - 1);
        assertThat(testMovimientoStock.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientoStock.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void patchNonExistingMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimientoStock.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimientoStock() throws Exception {
        int databaseSizeBeforeUpdate = movimientoStockRepository.findAll().size();
        movimientoStock.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoStockMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoStock))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoStock in the database
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimientoStock() throws Exception {
        // Initialize the database
        movimientoStockRepository.saveAndFlush(movimientoStock);

        int databaseSizeBeforeDelete = movimientoStockRepository.findAll().size();

        // Delete the movimientoStock
        restMovimientoStockMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimientoStock.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MovimientoStock> movimientoStockList = movimientoStockRepository.findAll();
        assertThat(movimientoStockList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
