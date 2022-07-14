package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.ItemPropio;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ItemPropio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPropioRepository extends JpaRepository<ItemPropio, Long> {
    @Query(
        value = "SELECT 0, fi.Soc_numero, fi.Sumi_numer, fi.Fact_fecha, fi.Form_codig, fi.Fact_letra, fi.Fact_sucur, fi.Fact_numer, fi.Fac1Servic, fi.Fac2Item, fi.Fac2Orden, fi.Fac2Impvt1 from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUI] fi " +
        "where fi.SucCodigo = 1 and Fact_fecha = :fechaFact and Fac1Servic = 10 ",
        nativeQuery = true
    )
    List<ItemPropio> obtenerDeWin(String fechaFact);
}
