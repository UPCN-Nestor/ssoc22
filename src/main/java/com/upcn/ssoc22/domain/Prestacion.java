package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Prestacion.
 */
@Entity
@Table(name = "prestacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prestacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "carencias")
    private String carencias;

    @JsonIgnoreProperties(value = { "prestacion", "prestadors" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private ItemNomenclador itemNomenclador;

    @ManyToMany
    @JoinTable(
        name = "rel_prestacion__insumo",
        joinColumns = @JoinColumn(name = "prestacion_id"),
        inverseJoinColumns = @JoinColumn(name = "insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "plans" }, allowSetters = true)
    private Set<Insumo> insumos = new HashSet<>();

    @OneToMany(mappedBy = "prestacion")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reglaPrestacions", "prestacion", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

    @OneToMany(mappedBy = "prestacion")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despacho", "prestador", "prestacion", "insumos" }, allowSetters = true)
    private Set<SolicitudPrestacion> solicitudPrestacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Prestacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Prestacion tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getCarencias() {
        return this.carencias;
    }

    public Prestacion carencias(String carencias) {
        this.setCarencias(carencias);
        return this;
    }

    public void setCarencias(String carencias) {
        this.carencias = carencias;
    }

    public ItemNomenclador getItemNomenclador() {
        return this.itemNomenclador;
    }

    public void setItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomenclador = itemNomenclador;
    }

    public Prestacion itemNomenclador(ItemNomenclador itemNomenclador) {
        this.setItemNomenclador(itemNomenclador);
        return this;
    }

    public Set<Insumo> getInsumos() {
        return this.insumos;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
    }

    public Prestacion insumos(Set<Insumo> insumos) {
        this.setInsumos(insumos);
        return this;
    }

    public Prestacion addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        insumo.getPrestacions().add(this);
        return this;
    }

    public Prestacion removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        insumo.getPrestacions().remove(this);
        return this;
    }

    public Set<Provision> getProvisions() {
        return this.provisions;
    }

    public void setProvisions(Set<Provision> provisions) {
        if (this.provisions != null) {
            this.provisions.forEach(i -> i.setPrestacion(null));
        }
        if (provisions != null) {
            provisions.forEach(i -> i.setPrestacion(this));
        }
        this.provisions = provisions;
    }

    public Prestacion provisions(Set<Provision> provisions) {
        this.setProvisions(provisions);
        return this;
    }

    public Prestacion addProvision(Provision provision) {
        this.provisions.add(provision);
        provision.setPrestacion(this);
        return this;
    }

    public Prestacion removeProvision(Provision provision) {
        this.provisions.remove(provision);
        provision.setPrestacion(null);
        return this;
    }

    public Set<SolicitudPrestacion> getSolicitudPrestacions() {
        return this.solicitudPrestacions;
    }

    public void setSolicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        if (this.solicitudPrestacions != null) {
            this.solicitudPrestacions.forEach(i -> i.setPrestacion(null));
        }
        if (solicitudPrestacions != null) {
            solicitudPrestacions.forEach(i -> i.setPrestacion(this));
        }
        this.solicitudPrestacions = solicitudPrestacions;
    }

    public Prestacion solicitudPrestacions(Set<SolicitudPrestacion> solicitudPrestacions) {
        this.setSolicitudPrestacions(solicitudPrestacions);
        return this;
    }

    public Prestacion addSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.add(solicitudPrestacion);
        solicitudPrestacion.setPrestacion(this);
        return this;
    }

    public Prestacion removeSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.solicitudPrestacions.remove(solicitudPrestacion);
        solicitudPrestacion.setPrestacion(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prestacion)) {
            return false;
        }
        return id != null && id.equals(((Prestacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prestacion{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", carencias='" + getCarencias() + "'" +
            "}";
    }
}
