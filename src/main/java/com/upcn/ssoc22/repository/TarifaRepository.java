package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Tarifa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Tarifa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarifaRepository extends JpaRepository<Tarifa, Long> {}
