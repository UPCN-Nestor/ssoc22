package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SolicitudPrestacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolicitudPrestacion.class);
        SolicitudPrestacion solicitudPrestacion1 = new SolicitudPrestacion();
        solicitudPrestacion1.setId(1L);
        SolicitudPrestacion solicitudPrestacion2 = new SolicitudPrestacion();
        solicitudPrestacion2.setId(solicitudPrestacion1.getId());
        assertThat(solicitudPrestacion1).isEqualTo(solicitudPrestacion2);
        solicitudPrestacion2.setId(2L);
        assertThat(solicitudPrestacion1).isNotEqualTo(solicitudPrestacion2);
        solicitudPrestacion1.setId(null);
        assertThat(solicitudPrestacion1).isNotEqualTo(solicitudPrestacion2);
    }
}
