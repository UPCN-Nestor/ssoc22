package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Factura.
 */
@Entity
@Table(name = "factura")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Factura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "subscripcions", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Cliente cliente;

    @OneToMany(mappedBy = "factura")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cliente", "factura" }, allowSetters = true)
    private Set<ItemFactura> itemFacturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Factura id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Factura cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public Set<ItemFactura> getItemFacturas() {
        return this.itemFacturas;
    }

    public void setItemFacturas(Set<ItemFactura> itemFacturas) {
        if (this.itemFacturas != null) {
            this.itemFacturas.forEach(i -> i.setFactura(null));
        }
        if (itemFacturas != null) {
            itemFacturas.forEach(i -> i.setFactura(this));
        }
        this.itemFacturas = itemFacturas;
    }

    public Factura itemFacturas(Set<ItemFactura> itemFacturas) {
        this.setItemFacturas(itemFacturas);
        return this;
    }

    public Factura addItemFactura(ItemFactura itemFactura) {
        this.itemFacturas.add(itemFactura);
        itemFactura.setFactura(this);
        return this;
    }

    public Factura removeItemFactura(ItemFactura itemFactura) {
        this.itemFacturas.remove(itemFactura);
        itemFactura.setFactura(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Factura)) {
            return false;
        }
        return id != null && id.equals(((Factura) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Factura{" +
            "id=" + getId() +
            "}";
    }
}
