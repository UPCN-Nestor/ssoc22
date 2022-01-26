package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Despacho;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Despacho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DespachoRepository extends JpaRepository<Despacho, Long> {
    @Query("select despacho from Despacho despacho where despacho.usuarioSalida.login = ?#{principal.username}")
    List<Despacho> findByUsuarioSalidaIsCurrentUser();

    @Query("select despacho from Despacho despacho where despacho.usuarioLlegada.login = ?#{principal.username}")
    List<Despacho> findByUsuarioLlegadaIsCurrentUser();

    @Query("select despacho from Despacho despacho where despacho.usuarioLibre.login = ?#{principal.username}")
    List<Despacho> findByUsuarioLibreIsCurrentUser();
}
