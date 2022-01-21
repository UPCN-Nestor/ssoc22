package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ItemNomenclador.
 */
@Entity
@Table(name = "item_nomenclador")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ItemNomenclador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "itemNomencladors", "insumos", "solicitudPrestacions" }, allowSetters = true)
    private Prestacion prestacion;

    @OneToMany(mappedBy = "itemNomenclador")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "insumos", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

    @ManyToMany(mappedBy = "itemNomencladors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "itemNomencladors", "solicitudPrestacion" }, allowSetters = true)
    private Set<Prestador> prestadors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ItemNomenclador id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Prestacion getPrestacion() {
        return this.prestacion;
    }

    public void setPrestacion(Prestacion prestacion) {
        this.prestacion = prestacion;
    }

    public ItemNomenclador prestacion(Prestacion prestacion) {
        this.setPrestacion(prestacion);
        return this;
    }

    public Set<Provision> getProvisions() {
        return this.provisions;
    }

    public void setProvisions(Set<Provision> provisions) {
        if (this.provisions != null) {
            this.provisions.forEach(i -> i.setItemNomenclador(null));
        }
        if (provisions != null) {
            provisions.forEach(i -> i.setItemNomenclador(this));
        }
        this.provisions = provisions;
    }

    public ItemNomenclador provisions(Set<Provision> provisions) {
        this.setProvisions(provisions);
        return this;
    }

    public ItemNomenclador addProvision(Provision provision) {
        this.provisions.add(provision);
        provision.setItemNomenclador(this);
        return this;
    }

    public ItemNomenclador removeProvision(Provision provision) {
        this.provisions.remove(provision);
        provision.setItemNomenclador(null);
        return this;
    }

    public Set<Prestador> getPrestadors() {
        return this.prestadors;
    }

    public void setPrestadors(Set<Prestador> prestadors) {
        if (this.prestadors != null) {
            this.prestadors.forEach(i -> i.removeItemNomenclador(this));
        }
        if (prestadors != null) {
            prestadors.forEach(i -> i.addItemNomenclador(this));
        }
        this.prestadors = prestadors;
    }

    public ItemNomenclador prestadors(Set<Prestador> prestadors) {
        this.setPrestadors(prestadors);
        return this;
    }

    public ItemNomenclador addPrestador(Prestador prestador) {
        this.prestadors.add(prestador);
        prestador.getItemNomencladors().add(this);
        return this;
    }

    public ItemNomenclador removePrestador(Prestador prestador) {
        this.prestadors.remove(prestador);
        prestador.getItemNomencladors().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemNomenclador)) {
            return false;
        }
        return id != null && id.equals(((ItemNomenclador) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemNomenclador{" +
            "id=" + getId() +
            "}";
    }
}
