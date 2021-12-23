package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Adhesion.
 */
@Entity
@Table(name = "adhesion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Adhesion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_alta")
    private LocalDate fechaAlta;

    @Column(name = "estado")
    private String estado;

    @Column(name = "condicion")
    private String condicion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adhesions" }, allowSetters = true)
    private Individuo individuo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "contratoes", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Adhesion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaAlta() {
        return this.fechaAlta;
    }

    public Adhesion fechaAlta(LocalDate fechaAlta) {
        this.setFechaAlta(fechaAlta);
        return this;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getEstado() {
        return this.estado;
    }

    public Adhesion estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCondicion() {
        return this.condicion;
    }

    public Adhesion condicion(String condicion) {
        this.setCondicion(condicion);
        return this;
    }

    public void setCondicion(String condicion) {
        this.condicion = condicion;
    }

    public Individuo getIndividuo() {
        return this.individuo;
    }

    public void setIndividuo(Individuo individuo) {
        this.individuo = individuo;
    }

    public Adhesion individuo(Individuo individuo) {
        this.setIndividuo(individuo);
        return this;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Adhesion cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adhesion)) {
            return false;
        }
        return id != null && id.equals(((Adhesion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Adhesion{" +
            "id=" + getId() +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", condicion='" + getCondicion() + "'" +
            "}";
    }
}
