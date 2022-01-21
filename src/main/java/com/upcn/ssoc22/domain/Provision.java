package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Provision.
 */
@Entity
@Table(name = "provision")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Provision implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "provision")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "provision" }, allowSetters = true)
    private Set<ReglaPrestacion> reglaPrestacions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "prestacion", "provisions", "prestadors" }, allowSetters = true)
    private ItemNomenclador itemNomenclador;

    @ManyToMany
    @JoinTable(
        name = "rel_provision__insumo",
        joinColumns = @JoinColumn(name = "provision_id"),
        inverseJoinColumns = @JoinColumn(name = "insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "provisions" }, allowSetters = true)
    private Set<Insumo> insumos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "provisions", "tarifas", "contratoes" }, allowSetters = true)
    private Plan plan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Provision id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<ReglaPrestacion> getReglaPrestacions() {
        return this.reglaPrestacions;
    }

    public void setReglaPrestacions(Set<ReglaPrestacion> reglaPrestacions) {
        if (this.reglaPrestacions != null) {
            this.reglaPrestacions.forEach(i -> i.setProvision(null));
        }
        if (reglaPrestacions != null) {
            reglaPrestacions.forEach(i -> i.setProvision(this));
        }
        this.reglaPrestacions = reglaPrestacions;
    }

    public Provision reglaPrestacions(Set<ReglaPrestacion> reglaPrestacions) {
        this.setReglaPrestacions(reglaPrestacions);
        return this;
    }

    public Provision addReglaPrestacion(ReglaPrestacion reglaPrestacion) {
        this.reglaPrestacions.add(reglaPrestacion);
        reglaPrestacion.setProvision(this);
        return this;
    }

    public Provision removeReglaPrestacion(ReglaPrestacion reglaPrestacion) {
        this.reglaPrestacions.remove(reglaPrestacion);
        reglaPrestacion.setProvision(null);
        return this;
    }

    public ItemNomenclador getItemNomenclador() {
        return this.itemNomenclador;
    }

    public void setItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomenclador = itemNomenclador;
    }

    public Provision itemNomenclador(ItemNomenclador itemNomenclador) {
        this.setItemNomenclador(itemNomenclador);
        return this;
    }

    public Set<Insumo> getInsumos() {
        return this.insumos;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
    }

    public Provision insumos(Set<Insumo> insumos) {
        this.setInsumos(insumos);
        return this;
    }

    public Provision addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        insumo.getProvisions().add(this);
        return this;
    }

    public Provision removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        insumo.getProvisions().remove(this);
        return this;
    }

    public Plan getPlan() {
        return this.plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Provision plan(Plan plan) {
        this.setPlan(plan);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Provision)) {
            return false;
        }
        return id != null && id.equals(((Provision) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Provision{" +
            "id=" + getId() +
            "}";
    }
}
