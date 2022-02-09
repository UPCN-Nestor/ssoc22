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

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "socio")
    private Integer socio;

    @Column(name = "suministro")
    private Integer suministro;

    @Column(name = "dni")
    private String dni;

    @OneToMany(mappedBy = "enPadron")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "contratoes", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
    private Set<Cliente> padrons = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "solicitudPrestacions", "individuo", "cliente" }, allowSetters = true)
    private Set<Adhesion> adhesions = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "plan", "cliente" }, allowSetters = true)
    private Set<Contrato> contratoes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "padrons", "adhesions", "contratoes", "enPadron", "facturas", "itemFacturas" }, allowSetters = true)
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

    public String getNombre() {
        return this.nombre;
    }

    public Cliente nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getSocio() {
        return this.socio;
    }

    public Cliente socio(Integer socio) {
        this.setSocio(socio);
        return this;
    }

    public void setSocio(Integer socio) {
        this.socio = socio;
    }

    public Integer getSuministro() {
        return this.suministro;
    }

    public Cliente suministro(Integer suministro) {
        this.setSuministro(suministro);
        return this;
    }

    public void setSuministro(Integer suministro) {
        this.suministro = suministro;
    }

    public String getDni() {
        return this.dni;
    }

    public Cliente dni(String dni) {
        this.setDni(dni);
        return this;
    }

    public void setDni(String dni) {
        this.dni = dni;
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

    public Set<Contrato> getContratoes() {
        return this.contratoes;
    }

    public void setContratoes(Set<Contrato> contratoes) {
        if (this.contratoes != null) {
            this.contratoes.forEach(i -> i.setCliente(null));
        }
        if (contratoes != null) {
            contratoes.forEach(i -> i.setCliente(this));
        }
        this.contratoes = contratoes;
    }

    public Cliente contratoes(Set<Contrato> contratoes) {
        this.setContratoes(contratoes);
        return this;
    }

    public Cliente addContrato(Contrato contrato) {
        this.contratoes.add(contrato);
        contrato.setCliente(this);
        return this;
    }

    public Cliente removeContrato(Contrato contrato) {
        this.contratoes.remove(contrato);
        contrato.setCliente(null);
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
            ", nombre='" + getNombre() + "'" +
            ", socio=" + getSocio() +
            ", suministro=" + getSuministro() +
            ", dni='" + getDni() + "'" +
            "}";
    }
}
