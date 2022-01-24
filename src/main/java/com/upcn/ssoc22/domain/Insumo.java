package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Insumo.
 */
@Entity
@Table(name = "insumo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Insumo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "precio_venta")
    private Float precioVenta;

    @Column(name = "es_modificable")
    private Boolean esModificable;

    @OneToMany(mappedBy = "insumo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "insumo" }, allowSetters = true)
    private Set<MovimientoStock> movimientoStocks = new HashSet<>();

    @ManyToMany(mappedBy = "insumos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "itemNomencladors", "insumos" }, allowSetters = true)
    private Set<Prestacion> prestacions = new HashSet<>();

    @ManyToMany(mappedBy = "insumos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despacho", "itemNomenclador", "insumos", "individuo" }, allowSetters = true)
    private Set<SolicitudPrestacion> solicitudPrestacions = new HashSet<>();

    @ManyToMany(mappedBy = "insumos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "insumos", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Insumo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Insumo tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Float getPrecioVenta() {
        return this.precioVenta;
    }

    public Insumo precioVenta(Float precioVenta) {
        this.setPrecioVenta(precioVenta);
        return this;
    }

    public void setPrecioVenta(Float precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Boolean getEsModificable() {
        return this.esModificable;
    }

    public Insumo esModificable(Boolean esModificable) {
        this.setEsModificable(esModificable);
        return this;
    }

    public void setEsModificable(Boolean esModificable) {
        this.esModificable = esModificable;
    }

    public Set<MovimientoStock> getMovimientoStocks() {
        return this.movimientoStocks;
    }

    public void setMovimientoStocks(Set<MovimientoStock> movimientoStocks) {
        if (this.movimientoStocks != null) {
            this.movimientoStocks.forEach(i -> i.setInsumo(null));
        }
        if (movimientoStocks != null) {
            movimientoStocks.forEach(i -> i.setInsumo(this));
        }
        this.movimientoStocks = movimientoStocks;
    }

    public Insumo movimientoStocks(Set<MovimientoStock> movimientoStocks) {
        this.setMovimientoStocks(movimientoStocks);
        return this;
    }

    public Insumo addMovimientoStock(MovimientoStock movimientoStock) {
        this.movimientoStocks.add(movimientoStock);
        movimientoStock.setInsumo(this);
        return this;
    }

    public Insumo removeMovimientoStock(MovimientoStock movimientoStock) {
        this.movimientoStocks.remove(movimientoStock);
        movimientoStock.setInsumo(null);
        return this;
    }

    public Set<Prestacion> getPrestacions() {
        return this.prestacions;
    }

    public void setPrestacions(Set<Prestacion> prestacions) {
        if (this.prestacions != null) {
            this.prestacions.forEach(i -> i.removeInsumo(this));
        }
        if (prestacions != null) {
            prestacions.forEach(i -> i.addInsumo(this));
        }
        this.prestacions = prestacions;
    }

    public Insumo prestacions(Set<Prestacion> prestacions) {
        this.setPrestacions(prestacions);
        return this;
    }

    public Insumo addPrestacion(Prestacion prestacion) {
        this.prestacions.add(prestacion);
        prestacion.getInsumos().add(this);
        return this;
    }

    public Insumo removePrestacion(Prestacion prestacion) {
        this.prestacions.remove(prestacion);
        prestacion.getInsumos().remove(this);
        return this;
    }

    public Set<SolicitudPrestacion> getSolicitudPrestacions() {
        return this.solicitudPrestacions;
    }

    public void setSolicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        if (this.solicitudPrestacions != null) {
            this.solicitudPrestacions.forEach(i -> i.removeInsumo(this));
        }
        if (solicitudPrestacions != null) {
            solicitudPrestacions.forEach(i -> i.addInsumo(this));
        }
        this.solicitudPrestacions = solicitudPrestacions;
    }

    public Insumo solicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        this.setSolicitudPrestacions(solicitudPrestacions);
        return this;
    }

    public Insumo addSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.add(solicitudPrestacion);
        solicitudPrestacion.getInsumos().add(this);
        return this;
    }

    public Insumo removeSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.remove(solicitudPrestacion);
        solicitudPrestacion.getInsumos().remove(this);
        return this;
    }

    public Set<Provision> getProvisions() {
        return this.provisions;
    }

    public void setProvisions(Set<Provision> provisions) {
        if (this.provisions != null) {
            this.provisions.forEach(i -> i.removeInsumo(this));
        }
        if (provisions != null) {
            provisions.forEach(i -> i.addInsumo(this));
        }
        this.provisions = provisions;
    }

    public Insumo provisions(Set<Provision> provisions) {
        this.setProvisions(provisions);
        return this;
    }

    public Insumo addProvision(Provision provision) {
        this.provisions.add(provision);
        provision.getInsumos().add(this);
        return this;
    }

    public Insumo removeProvision(Provision provision) {
        this.provisions.remove(provision);
        provision.getInsumos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Insumo)) {
            return false;
        }
        return id != null && id.equals(((Insumo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Insumo{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", precioVenta=" + getPrecioVenta() +
            ", esModificable='" + getEsModificable() + "'" +
            "}";
    }
}
