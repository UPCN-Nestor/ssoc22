package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DespachoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Despacho.class);
        Despacho despacho1 = new Despacho();
        despacho1.setId(1L);
        Despacho despacho2 = new Despacho();
        despacho2.setId(despacho1.getId());
        assertThat(despacho1).isEqualTo(despacho2);
        despacho2.setId(2L);
        assertThat(despacho1).isNotEqualTo(despacho2);
        despacho1.setId(null);
        assertThat(despacho1).isNotEqualTo(despacho2);
    }
}
