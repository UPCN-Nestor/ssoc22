package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.MovimientoStock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the MovimientoStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoStockRepository extends JpaRepository<MovimientoStock, Long> {}
