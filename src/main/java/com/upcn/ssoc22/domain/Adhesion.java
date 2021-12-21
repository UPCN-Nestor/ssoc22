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

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "particularidades")
    private String particularidades;

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "facturas", "enPadron" }, allowSetters = true)
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adhesions" }, allowSetters = true)
    private Individuo individuo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adhesions", "prestacions" }, allowSetters = true)
    private Plan plan;

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

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Adhesion fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getParticularidades() {
        return this.particularidades;
    }

    public Adhesion particularidades(String particularidades) {
        this.setParticularidades(particularidades);
        return this;
    }

    public void setParticularidades(String particularidades) {
        this.particularidades = particularidades;
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

    public Plan getPlan() {
        return this.plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Adhesion plan(Plan plan) {
        this.setPlan(plan);
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
            ", fecha='" + getFecha() + "'" +
            ", particularidades='" + getParticularidades() + "'" +
            "}";
    }
}
