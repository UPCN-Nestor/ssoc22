package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Movil.
 */
@Entity
@Table(name = "movil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @OneToMany(mappedBy = "movil")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "prestador", "chofer", "medico", "enfermero", "movil", "solicitudPrestacion" }, allowSetters = true)
    private Set<Despacho> despachos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Movil id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return this.numero;
    }

    public Movil numero(Integer numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Set<Despacho> getDespachos() {
        return this.despachos;
    }

    public void setDespachos(Set<Despacho> despachos) {
        if (this.despachos != null) {
            this.despachos.forEach(i -> i.setMovil(null));
        }
        if (despachos != null) {
            despachos.forEach(i -> i.setMovil(this));
        }
        this.despachos = despachos;
    }

    public Movil despachos(Set<Despacho> despachos) {
        this.setDespachos(despachos);
        return this;
    }

    public Movil addDespacho(Despacho despacho) {
        this.despachos.add(despacho);
        despacho.setMovil(this);
        return this;
    }

    public Movil removeDespacho(Despacho despacho) {
        this.despachos.remove(despacho);
        despacho.setMovil(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movil)) {
            return false;
        }
        return id != null && id.equals(((Movil) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movil{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            "}";
    }
}
