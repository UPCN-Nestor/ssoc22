package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ItemPropioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPropio.class);
        ItemPropio itemPropio1 = new ItemPropio();
        itemPropio1.setId(1L);
        ItemPropio itemPropio2 = new ItemPropio();
        itemPropio2.setId(itemPropio1.getId());
        assertThat(itemPropio1).isEqualTo(itemPropio2);
        itemPropio2.setId(2L);
        assertThat(itemPropio1).isNotEqualTo(itemPropio2);
        itemPropio1.setId(null);
        assertThat(itemPropio1).isNotEqualTo(itemPropio2);
    }
}
