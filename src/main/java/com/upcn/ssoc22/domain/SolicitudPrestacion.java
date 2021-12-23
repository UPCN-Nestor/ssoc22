package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SolicitudPrestacion.
 */
@Entity
@Table(name = "solicitud_prestacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SolicitudPrestacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @JsonIgnoreProperties(value = { "equipo", "solicitudPrestacion" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Despacho despacho;

    @JsonIgnoreProperties(value = { "itemNomencladors", "solicitudPrestacion" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Prestador prestador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "itemNomenclador", "insumos", "provisions", "solicitudPrestacions" }, allowSetters = true)
    private Prestacion prestacion;

    @ManyToMany
    @JoinTable(
        name = "rel_solicitud_prestacion__insumo",
        joinColumns = @JoinColumn(name = "solicitud_prestacion_id"),
        inverseJoinColumns = @JoinColumn(name = "insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "plans" }, allowSetters = true)
    private Set<Insumo> insumos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SolicitudPrestacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Despacho getDespacho() {
        return this.despacho;
    }

    public void setDespacho(Despacho despacho) {
        this.despacho = despacho;
    }

    public SolicitudPrestacion despacho(Despacho despacho) {
        this.setDespacho(despacho);
        return this;
    }

    public Prestador getPrestador() {
        return this.prestador;
    }

    public void setPrestador(Prestador prestador) {
        this.prestador = prestador;
    }

    public SolicitudPrestacion prestador(Prestador prestador) {
        this.setPrestador(prestador);
        return this;
    }

    public Prestacion getPrestacion() {
        return this.prestacion;
    }

    public void setPrestacion(Prestacion prestacion) {
        this.prestacion = prestacion;
    }

    public SolicitudPrestacion prestacion(Prestacion prestacion) {
        this.setPrestacion(prestacion);
        return this;
    }

    public Set<Insumo> getInsumos() {
        return this.insumos;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
    }

    public SolicitudPrestacion insumos(Set<Insumo> insumos) {
        this.setInsumos(insumos);
        return this;
    }

    public SolicitudPrestacion addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        insumo.getSolicitudPrestacions().add(this);
        return this;
    }

    public SolicitudPrestacion removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        insumo.getSolicitudPrestacions().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SolicitudPrestacion)) {
            return false;
        }
        return id != null && id.equals(((SolicitudPrestacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SolicitudPrestacion{" +
            "id=" + getId() +
            "}";
    }
}
