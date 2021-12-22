package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Plan;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Plan entity.
 */
@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query(
        value = "select distinct jhiPlan from Plan jhiPlan left join fetch jhiPlan.excepcionInsumos",
        countQuery = "select count(distinct jhiPlan) from Plan jhiPlan"
    )
    Page<Plan> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct jhiPlan from Plan jhiPlan left join fetch jhiPlan.excepcionInsumos")
    List<Plan> findAllWithEagerRelationships();

    @Query("select jhiPlan from Plan jhiPlan left join fetch jhiPlan.excepcionInsumos where jhiPlan.id =:id")
    Optional<Plan> findOneWithEagerRelationships(@Param("id") Long id);
}
