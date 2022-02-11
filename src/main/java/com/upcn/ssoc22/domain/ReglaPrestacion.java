package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ReglaPrestacion.
 */
@Entity
@Table(name = "regla_prestacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReglaPrestacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "codigo_regla")
    private String codigoRegla;

    @Column(name = "tipo_regla")
    private String tipoRegla;

    @Column(name = "datos")
    private String datos;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "prestacion", "insumos", "plan" }, allowSetters = true)
    private Provision provision;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ReglaPrestacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoRegla() {
        return this.codigoRegla;
    }

    public ReglaPrestacion codigoRegla(String codigoRegla) {
        this.setCodigoRegla(codigoRegla);
        return this;
    }

    public void setCodigoRegla(String codigoRegla) {
        this.codigoRegla = codigoRegla;
    }

    public String getTipoRegla() {
        return this.tipoRegla;
    }

    public ReglaPrestacion tipoRegla(String tipoRegla) {
        this.setTipoRegla(tipoRegla);
        return this;
    }

    public void setTipoRegla(String tipoRegla) {
        this.tipoRegla = tipoRegla;
    }

    public String getDatos() {
        return this.datos;
    }

    public ReglaPrestacion datos(String datos) {
        this.setDatos(datos);
        return this;
    }

    public void setDatos(String datos) {
        this.datos = datos;
    }

    public String getNombre() {
        return this.nombre;
    }

    public ReglaPrestacion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Provision getProvision() {
        return this.provision;
    }

    public void setProvision(Provision provision) {
        this.provision = provision;
    }

    public ReglaPrestacion provision(Provision provision) {
        this.setProvision(provision);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReglaPrestacion)) {
            return false;
        }
        return id != null && id.equals(((ReglaPrestacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReglaPrestacion{" +
            "id=" + getId() +
            ", codigoRegla='" + getCodigoRegla() + "'" +
            ", tipoRegla='" + getTipoRegla() + "'" +
            ", datos='" + getDatos() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
