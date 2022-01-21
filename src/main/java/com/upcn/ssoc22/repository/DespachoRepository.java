package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Despacho;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Despacho entity.
 */
@Repository
public interface DespachoRepository extends JpaRepository<Despacho, Long> {
    @Query(
        value = "select distinct despacho from Despacho despacho left join fetch despacho.chofers left join fetch despacho.medicos left join fetch despacho.enfermeros left join fetch despacho.movils",
        countQuery = "select count(distinct despacho) from Despacho despacho"
    )
    Page<Despacho> findAllWithEagerRelationships(Pageable pageable);

    @Query(
        "select distinct despacho from Despacho despacho left join fetch despacho.chofers left join fetch despacho.medicos left join fetch despacho.enfermeros left join fetch despacho.movils"
    )
    List<Despacho> findAllWithEagerRelationships();

    @Query(
        "select despacho from Despacho despacho left join fetch despacho.chofers left join fetch despacho.medicos left join fetch despacho.enfermeros left join fetch despacho.movils where despacho.id =:id"
    )
    Optional<Despacho> findOneWithEagerRelationships(@Param("id") Long id);
}
