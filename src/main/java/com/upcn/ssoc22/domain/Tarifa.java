package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tarifa.
 */
@Entity
@Table(name = "tarifa")
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
public class Tarifa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "datos")
    private String datos;

    @Column(name = "vigencia_hasta")
    private ZonedDateTime vigenciaHasta;

    @ManyToOne
    @JsonIgnoreProperties(value = { "provisions", "tarifas", "contratoes" }, allowSetters = true)
    private Plan plan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tarifa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Tarifa tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDatos() {
        return this.datos;
    }

    public Tarifa datos(String datos) {
        this.setDatos(datos);
        return this;
    }

    public void setDatos(String datos) {
        this.datos = datos;
    }

    public ZonedDateTime getVigenciaHasta() {
        return this.vigenciaHasta;
    }

    public Tarifa vigenciaHasta(ZonedDateTime vigenciaHasta) {
        this.setVigenciaHasta(vigenciaHasta);
        return this;
    }

    public void setVigenciaHasta(ZonedDateTime vigenciaHasta) {
        this.vigenciaHasta = vigenciaHasta;
    }

    public Plan getPlan() {
        return this.plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Tarifa plan(Plan plan) {
        this.setPlan(plan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tarifa)) {
            return false;
        }
        return id != null && id.equals(((Tarifa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tarifa{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", datos='" + getDatos() + "'" +
            ", vigenciaHasta='" + getVigenciaHasta() + "'" +
            "}";
    }
}
