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

    @Column(name = "precio")
    private Float precio;

    @Column(name = "carencia")
    private Duration carencia;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "codigo")
    private String codigo;

    @OneToMany(mappedBy = "prestacion")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "prestacion", "solicitudPrestacions", "provisions", "prestadors" }, allowSetters = true)
    private Set<ItemNomenclador> itemNomencladors = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_prestacion__insumo",
        joinColumns = @JoinColumn(name = "prestacion_id"),
        inverseJoinColumns = @JoinColumn(name = "insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "provisions" }, allowSetters = true)
    private Set<Insumo> insumos = new HashSet<>();

    @OneToMany(mappedBy = "prestacion")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reglaPrestacions", "itemNomenclador", "prestacion", "insumos", "plan" }, allowSetters = true)
    private Set<Provision> provisions = new HashSet<>();

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

    public Float getPrecio() {
        return this.precio;
    }

    public Prestacion precio(Float precio) {
        this.setPrecio(precio);
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Duration getCarencia() {
        return this.carencia;
    }

    public Prestacion carencia(Duration carencia) {
        this.setCarencia(carencia);
        return this;
    }

    public void setCarencia(Duration carencia) {
        this.carencia = carencia;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Prestacion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Prestacion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Set<ItemNomenclador> getItemNomencladors() {
        return this.itemNomencladors;
    }

    public void setItemNomencladors(Set<ItemNomenclador> itemNomencladors) {
        if (this.itemNomencladors != null) {
            this.itemNomencladors.forEach(i -> i.setPrestacion(null));
        }
        if (itemNomencladors != null) {
            itemNomencladors.forEach(i -> i.setPrestacion(this));
        }
        this.itemNomencladors = itemNomencladors;
    }

    public Prestacion itemNomencladors(Set<ItemNomenclador> itemNomencladors) {
        this.setItemNomencladors(itemNomencladors);
        return this;
    }

    public Prestacion addItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomencladors.add(itemNomenclador);
        itemNomenclador.setPrestacion(this);
        return this;
    }

    public Prestacion removeItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomencladors.remove(itemNomenclador);
        itemNomenclador.setPrestacion(null);
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
            ", precio=" + getPrecio() +
            ", carencia='" + getCarencia() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
