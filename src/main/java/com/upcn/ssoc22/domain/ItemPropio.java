package com.upcn.ssoc22.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ItemPropio.
 */
@Entity
@Table(name = "item_propio")
//@Cache(usage = CacheConcurrencyStrategy.NONE)
public class ItemPropio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "socio")
    private Integer socio;

    @Column(name = "suministro")
    private Integer suministro;

    @Column(name = "fecha_factura")
    private ZonedDateTime fechaFactura;

    @Column(name = "tipo_comp")
    private String tipoComp;

    @Column(name = "letra_comp")
    private String letraComp;

    @Column(name = "pto_vta_comp")
    private Integer ptoVtaComp;

    @Column(name = "numero_comp")
    private String numeroComp;

    @Column(name = "servicio")
    private Integer servicio;

    @Column(name = "item")
    private Integer item;

    @Column(name = "orden")
    private Integer orden;

    @Column(name = "importe", precision = 21, scale = 2)
    private BigDecimal importe;

    @Column(name = "insertado_en_web")
    private String insertadoEnWeb;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ItemPropio id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSocio() {
        return this.socio;
    }

    public ItemPropio socio(Integer socio) {
        this.setSocio(socio);
        return this;
    }

    public void setSocio(Integer socio) {
        this.socio = socio;
    }

    public Integer getSuministro() {
        return this.suministro;
    }

    public ItemPropio suministro(Integer suministro) {
        this.setSuministro(suministro);
        return this;
    }

    public void setSuministro(Integer suministro) {
        this.suministro = suministro;
    }

    public ZonedDateTime getFechaFactura() {
        return this.fechaFactura;
    }

    public ItemPropio fechaFactura(ZonedDateTime fechaFactura) {
        this.setFechaFactura(fechaFactura);
        return this;
    }

    public void setFechaFactura(ZonedDateTime fechaFactura) {
        this.fechaFactura = fechaFactura;
    }

    public String getTipoComp() {
        return this.tipoComp;
    }

    public ItemPropio tipoComp(String tipoComp) {
        this.setTipoComp(tipoComp);
        return this;
    }

    public void setTipoComp(String tipoComp) {
        this.tipoComp = tipoComp;
    }

    public String getLetraComp() {
        return this.letraComp;
    }

    public ItemPropio letraComp(String letraComp) {
        this.setLetraComp(letraComp);
        return this;
    }

    public void setLetraComp(String letraComp) {
        this.letraComp = letraComp;
    }

    public Integer getPtoVtaComp() {
        return this.ptoVtaComp;
    }

    public ItemPropio ptoVtaComp(Integer ptoVtaComp) {
        this.setPtoVtaComp(ptoVtaComp);
        return this;
    }

    public void setPtoVtaComp(Integer ptoVtaComp) {
        this.ptoVtaComp = ptoVtaComp;
    }

    public String getNumeroComp() {
        return this.numeroComp;
    }

    public ItemPropio numeroComp(String numeroComp) {
        this.setNumeroComp(numeroComp);
        return this;
    }

    public void setNumeroComp(String numeroComp) {
        this.numeroComp = numeroComp;
    }

    public Integer getServicio() {
        return this.servicio;
    }

    public ItemPropio servicio(Integer servicio) {
        this.setServicio(servicio);
        return this;
    }

    public void setServicio(Integer servicio) {
        this.servicio = servicio;
    }

    public Integer getItem() {
        return this.item;
    }

    public ItemPropio item(Integer item) {
        this.setItem(item);
        return this;
    }

    public void setItem(Integer item) {
        this.item = item;
    }

    public Integer getOrden() {
        return this.orden;
    }

    public ItemPropio orden(Integer orden) {
        this.setOrden(orden);
        return this;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }

    public BigDecimal getImporte() {
        return this.importe;
    }

    public ItemPropio importe(BigDecimal importe) {
        this.setImporte(importe);
        return this;
    }

    public void setImporte(BigDecimal importe) {
        this.importe = importe;
    }

    public String getInsertadoEnWeb() {
        return this.insertadoEnWeb;
    }

    public ItemPropio insertadoEnWeb(String insertadoEnWeb) {
        this.setInsertadoEnWeb(insertadoEnWeb);
        return this;
    }

    public void setInsertadoEnWeb(String insertadoEnWeb) {
        this.insertadoEnWeb = insertadoEnWeb;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPropio)) {
            return false;
        }
        return id != null && id.equals(((ItemPropio) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemPropio{" +
            "id=" + getId() +
            ", socio=" + getSocio() +
            ", suministro=" + getSuministro() +
            ", fechaFactura='" + getFechaFactura() + "'" +
            ", tipoComp='" + getTipoComp() + "'" +
            ", letraComp='" + getLetraComp() + "'" +
            ", ptoVtaComp=" + getPtoVtaComp() +
            ", numeroComp='" + getNumeroComp() + "'" +
            ", servicio=" + getServicio() +
            ", item=" + getItem() +
            ", orden=" + getOrden() +
            ", importe=" + getImporte() +
            ", insertadoEnWeb='" + getInsertadoEnWeb() + "'" +
            "}";
    }
}
