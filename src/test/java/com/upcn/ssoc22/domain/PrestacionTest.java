package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PrestacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prestacion.class);
        Prestacion prestacion1 = new Prestacion();
        prestacion1.setId(1L);
        Prestacion prestacion2 = new Prestacion();
        prestacion2.setId(prestacion1.getId());
        assertThat(prestacion1).isEqualTo(prestacion2);
        prestacion2.setId(2L);
        assertThat(prestacion1).isNotEqualTo(prestacion2);
        prestacion1.setId(null);
        assertThat(prestacion1).isNotEqualTo(prestacion2);
    }
}
