package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Chofer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Chofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoferRepository extends JpaRepository<Chofer, Long> {}
