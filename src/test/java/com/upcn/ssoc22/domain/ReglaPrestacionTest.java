package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReglaPrestacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReglaPrestacion.class);
        ReglaPrestacion reglaPrestacion1 = new ReglaPrestacion();
        reglaPrestacion1.setId(1L);
        ReglaPrestacion reglaPrestacion2 = new ReglaPrestacion();
        reglaPrestacion2.setId(reglaPrestacion1.getId());
        assertThat(reglaPrestacion1).isEqualTo(reglaPrestacion2);
        reglaPrestacion2.setId(2L);
        assertThat(reglaPrestacion1).isNotEqualTo(reglaPrestacion2);
        reglaPrestacion1.setId(null);
        assertThat(reglaPrestacion1).isNotEqualTo(reglaPrestacion2);
    }
}
