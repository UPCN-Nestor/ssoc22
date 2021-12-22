package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SubscripcionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subscripcion.class);
        Subscripcion subscripcion1 = new Subscripcion();
        subscripcion1.setId(1L);
        Subscripcion subscripcion2 = new Subscripcion();
        subscripcion2.setId(subscripcion1.getId());
        assertThat(subscripcion1).isEqualTo(subscripcion2);
        subscripcion2.setId(2L);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
        subscripcion1.setId(null);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
    }
}
