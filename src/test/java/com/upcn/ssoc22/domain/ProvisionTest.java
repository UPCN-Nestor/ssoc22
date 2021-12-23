package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProvisionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Provision.class);
        Provision provision1 = new Provision();
        provision1.setId(1L);
        Provision provision2 = new Provision();
        provision2.setId(provision1.getId());
        assertThat(provision1).isEqualTo(provision2);
        provision2.setId(2L);
        assertThat(provision1).isNotEqualTo(provision2);
        provision1.setId(null);
        assertThat(provision1).isNotEqualTo(provision2);
    }
}
