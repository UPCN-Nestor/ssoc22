package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.ItemFactura;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ItemFactura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemFacturaRepository extends JpaRepository<ItemFactura, Long> {}
