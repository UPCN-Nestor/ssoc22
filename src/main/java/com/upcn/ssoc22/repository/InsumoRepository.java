package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Insumo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Insumo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {}
