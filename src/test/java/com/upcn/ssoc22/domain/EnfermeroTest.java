package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EnfermeroTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enfermero.class);
        Enfermero enfermero1 = new Enfermero();
        enfermero1.setId(1L);
        Enfermero enfermero2 = new Enfermero();
        enfermero2.setId(enfermero1.getId());
        assertThat(enfermero1).isEqualTo(enfermero2);
        enfermero2.setId(2L);
        assertThat(enfermero1).isNotEqualTo(enfermero2);
        enfermero1.setId(null);
        assertThat(enfermero1).isNotEqualTo(enfermero2);
    }
}
