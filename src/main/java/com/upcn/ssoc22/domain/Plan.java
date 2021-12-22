package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Plan.
 */
@Entity
@Table(name = "jhi_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tarifa")
    private String tarifa;

    @Column(name = "habilitaciones")
    private String habilitaciones;

    @Column(name = "descuentos")
    private String descuentos;

    @Column(name = "restricciones")
    private String restricciones;

    @OneToMany(mappedBy = "plan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "prestacion", "plan" }, allowSetters = true)
    private Set<ReglaPrestacion> reglaPrestacions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_jhi_plan__excepcion_insumo",
        joinColumns = @JoinColumn(name = "jhi_plan_id"),
        inverseJoinColumns = @JoinColumn(name = "excepcion_insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "plans" }, allowSetters = true)
    private Set<Insumo> excepcionInsumos = new HashSet<>();

    @OneToMany(mappedBy = "plan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plan", "cliente" }, allowSetters = true)
    private Set<Subscripcion> subscripcions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Plan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTarifa() {
        return this.tarifa;
    }

    public Plan tarifa(String tarifa) {
        this.setTarifa(tarifa);
        return this;
    }

    public void setTarifa(String tarifa) {
        this.tarifa = tarifa;
    }

    public String getHabilitaciones() {
        return this.habilitaciones;
    }

    public Plan habilitaciones(String habilitaciones) {
        this.setHabilitaciones(habilitaciones);
        return this;
    }

    public void setHabilitaciones(String habilitaciones) {
        this.habilitaciones = habilitaciones;
    }

    public String getDescuentos() {
        return this.descuentos;
    }

    public Plan descuentos(String descuentos) {
        this.setDescuentos(descuentos);
        return this;
    }

    public void setDescuentos(String descuentos) {
        this.descuentos = descuentos;
    }

    public String getRestricciones() {
        return this.restricciones;
    }

    public Plan restricciones(String restricciones) {
        this.setRestricciones(restricciones);
        return this;
    }

    public void setRestricciones(String restricciones) {
        this.restricciones = restricciones;
    }

    public Set<ReglaPrestacion> getReglaPrestacions() {
        return this.reglaPrestacions;
    }

    public void setReglaPrestacions(Set<ReglaPrestacion> reglaPrestacions) {
        if (this.reglaPrestacions != null) {
            this.reglaPrestacions.forEach(i -> i.setPlan(null));
        }
        if (reglaPrestacions != null) {
            reglaPrestacions.forEach(i -> i.setPlan(this));
        }
        this.reglaPrestacions = reglaPrestacions;
    }

    public Plan reglaPrestacions(Set<ReglaPrestacion> reglaPrestacions) {
        this.setReglaPrestacions(reglaPrestacions);
        return this;
    }

    public Plan addReglaPrestacion(ReglaPrestacion reglaPrestacion) {
        this.reglaPrestacions.add(reglaPrestacion);
        reglaPrestacion.setPlan(this);
        return this;
    }

    public Plan removeReglaPrestacion(ReglaPrestacion reglaPrestacion) {
        this.reglaPrestacions.remove(reglaPrestacion);
        reglaPrestacion.setPlan(null);
        return this;
    }

    public Set<Insumo> getExcepcionInsumos() {
        return this.excepcionInsumos;
    }

    public void setExcepcionInsumos(Set<Insumo> insumos) {
        this.excepcionInsumos = insumos;
    }

    public Plan excepcionInsumos(Set<Insumo> insumos) {
        this.setExcepcionInsumos(insumos);
        return this;
    }

    public Plan addExcepcionInsumo(Insumo insumo) {
        this.excepcionInsumos.add(insumo);
        insumo.getPlans().add(this);
        return this;
    }

    public Plan removeExcepcionInsumo(Insumo insumo) {
        this.excepcionInsumos.remove(insumo);
        insumo.getPlans().remove(this);
        return this;
    }

    public Set<Subscripcion> getSubscripcions() {
        return this.subscripcions;
    }

    public void setSubscripcions(Set<Subscripcion> subscripcions) {
        if (this.subscripcions != null) {
            this.subscripcions.forEach(i -> i.setPlan(null));
        }
        if (subscripcions != null) {
            subscripcions.forEach(i -> i.setPlan(this));
        }
        this.subscripcions = subscripcions;
    }

    public Plan subscripcions(Set<Subscripcion> subscripcions) {
        this.setSubscripcions(subscripcions);
        return this;
    }

    public Plan addSubscripcion(Subscripcion subscripcion) {
        this.subscripcions.add(subscripcion);
        subscripcion.setPlan(this);
        return this;
    }

    public Plan removeSubscripcion(Subscripcion subscripcion) {
        this.subscripcions.remove(subscripcion);
        subscripcion.setPlan(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plan)) {
            return false;
        }
        return id != null && id.equals(((Plan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", tarifa='" + getTarifa() + "'" +
            ", habilitaciones='" + getHabilitaciones() + "'" +
            ", descuentos='" + getDescuentos() + "'" +
            ", restricciones='" + getRestricciones() + "'" +
            "}";
    }
}
