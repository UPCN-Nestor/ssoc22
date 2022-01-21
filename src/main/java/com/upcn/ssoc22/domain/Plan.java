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
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "insumos", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

    @OneToMany(mappedBy = "plan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plan" }, allowSetters = true)
    private Set<Tarifa> tarifas = new HashSet<>();

    @OneToMany(mappedBy = "plan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plan", "cliente" }, allowSetters = true)
    private Set<Contrato> contratoes = new HashSet<>();

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

    public Set<Provision> getProvisions() {
        return this.provisions;
    }

    public void setProvisions(Set<Provision> provisions) {
        if (this.provisions != null) {
            this.provisions.forEach(i -> i.setPlan(null));
        }
        if (provisions != null) {
            provisions.forEach(i -> i.setPlan(this));
        }
        this.provisions = provisions;
    }

    public Plan provisions(Set<Provision> provisions) {
        this.setProvisions(provisions);
        return this;
    }

    public Plan addProvision(Provision provision) {
        this.provisions.add(provision);
        provision.setPlan(this);
        return this;
    }

    public Plan removeProvision(Provision provision) {
        this.provisions.remove(provision);
        provision.setPlan(null);
        return this;
    }

    public Set<Tarifa> getTarifas() {
        return this.tarifas;
    }

    public void setTarifas(Set<Tarifa> tarifas) {
        if (this.tarifas != null) {
            this.tarifas.forEach(i -> i.setPlan(null));
        }
        if (tarifas != null) {
            tarifas.forEach(i -> i.setPlan(this));
        }
        this.tarifas = tarifas;
    }

    public Plan tarifas(Set<Tarifa> tarifas) {
        this.setTarifas(tarifas);
        return this;
    }

    public Plan addTarifa(Tarifa tarifa) {
        this.tarifas.add(tarifa);
        tarifa.setPlan(this);
        return this;
    }

    public Plan removeTarifa(Tarifa tarifa) {
        this.tarifas.remove(tarifa);
        tarifa.setPlan(null);
        return this;
    }

    public Set<Contrato> getContratoes() {
        return this.contratoes;
    }

    public void setContratoes(Set<Contrato> contratoes) {
        if (this.contratoes != null) {
            this.contratoes.forEach(i -> i.setPlan(null));
        }
        if (contratoes != null) {
            contratoes.forEach(i -> i.setPlan(this));
        }
        this.contratoes = contratoes;
    }

    public Plan contratoes(Set<Contrato> contratoes) {
        this.setContratoes(contratoes);
        return this;
    }

    public Plan addContrato(Contrato contrato) {
        this.contratoes.add(contrato);
        contrato.setPlan(this);
        return this;
    }

    public Plan removeContrato(Contrato contrato) {
        this.contratoes.remove(contrato);
        contrato.setPlan(null);
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
