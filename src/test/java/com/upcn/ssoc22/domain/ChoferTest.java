package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChoferTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chofer.class);
        Chofer chofer1 = new Chofer();
        chofer1.setId(1L);
        Chofer chofer2 = new Chofer();
        chofer2.setId(chofer1.getId());
        assertThat(chofer1).isEqualTo(chofer2);
        chofer2.setId(2L);
        assertThat(chofer1).isNotEqualTo(chofer2);
        chofer1.setId(null);
        assertThat(chofer1).isNotEqualTo(chofer2);
    }
}
