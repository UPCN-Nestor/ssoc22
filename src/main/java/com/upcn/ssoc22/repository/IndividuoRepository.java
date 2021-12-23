package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Individuo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Individuo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IndividuoRepository extends JpaRepository<Individuo, Long> {}
