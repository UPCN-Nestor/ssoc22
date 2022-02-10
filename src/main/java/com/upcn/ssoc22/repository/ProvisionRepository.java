package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Provision;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Provision entity.
 */
@Repository
public interface ProvisionRepository extends JpaRepository<Provision, Long> {
    @Query(
        value = "select distinct provision from Provision provision left join fetch provision.insumos",
        countQuery = "select count(distinct provision) from Provision provision"
    )
    Page<Provision> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct provision from Provision provision left join fetch provision.insumos")
    List<Provision> findAllWithEagerRelationships();

    @Query("select provision from Provision provision left join fetch provision.insumos where provision.id =:id")
    Optional<Provision> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select distinct provision from Provision provision left join fetch provision.reglaPrestacions where provision.plan.id = :planid"
    )
    List<Provision> findAllByPlanIdWithEagerRelationships(@Param("planid") Long planid);
}
