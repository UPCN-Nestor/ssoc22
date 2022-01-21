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

    @ManyToOne
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "insumos", "plan" }, allowSetters = true)
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
            "}";
    }
}
