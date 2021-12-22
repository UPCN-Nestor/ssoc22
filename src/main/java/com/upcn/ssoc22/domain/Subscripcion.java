package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Subscripcion.
 */
@Entity
@Table(name = "subscripcion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Subscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_alta")
    private LocalDate fechaAlta;

    @Column(name = "particularidades")
    private String particularidades;

    @ManyToOne
    @JsonIgnoreProperties(value = { "reglaPrestacions", "excepcionInsumos", "subscripcions" }, allowSetters = true)
    private Plan plan;

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "subscripcions", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Subscripcion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaAlta() {
        return this.fechaAlta;
    }

    public Subscripcion fechaAlta(LocalDate fechaAlta) {
        this.setFechaAlta(fechaAlta);
        return this;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getParticularidades() {
        return this.particularidades;
    }

    public Subscripcion particularidades(String particularidades) {
        this.setParticularidades(particularidades);
        return this;
    }

    public void setParticularidades(String particularidades) {
        this.particularidades = particularidades;
    }

    public Plan getPlan() {
        return this.plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Subscripcion plan(Plan plan) {
        this.setPlan(plan);
        return this;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Subscripcion cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subscripcion)) {
            return false;
        }
        return id != null && id.equals(((Subscripcion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subscripcion{" +
            "id=" + getId() +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", particularidades='" + getParticularidades() + "'" +
            "}";
    }
}
