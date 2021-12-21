package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MovimientoStockTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoStock.class);
        MovimientoStock movimientoStock1 = new MovimientoStock();
        movimientoStock1.setId(1L);
        MovimientoStock movimientoStock2 = new MovimientoStock();
        movimientoStock2.setId(movimientoStock1.getId());
        assertThat(movimientoStock1).isEqualTo(movimientoStock2);
        movimientoStock2.setId(2L);
        assertThat(movimientoStock1).isNotEqualTo(movimientoStock2);
        movimientoStock1.setId(null);
        assertThat(movimientoStock1).isNotEqualTo(movimientoStock2);
    }
}
