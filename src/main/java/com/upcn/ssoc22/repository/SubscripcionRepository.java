package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Subscripcion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Subscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscripcionRepository extends JpaRepository<Subscripcion, Long> {}
