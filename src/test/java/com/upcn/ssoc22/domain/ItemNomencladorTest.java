package com.upcn.ssoc22.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.upcn.ssoc22.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ItemNomencladorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemNomenclador.class);
        ItemNomenclador itemNomenclador1 = new ItemNomenclador();
        itemNomenclador1.setId(1L);
        ItemNomenclador itemNomenclador2 = new ItemNomenclador();
        itemNomenclador2.setId(itemNomenclador1.getId());
        assertThat(itemNomenclador1).isEqualTo(itemNomenclador2);
        itemNomenclador2.setId(2L);
        assertThat(itemNomenclador1).isNotEqualTo(itemNomenclador2);
        itemNomenclador1.setId(null);
        assertThat(itemNomenclador1).isNotEqualTo(itemNomenclador2);
    }
}
