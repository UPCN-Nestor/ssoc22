package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Provision;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Provision entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvisionRepository extends JpaRepository<Provision, Long> {}
