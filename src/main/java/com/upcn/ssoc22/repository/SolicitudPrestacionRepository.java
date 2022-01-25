package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.SolicitudPrestacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SolicitudPrestacion entity.
 */
@Repository
public interface SolicitudPrestacionRepository extends JpaRepository<SolicitudPrestacion, Long> {
    @Query(
        value = "select distinct solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos",
        countQuery = "select count(distinct solicitudPrestacion) from SolicitudPrestacion solicitudPrestacion"
    )
    Page<SolicitudPrestacion> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos")
    List<SolicitudPrestacion> findAllWithEagerRelationships();

    @Query(
        "select solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos where solicitudPrestacion.id =:id"
    )
    Optional<SolicitudPrestacion> findOneWithEagerRelationships(@Param("id") Long id);
}
