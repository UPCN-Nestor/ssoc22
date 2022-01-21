package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IndividuoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Individuo.class);
        Individuo individuo1 = new Individuo();
        individuo1.setId(1L);
        Individuo individuo2 = new Individuo();
        individuo2.setId(individuo1.getId());
        assertThat(individuo1).isEqualTo(individuo2);
        individuo2.setId(2L);
        assertThat(individuo1).isNotEqualTo(individuo2);
        individuo1.setId(null);
        assertThat(individuo1).isNotEqualTo(individuo2);
    }
}
