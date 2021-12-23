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

    @JsonIgnoreProperties(value = { "itemNomenclador", "insumos", "provisions", "solicitudPrestacions" }, allowSetters = true)
    @OneToOne(mappedBy = "itemNomenclador")
    private Prestacion prestacion;

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
        if (this.prestacion != null) {
            this.prestacion.setItemNomenclador(null);
        }
        if (prestacion != null) {
            prestacion.setItemNomenclador(this);
        }
        this.prestacion = prestacion;
    }

    public ItemNomenclador prestacion(Prestacion prestacion) {
        this.setPrestacion(prestacion);
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
