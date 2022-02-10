package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Adhesion;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Adhesion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdhesionRepository extends JpaRepository<Adhesion, Long> {
    @Query(
        value = "select adhesion from Adhesion adhesion where adhesion.cliente.id = :clienteid and (fecha_baja is null or fecha_baja > current_date())"
    )
    List<Adhesion> findAllVigentesByClienteId(@Param("clienteid") Long clienteid);

    @Query("select distinct adhesion from Adhesion adhesion left join fetch adhesion.cliente left join fetch adhesion.individuo")
    List<Adhesion> findAllWithEagerRelationships();
}
