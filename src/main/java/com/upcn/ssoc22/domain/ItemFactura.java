package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ItemFactura.
 */
@Entity
@Table(name = "item_factura")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ItemFactura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "padrons", "adhesions", "contratoes", "solicitudPrestacions", "enPadron", "facturas", "itemFacturas" },
        allowSetters = true
    )
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cliente", "itemFacturas" }, allowSetters = true)
    private Factura factura;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ItemFactura id(Long id) {
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

    public ItemFactura cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public Factura getFactura() {
        return this.factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public ItemFactura factura(Factura factura) {
        this.setFactura(factura);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemFactura)) {
            return false;
        }
        return id != null && id.equals(((ItemFactura) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemFactura{" +
            "id=" + getId() +
            "}";
    }
}
