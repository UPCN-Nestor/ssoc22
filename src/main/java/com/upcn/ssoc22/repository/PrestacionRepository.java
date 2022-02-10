package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Prestacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Prestacion entity.
 */
@Repository
public interface PrestacionRepository extends JpaRepository<Prestacion, Long> {
    @Query(
        value = "select distinct prestacion from Prestacion prestacion left join fetch prestacion.insumos",
        countQuery = "select count(distinct prestacion) from Prestacion prestacion"
    )
    Page<Prestacion> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct prestacion from Prestacion prestacion left join fetch prestacion.insumos")
    List<Prestacion> findAllWithEagerRelationships();

    @Query("select prestacion from Prestacion prestacion left join fetch prestacion.insumos where prestacion.id =:id")
    Optional<Prestacion> findOneWithEagerRelationships(@Param("id") Long id);

    List<Prestacion> findAllByTipo(String tipo);
}
