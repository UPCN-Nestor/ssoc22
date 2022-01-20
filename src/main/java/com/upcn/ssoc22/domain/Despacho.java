package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Despacho.
 */
@Entity
@Table(name = "despacho")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Despacho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Equipo equipo;

    @JsonIgnoreProperties(value = { "despacho", "prestador", "prestacion", "insumos", "individuo" }, allowSetters = true)
    @OneToOne(mappedBy = "despacho")
    private SolicitudPrestacion solicitudPrestacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Despacho id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Equipo getEquipo() {
        return this.equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    public Despacho equipo(Equipo equipo) {
        this.setEquipo(equipo);
        return this;
    }

    public SolicitudPrestacion getSolicitudPrestacion() {
        return this.solicitudPrestacion;
    }

    public void setSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        if (this.solicitudPrestacion != null) {
            this.solicitudPrestacion.setDespacho(null);
        }
        if (solicitudPrestacion != null) {
            solicitudPrestacion.setDespacho(this);
        }
        this.solicitudPrestacion = solicitudPrestacion;
    }

    public Despacho solicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.setSolicitudPrestacion(solicitudPrestacion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Despacho)) {
            return false;
        }
        return id != null && id.equals(((Despacho) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Despacho{" +
            "id=" + getId() +
            "}";
    }
}
