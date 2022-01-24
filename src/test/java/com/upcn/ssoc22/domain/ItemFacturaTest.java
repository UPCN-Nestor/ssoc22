package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ItemFacturaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemFactura.class);
        ItemFactura itemFactura1 = new ItemFactura();
        itemFactura1.setId(1L);
        ItemFactura itemFactura2 = new ItemFactura();
        itemFactura2.setId(itemFactura1.getId());
        assertThat(itemFactura1).isEqualTo(itemFactura2);
        itemFactura2.setId(2L);
        assertThat(itemFactura1).isNotEqualTo(itemFactura2);
        itemFactura1.setId(null);
        assertThat(itemFactura1).isNotEqualTo(itemFactura2);
    }
}
