package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MovimientoStock.
 */
@Entity
@Table(name = "movimiento_stock")
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
public class MovimientoStock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Column(name = "cantidad")
    private Float cantidad;

    @ManyToOne
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "provisions" }, allowSetters = true)
    private Insumo insumo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MovimientoStock id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public MovimientoStock fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Float getCantidad() {
        return this.cantidad;
    }

    public MovimientoStock cantidad(Float cantidad) {
        this.setCantidad(cantidad);
        return this;
    }

    public void setCantidad(Float cantidad) {
        this.cantidad = cantidad;
    }

    public Insumo getInsumo() {
        return this.insumo;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
    }

    public MovimientoStock insumo(Insumo insumo) {
        this.setInsumo(insumo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MovimientoStock)) {
            return false;
        }
        return id != null && id.equals(((MovimientoStock) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovimientoStock{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
