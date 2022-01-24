package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Duration;
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

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "carencia")
    private Duration carencia;

    @ManyToOne
    @JsonIgnoreProperties(value = { "itemNomencladors", "insumos" }, allowSetters = true)
    private Prestacion prestacion;

    @OneToMany(mappedBy = "itemNomenclador")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despacho", "itemNomenclador", "insumos", "individuo" }, allowSetters = true)
    private Set<SolicitudPrestacion> solicitudPrestacions = new HashSet<>();

    @OneToMany(mappedBy = "itemNomenclador")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "insumos", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

    @ManyToMany(mappedBy = "itemNomencladors")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "itemNomencladors", "despachos" }, allowSetters = true)
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

    public String getNombre() {
        return this.nombre;
    }

    public ItemNomenclador nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Duration getCarencia() {
        return this.carencia;
    }

    public ItemNomenclador carencia(Duration carencia) {
        this.setCarencia(carencia);
        return this;
    }

    public void setCarencia(Duration carencia) {
        this.carencia = carencia;
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

    public Set<SolicitudPrestacion> getSolicitudPrestacions() {
        return this.solicitudPrestacions;
    }

    public void setSolicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        if (this.solicitudPrestacions != null) {
            this.solicitudPrestacions.forEach(i -> i.setItemNomenclador(null));
        }
        if (solicitudPrestacions != null) {
            solicitudPrestacions.forEach(i -> i.setItemNomenclador(this));
        }
        this.solicitudPrestacions = solicitudPrestacions;
    }

    public ItemNomenclador solicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        this.setSolicitudPrestacions(solicitudPrestacions);
        return this;
    }

    public ItemNomenclador addSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.add(solicitudPrestacion);
        solicitudPrestacion.setItemNomenclador(this);
        return this;
    }

    public ItemNomenclador removeSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.remove(solicitudPrestacion);
        solicitudPrestacion.setItemNomenclador(null);
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
            ", nombre='" + getNombre() + "'" +
            ", carencia='" + getCarencia() + "'" +
            "}";
    }
}
