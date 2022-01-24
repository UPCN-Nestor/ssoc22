package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AdhesionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Adhesion.class);
        Adhesion adhesion1 = new Adhesion();
        adhesion1.setId(1L);
        Adhesion adhesion2 = new Adhesion();
        adhesion2.setId(adhesion1.getId());
        assertThat(adhesion1).isEqualTo(adhesion2);
        adhesion2.setId(2L);
        assertThat(adhesion1).isNotEqualTo(adhesion2);
        adhesion1.setId(null);
        assertThat(adhesion1).isNotEqualTo(adhesion2);
    }
}
