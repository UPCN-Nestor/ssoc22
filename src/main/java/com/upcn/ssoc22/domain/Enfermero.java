package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Enfermero.
 */
@Entity
@Table(name = "enfermero")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Enfermero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany(mappedBy = "enfermeros")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chofers", "medicos", "enfermeros", "movils", "solicitudPrestacion" }, allowSetters = true)
    private Set<Despacho> despachos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Enfermero id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Enfermero nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Despacho> getDespachos() {
        return this.despachos;
    }

    public void setDespachos(Set<Despacho> despachos) {
        if (this.despachos != null) {
            this.despachos.forEach(i -> i.removeEnfermero(this));
        }
        if (despachos != null) {
            despachos.forEach(i -> i.addEnfermero(this));
        }
        this.despachos = despachos;
    }

    public Enfermero despachos(Set<Despacho> despachos) {
        this.setDespachos(despachos);
        return this;
    }

    public Enfermero addDespacho(Despacho despacho) {
        this.despachos.add(despacho);
        despacho.getEnfermeros().add(this);
        return this;
    }

    public Enfermero removeDespacho(Despacho despacho) {
        this.despachos.remove(despacho);
        despacho.getEnfermeros().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enfermero)) {
            return false;
        }
        return id != null && id.equals(((Enfermero) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Enfermero{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
