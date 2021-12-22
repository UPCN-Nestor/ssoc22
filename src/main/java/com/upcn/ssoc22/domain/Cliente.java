package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "enPadron")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "subscripcions", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Set<Cliente> padrons = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "individuo", "cliente" }, allowSetters = true)
    private Set<Adhesion> adhesions = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plan", "cliente" }, allowSetters = true)
    private Set<Subscripcion> subscripcions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "subscripcions", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Cliente enPadron;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cliente", "itemFacturas" }, allowSetters = true)
    private Set<Factura> facturas = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cliente", "factura" }, allowSetters = true)
    private Set<ItemFactura> itemFacturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cliente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Cliente> getPadrons() {
        return this.padrons;
    }

    public void setPadrons(Set<Cliente> clientes) {
        if (this.padrons != null) {
            this.padrons.forEach(i -> i.setEnPadron(null));
        }
        if (clientes != null) {
            clientes.forEach(i -> i.setEnPadron(this));
        }
        this.padrons = clientes;
    }

    public Cliente padrons(Set<Cliente> clientes) {
        this.setPadrons(clientes);
        return this;
    }

    public Cliente addPadron(Cliente cliente) {
        this.padrons.add(cliente);
        cliente.setEnPadron(this);
        return this;
    }

    public Cliente removePadron(Cliente cliente) {
        this.padrons.remove(cliente);
        cliente.setEnPadron(null);
        return this;
    }

    public Set<Adhesion> getAdhesions() {
        return this.adhesions;
    }

    public void setAdhesions(Set<Adhesion> adhesions) {
        if (this.adhesions != null) {
            this.adhesions.forEach(i -> i.setCliente(null));
        }
        if (adhesions != null) {
            adhesions.forEach(i -> i.setCliente(this));
        }
        this.adhesions = adhesions;
    }

    public Cliente adhesions(Set<Adhesion> adhesions) {
        this.setAdhesions(adhesions);
        return this;
    }

    public Cliente addAdhesion(Adhesion adhesion) {
        this.adhesions.add(adhesion);
        adhesion.setCliente(this);
        return this;
    }

    public Cliente removeAdhesion(Adhesion adhesion) {
        this.adhesions.remove(adhesion);
        adhesion.setCliente(null);
        return this;
    }

    public Set<Subscripcion> getSubscripcions() {
        return this.subscripcions;
    }

    public void setSubscripcions(Set<Subscripcion> subscripcions) {
        if (this.subscripcions != null) {
            this.subscripcions.forEach(i -> i.setCliente(null));
        }
        if (subscripcions != null) {
            subscripcions.forEach(i -> i.setCliente(this));
        }
        this.subscripcions = subscripcions;
    }

    public Cliente subscripcions(Set<Subscripcion> subscripcions) {
        this.setSubscripcions(subscripcions);
        return this;
    }

    public Cliente addSubscripcion(Subscripcion subscripcion) {
        this.subscripcions.add(subscripcion);
        subscripcion.setCliente(this);
        return this;
    }

    public Cliente removeSubscripcion(Subscripcion subscripcion) {
        this.subscripcions.remove(subscripcion);
        subscripcion.setCliente(null);
        return this;
    }

    public Cliente getEnPadron() {
        return this.enPadron;
    }

    public void setEnPadron(Cliente cliente) {
        this.enPadron = cliente;
    }

    public Cliente enPadron(Cliente cliente) {
        this.setEnPadron(cliente);
        return this;
    }

    public Set<Factura> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Factura> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setCliente(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setCliente(this));
        }
        this.facturas = facturas;
    }

    public Cliente facturas(Set<Factura> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public Cliente addFactura(Factura factura) {
        this.facturas.add(factura);
        factura.setCliente(this);
        return this;
    }

    public Cliente removeFactura(Factura factura) {
        this.facturas.remove(factura);
        factura.setCliente(null);
        return this;
    }

    public Set<ItemFactura> getItemFacturas() {
        return this.itemFacturas;
    }

    public void setItemFacturas(Set<ItemFactura> itemFacturas) {
        if (this.itemFacturas != null) {
            this.itemFacturas.forEach(i -> i.setCliente(null));
        }
        if (itemFacturas != null) {
            itemFacturas.forEach(i -> i.setCliente(this));
        }
        this.itemFacturas = itemFacturas;
    }

    public Cliente itemFacturas(Set<ItemFactura> itemFacturas) {
        this.setItemFacturas(itemFacturas);
        return this;
    }

    public Cliente addItemFactura(ItemFactura itemFactura) {
        this.itemFacturas.add(itemFactura);
        itemFactura.setCliente(this);
        return this;
    }

    public Cliente removeItemFactura(ItemFactura itemFactura) {
        this.itemFacturas.remove(itemFactura);
        itemFactura.setCliente(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            "}";
    }
}
