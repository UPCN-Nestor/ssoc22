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
    @JsonIgnoreProperties(value = { "cliente", "individuo", "plan" }, allowSetters = true)
    private Set<Adhesion> adhesions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_jhi_plan__prestacion",
        joinColumns = @JoinColumn(name = "jhi_plan_id"),
        inverseJoinColumns = @JoinColumn(name = "prestacion_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "insumos", "plans" }, allowSetters = true)
    private Set<Prestacion> prestacions = new HashSet<>();

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

    public Set<Adhesion> getAdhesions() {
        return this.adhesions;
    }

    public void setAdhesions(Set<Adhesion> adhesions) {
        if (this.adhesions != null) {
            this.adhesions.forEach(i -> i.setPlan(null));
        }
        if (adhesions != null) {
            adhesions.forEach(i -> i.setPlan(this));
        }
        this.adhesions = adhesions;
    }

    public Plan adhesions(Set<Adhesion> adhesions) {
        this.setAdhesions(adhesions);
        return this;
    }

    public Plan addAdhesion(Adhesion adhesion) {
        this.adhesions.add(adhesion);
        adhesion.setPlan(this);
        return this;
    }

    public Plan removeAdhesion(Adhesion adhesion) {
        this.adhesions.remove(adhesion);
        adhesion.setPlan(null);
        return this;
    }

    public Set<Prestacion> getPrestacions() {
        return this.prestacions;
    }

    public void setPrestacions(Set<Prestacion> prestacions) {
        this.prestacions = prestacions;
    }

    public Plan prestacions(Set<Prestacion> prestacions) {
        this.setPrestacions(prestacions);
        return this;
    }

    public Plan addPrestacion(Prestacion prestacion) {
        this.prestacions.add(prestacion);
        prestacion.getPlans().add(this);
        return this;
    }

    public Plan removePrestacion(Prestacion prestacion) {
        this.prestacions.remove(prestacion);
        prestacion.getPlans().remove(this);
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
