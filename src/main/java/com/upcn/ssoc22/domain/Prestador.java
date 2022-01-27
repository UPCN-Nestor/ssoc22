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

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "condicion")
    private String condicion;

    @ManyToMany
    @JoinTable(
        name = "rel_prestador__item_nomenclador",
        joinColumns = @JoinColumn(name = "prestador_id"),
        inverseJoinColumns = @JoinColumn(name = "item_nomenclador_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "prestacion", "solicitudPrestacions", "provisions", "prestadors" }, allowSetters = true)
    private Set<ItemNomenclador> itemNomencladors = new HashSet<>();

    @OneToMany(mappedBy = "prestador")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "despacho", "itemNomenclador", "prestador", "usuarioSolicitud", "insumos", "individuo", "cliente" },
        allowSetters = true
    )
    private Set<SolicitudPrestacion> solicitudPrestacions = new HashSet<>();

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

    public String getNombre() {
        return this.nombre;
    }

    public Prestador nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCondicion() {
        return this.condicion;
    }

    public Prestador condicion(String condicion) {
        this.setCondicion(condicion);
        return this;
    }

    public void setCondicion(String condicion) {
        this.condicion = condicion;
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

    public Set<SolicitudPrestacion> getSolicitudPrestacions() {
        return this.solicitudPrestacions;
    }

    public void setSolicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        if (this.solicitudPrestacions != null) {
            this.solicitudPrestacions.forEach(i -> i.setPrestador(null));
        }
        if (solicitudPrestacions != null) {
            solicitudPrestacions.forEach(i -> i.setPrestador(this));
        }
        this.solicitudPrestacions = solicitudPrestacions;
    }

    public Prestador solicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        this.setSolicitudPrestacions(solicitudPrestacions);
        return this;
    }

    public Prestador addSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.add(solicitudPrestacion);
        solicitudPrestacion.setPrestador(this);
        return this;
    }

    public Prestador removeSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.remove(solicitudPrestacion);
        solicitudPrestacion.setPrestador(null);
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
            ", nombre='" + getNombre() + "'" +
            ", condicion='" + getCondicion() + "'" +
            "}";
    }
}
