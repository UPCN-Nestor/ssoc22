package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Cliente;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByNombreIgnoreCaseContaining(String nombre);

    Optional<Cliente> findBySocio(Integer socio);
}
