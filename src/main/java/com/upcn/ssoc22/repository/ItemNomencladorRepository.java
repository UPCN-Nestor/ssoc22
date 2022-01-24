package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.ItemNomenclador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ItemNomenclador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemNomencladorRepository extends JpaRepository<ItemNomenclador, Long> {}
