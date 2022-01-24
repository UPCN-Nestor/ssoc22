package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InsumoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Insumo.class);
        Insumo insumo1 = new Insumo();
        insumo1.setId(1L);
        Insumo insumo2 = new Insumo();
        insumo2.setId(insumo1.getId());
        assertThat(insumo1).isEqualTo(insumo2);
        insumo2.setId(2L);
        assertThat(insumo1).isNotEqualTo(insumo2);
        insumo1.setId(null);
        assertThat(insumo1).isNotEqualTo(insumo2);
    }
}
