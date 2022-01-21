package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Prestador.
 */
@Entity
@Table(name = "prestador")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prestador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "rel_prestador__item_nomenclador",
        joinColumns = @JoinColumn(name = "prestador_id"),
        inverseJoinColumns = @JoinColumn(name = "item_nomenclador_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "prestacion", "provisions", "prestadors" }, allowSetters = true)
    private Set<ItemNomenclador> itemNomencladors = new HashSet<>();

    @JsonIgnoreProperties(value = { "despacho", "prestador", "prestacion", "insumos", "individuo" }, allowSetters = true)
    @OneToOne(mappedBy = "prestador")
    private SolicitudPrestacion solicitudPrestacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Prestador id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<ItemNomenclador> getItemNomencladors() {
        return this.itemNomencladors;
    }

    public void setItemNomencladors(Set<ItemNomenclador> itemNomencladors) {
        this.itemNomencladors = itemNomencladors;
    }

    public Prestador itemNomencladors(Set<ItemNomenclador> itemNomencladors) {
        this.setItemNomencladors(itemNomencladors);
        return this;
    }

    public Prestador addItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomencladors.add(itemNomenclador);
        itemNomenclador.getPrestadors().add(this);
        return this;
    }

    public Prestador removeItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomencladors.remove(itemNomenclador);
        itemNomenclador.getPrestadors().remove(this);
        return this;
    }

    public SolicitudPrestacion getSolicitudPrestacion() {
        return this.solicitudPrestacion;
    }

    public void setSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        if (this.solicitudPrestacion != null) {
            this.solicitudPrestacion.setPrestador(null);
        }
        if (solicitudPrestacion != null) {
            solicitudPrestacion.setPrestador(this);
        }
        this.solicitudPrestacion = solicitudPrestacion;
    }

    public Prestador solicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.setSolicitudPrestacion(solicitudPrestacion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prestador)) {
            return false;
        }
        return id != null && id.equals(((Prestador) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prestador{" +
            "id=" + getId() +
            "}";
    }
}
