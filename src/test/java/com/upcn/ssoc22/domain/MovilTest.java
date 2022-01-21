package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MovilTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Movil.class);
        Movil movil1 = new Movil();
        movil1.setId(1L);
        Movil movil2 = new Movil();
        movil2.setId(movil1.getId());
        assertThat(movil1).isEqualTo(movil2);
        movil2.setId(2L);
        assertThat(movil1).isNotEqualTo(movil2);
        movil1.setId(null);
        assertThat(movil1).isNotEqualTo(movil2);
    }
}
