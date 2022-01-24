package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.Prestador;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Prestador entity.
 */
@Repository
public interface PrestadorRepository extends JpaRepository<Prestador, Long> {
    @Query(
        value = "select distinct prestador from Prestador prestador left join fetch prestador.itemNomencladors",
        countQuery = "select count(distinct prestador) from Prestador prestador"
    )
    Page<Prestador> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct prestador from Prestador prestador left join fetch prestador.itemNomencladors")
    List<Prestador> findAllWithEagerRelationships();

    @Query("select prestador from Prestador prestador left join fetch prestador.itemNomencladors where prestador.id =:id")
    Optional<Prestador> findOneWithEagerRelationships(@Param("id") Long id);
}
