package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Enfermero;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Enfermero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnfermeroRepository extends JpaRepository<Enfermero, Long> {}
