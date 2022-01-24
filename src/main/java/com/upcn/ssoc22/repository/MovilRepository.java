package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Movil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Movil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovilRepository extends JpaRepository<Movil, Long> {}
