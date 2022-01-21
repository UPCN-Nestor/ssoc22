package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Despacho;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Despacho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DespachoRepository extends JpaRepository<Despacho, Long> {}
