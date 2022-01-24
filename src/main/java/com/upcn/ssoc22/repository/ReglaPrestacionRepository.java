package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.ReglaPrestacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ReglaPrestacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReglaPrestacionRepository extends JpaRepository<ReglaPrestacion, Long> {}
