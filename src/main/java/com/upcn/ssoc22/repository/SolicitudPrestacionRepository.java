package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.SolicitudPrestacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SolicitudPrestacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitudPrestacionRepository extends JpaRepository<SolicitudPrestacion, Long> {}
