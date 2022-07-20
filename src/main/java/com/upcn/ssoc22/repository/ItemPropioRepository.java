package com.upcn.ssoc22.repository;

import com.upcn.ssoc22.domain.ItemPropio;
import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import org.hibernate.query.NativeQuery;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ItemPropio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPropioRepository extends JpaRepository<ItemPropio, Long> {
    @Query(
        value = "SELECT cast(fi.Soc_numero as bigint)*1000000 + fi.Sumi_numer*1000 + ROW_NUMBER() OVER (order by fi.Fact_numer, fi.Fac2Item) id, fi.Soc_numero, fi.Sumi_numer, fi.Fact_fecha, fi.Form_codig, fi.Fact_letra, fi.Fact_sucur, fi.Fact_numer, fi.Fac1Servic, fi.Fac2Item, fi.Fac2Orden, fi.Fac2Impvt1, null from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUI] fi " +
        "where fi.SucCodigo = 1 and Fact_fecha = :fechaFact and Fac1Servic = 10 ",
        nativeQuery = true
    )
    List<ItemPropio> obtenerItemsDeWin(@Param("fechaFact") String fechaFact);

    /* 
    @Query(
        value = "select cast(fs.Form_codig as bigint)*1000000000000 + case when fs.Fact_letra = 'A' then 1 else 2 end * 100000000000 + cast(fs.Fact_sucur as bigint) * 100000000 + fs.Fact_numer id, fc.Soc_numero socio, fc.Sumi_numer suministro, fc.Fact_fecvt fecha_factura, fs.Form_codig tipo_comp, fs.Fact_letra letra_comp, fs.Fact_sucur pto_vta_comp, fs.Fact_numer numero_comp, fs.Fac1Servic servicio, null item, null orden, 0 importe, null insertado_en_web " +
        "from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUS] fs join [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUC] fc on (fs.SucCodigo = fc.SucCodigo and fs.Form_codig = fc.Form_codig and fs.Fact_letra = fc.Fact_letra and fs.Fact_sucur = fc.Fact_sucur and fs.Fact_numer = fc.Fact_numer) " +
        "where fs.SucCodigo = 1 and fs.Fact_fecha = :fechaFact and fs.Fac1Servic = 10 and fc.Fact_quin <> 9 and fc.FactArea like 'SS%' ", // *** FALTA ALGUNA MARCA PARA NO TRAER LAS DE ITEMS PROPIOS
        nativeQuery = true
    )
    List<ItemPropio> obtenerFacturasDeWin(@Param("fechaFact") String fechaFact);
*/
    @Query(
        value = "select fc.Soc_numero socio, fc.Sumi_numer suministro, fc.Fact_fecvt fechaVto, fs.Form_codig tipoComp, fs.Fact_letra letraComp, fs.Fact_sucur ptoVtaComp, fs.Fact_numer numeroComp " +
        "from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUS] fs join [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUC] fc on (fs.SucCodigo = fc.SucCodigo and fs.Form_codig = fc.Form_codig and fs.Fact_letra = fc.Fact_letra and fs.Fact_sucur = fc.Fact_sucur and fs.Fact_numer = fc.Fact_numer) " +
        "where fs.SucCodigo = 1 and fs.Fact_fecha = :fechaFact and fs.Fac1Servic = 10 and fc.Fact_quin <> 9 and fc.FactArea like 'SS%' ", // *** FALTA ALGUNA MARCA PARA NO TRAER LAS DE ITEMS PROPIOS
        nativeQuery = true
    )
    List<FacturaDeWinDTO> obtenerFacturasDeWinDTO(@Param("fechaFact") String fechaFact);

    @Query(
        value = "select fc.Soc_numero socio, fc.Sumi_numer suministro, fc.Fact_fecvt fechaVto, fs.Form_codig tipoComp, fs.Fact_letra letraComp, fs.Fact_sucur ptoVtaComp, fs.Fact_numer numeroComp " +
        "from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUS] fs join [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUC] fc on (fs.SucCodigo = fc.SucCodigo and fs.Form_codig = fc.Form_codig and fs.Fact_letra = fc.Fact_letra and fs.Fact_sucur = fc.Fact_sucur and fs.Fact_numer = fc.Fact_numer) " +
        "where fs.SucCodigo = 1 and fc.Form_codig = :tipoComp and fc.Fact_letra = :letraComp and fc.Fact_sucur = :ptoVtaComp and fc.Fact_numer = :numeroComp and fs.Fac1Servic = 10 and fc.Fact_quin <> 9 and fc.FactArea like 'SS%' ", // *** FALTA ALGUNA MARCA PARA NO TRAER LAS DE ITEMS PROPIOS
        nativeQuery = true
    )
    List<FacturaDeWinDTO> obtenerFacturasIndividualDeWinDTO(
        @Param("tipoComp") Integer tipoComp,
        @Param("letraComp") String letraComp,
        @Param("ptoVtaComp") Integer ptoVtaComp,
        @Param("numeroComp") Integer numeroComp
    );

    /*
    @Query(
        value = "select cast(fi.Soc_numero as bigint)*1000000 + fi.Sumi_numer*1000 + ROW_NUMBER() OVER (order by fi.Fac2Item) id, 0 socio, 0 suministro, null fecha_factura, 0 tipo_comp, '' letra_comp, 0 pto_vta_comp, 0 numero_comp, fi.Fac1Servic servicio, fi.Fac2Item item, null orden, fi.Fac2Impvt1 importe, null insertado_en_web " +
        "from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUI] fi " +
        "where fi.Form_codig = :tipo and fi.Fact_letra = :letra and fi.Fact_sucur = :pto_vta and fi.Fact_numer = :numero ",
        nativeQuery = true
    )
    List<ItemPropio> obtenerDetalleFacturaDeWin(
        @Param("tipo") String tipo,
        @Param("letra") String letra,
        @Param("pto_vta") String pto_vta,
        @Param("numero") String numero
    );*/

    @Query(
        value = "select fi.Fac1Servic servicio, fi.Fac2Item item, fi.Fac2Impvt1 importe " +
        "from [192.168.0.8].[UPCCOMPROD].[dbo].[FACTUI] fi " +
        "where fi.Form_codig = :tipo and fi.Fact_letra = :letra and fi.Fact_sucur = :pto_vta and fi.Fact_numer = :numero ",
        nativeQuery = true
    )
    List<ItemFacturaDeWinDTO> obtenerDetalleFacturaDeWinDTO(
        @Param("tipo") String tipo,
        @Param("letra") String letra,
        @Param("pto_vta") String pto_vta,
        @Param("numero") String numero
    );

    @Query(
        value = "select count(*) from item_propio " +
        "where tipo_comp = :tipo and letra_comp = :letra and pto_vta_comp = :pto_vta and numero_comp = :numero",
        nativeQuery = true
    )
    Integer yaExiste(
        @Param("tipo") String tipo,
        @Param("letra") String letra,
        @Param("pto_vta") String pto_vta,
        @Param("numero") String numero
    );

    public interface FacturaDeWinDTO {
        Integer getSocio();
        Integer getSuministro();
        Timestamp getFechaVto();
        Integer getTipoComp();
        String getLetraComp();
        Integer getPtoVtaComp();
        Integer getNumeroComp();
    }

    public interface ItemFacturaDeWinDTO {
        Integer getServicio();
        Integer getItem();
        Double getImporte();
    }
}
