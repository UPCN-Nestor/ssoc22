package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Contrato;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Contrato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    @Query(
        value = "select contrato from Contrato contrato where contrato.cliente.id = :clienteid and (fecha_baja is null or fecha_baja > current_date())"
    )
    List<Contrato> findAllVigentesByClienteId(@Param("clienteid") Long clienteid);
}
