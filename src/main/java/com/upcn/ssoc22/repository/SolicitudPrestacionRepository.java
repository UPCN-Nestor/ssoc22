package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.SolicitudPrestacion;
import java.sql.Date;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import org.hibernate.query.NativeQuery;
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
        "select solicitudPrestacion from SolicitudPrestacion solicitudPrestacion where solicitudPrestacion.usuarioSolicitud.login = ?#{principal.username}"
    )
    List<SolicitudPrestacion> findByUsuarioSolicitudIsCurrentUser();

    @Query(
        value = "select distinct solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos",
        countQuery = "select count(distinct solicitudPrestacion) from SolicitudPrestacion solicitudPrestacion"
    )
    Page<SolicitudPrestacion> findAllWithEagerRelationships(Pageable pageable);

    @Query(
        "select distinct solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos order by solicitudPrestacion.horaSolicitud desc"
    )
    List<SolicitudPrestacion> findAllWithEagerRelationships();

    @Query(
        "select solicitudPrestacion from SolicitudPrestacion solicitudPrestacion left join fetch solicitudPrestacion.insumos where solicitudPrestacion.id =:id"
    )
    Optional<SolicitudPrestacion> findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select COALESCE(MAX(numero),0)+1 from SolicitudPrestacion s where s.horaSolicitud > :hoy and s.horaSolicitud < :manana and s.tipo = :tipo"
    )
    Integer getNumeroPorFechayTipo(@Param("tipo") String tipo, @Param("hoy") ZonedDateTime hoy, @Param("manana") ZonedDateTime mañana);

    @Query(
        "select COUNT(id) as cantidad from SolicitudPrestacion s where s.horaSolicitud >= :desde and s.horaSolicitud < :hasta and s.itemNomenclador.id = :itemnomencladorid and s.adhesion.individuo.id = :individuoid"
    )
    Integer getCantidadPorIndividuoYPracticaEntreFechas(
        @Param("itemnomencladorid") Long itemnomencladorid,
        @Param("individuoid") Long individuoid,
        @Param("desde") ZonedDateTime desde,
        @Param("hasta") ZonedDateTime hasta
    );

    @Query(
        "select COUNT(id) as cantidad from SolicitudPrestacion s where s.horaSolicitud >= :desde and s.horaSolicitud < :hasta and s.itemNomenclador.prestacion.id = :prestacionid and s.adhesion.individuo.id = :individuoid"
    )
    Integer getCantidadPorIndividuoYPrestacionEntreFechas(
        @Param("prestacionid") Long prestacionid,
        @Param("individuoid") Long individuoid,
        @Param("desde") ZonedDateTime desde,
        @Param("hasta") ZonedDateTime hasta
    );

    @Query(
        "select COUNT(id) as cantidad from SolicitudPrestacion s where s.horaSolicitud >= :desde and s.horaSolicitud < :hasta and s.itemNomenclador.id = :itemnomencladorid and s.adhesion.cliente.id = :clienteid"
    )
    Integer getCantidadPorClienteYPracticaEntreFechas(
        @Param("itemnomencladorid") Long itemnomencladorid,
        @Param("clienteid") Long clienteid,
        @Param("desde") ZonedDateTime desde,
        @Param("hasta") ZonedDateTime hasta
    );

    @Query(
        "select COUNT(id) as cantidad from SolicitudPrestacion s where s.horaSolicitud >= :desde and s.horaSolicitud < :hasta and s.itemNomenclador.prestacion.id = :prestacionid and s.adhesion.cliente.id = :clienteid"
    )
    Integer getCantidadPorClienteYPrestacionEntreFechas(
        @Param("prestacionid") Long prestacionid,
        @Param("clienteid") Long clienteid,
        @Param("desde") ZonedDateTime desde,
        @Param("hasta") ZonedDateTime hasta
    );
}
