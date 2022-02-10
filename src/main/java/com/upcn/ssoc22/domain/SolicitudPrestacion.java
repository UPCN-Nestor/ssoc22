package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SolicitudPrestacion.
 */
@Entity
@Table(name = "solicitud_prestacion")
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
public class SolicitudPrestacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "hora_solicitud")
    private ZonedDateTime horaSolicitud;

    @Column(name = "domicilio")
    private String domicilio;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "motivo_llamado")
    private String motivoLlamado;

    @Column(name = "se_efectuo")
    private Boolean seEfectuo;

    @Column(name = "internacion")
    private Boolean internacion;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "individuo_adhoc")
    private String individuoAdhoc;

    @Column(name = "precio_real")
    private Float precioReal;

    @JsonIgnoreProperties(
        value = { "chofer", "medico", "enfermero", "movil", "usuarioSalida", "usuarioLlegada", "usuarioLibre", "solicitudPrestacion" },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private Despacho despacho;

    @ManyToOne
    @JsonIgnoreProperties(value = { "prestacion", "solicitudPrestacions", "provisions", "prestadors" }, allowSetters = true)
    private ItemNomenclador itemNomenclador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "itemNomencladors", "solicitudPrestacions" }, allowSetters = true)
    private Prestador prestador;

    @ManyToOne
    private User usuarioSolicitud;

    @ManyToMany
    @JoinTable(
        name = "rel_solicitud_prestacion__insumo",
        joinColumns = @JoinColumn(name = "solicitud_prestacion_id"),
        inverseJoinColumns = @JoinColumn(name = "insumo_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
    @JsonIgnoreProperties(value = { "movimientoStocks", "prestacions", "solicitudPrestacions", "provisions" }, allowSetters = true)
    private Set<Insumo> insumos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "solicitudPrestacions" }, allowSetters = true)
    private Adhesion adhesion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SolicitudPrestacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public SolicitudPrestacion tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getNumero() {
        return this.numero;
    }

    public SolicitudPrestacion numero(Integer numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public ZonedDateTime getHoraSolicitud() {
        return this.horaSolicitud;
    }

    public SolicitudPrestacion horaSolicitud(ZonedDateTime horaSolicitud) {
        this.setHoraSolicitud(horaSolicitud);
        return this;
    }

    public void setHoraSolicitud(ZonedDateTime horaSolicitud) {
        this.horaSolicitud = horaSolicitud;
    }

    public String getDomicilio() {
        return this.domicilio;
    }

    public SolicitudPrestacion domicilio(String domicilio) {
        this.setDomicilio(domicilio);
        return this;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public SolicitudPrestacion telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Integer getEdad() {
        return this.edad;
    }

    public SolicitudPrestacion edad(Integer edad) {
        this.setEdad(edad);
        return this;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getMotivoLlamado() {
        return this.motivoLlamado;
    }

    public SolicitudPrestacion motivoLlamado(String motivoLlamado) {
        this.setMotivoLlamado(motivoLlamado);
        return this;
    }

    public void setMotivoLlamado(String motivoLlamado) {
        this.motivoLlamado = motivoLlamado;
    }

    public Boolean getSeEfectuo() {
        return this.seEfectuo;
    }

    public SolicitudPrestacion seEfectuo(Boolean seEfectuo) {
        this.setSeEfectuo(seEfectuo);
        return this;
    }

    public void setSeEfectuo(Boolean seEfectuo) {
        this.seEfectuo = seEfectuo;
    }

    public Boolean getInternacion() {
        return this.internacion;
    }

    public SolicitudPrestacion internacion(Boolean internacion) {
        this.setInternacion(internacion);
        return this;
    }

    public void setInternacion(Boolean internacion) {
        this.internacion = internacion;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public SolicitudPrestacion observaciones(String observaciones) {
        this.setObservaciones(observaciones);
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getIndividuoAdhoc() {
        return this.individuoAdhoc;
    }

    public SolicitudPrestacion individuoAdhoc(String individuoAdhoc) {
        this.setIndividuoAdhoc(individuoAdhoc);
        return this;
    }

    public void setIndividuoAdhoc(String individuoAdhoc) {
        this.individuoAdhoc = individuoAdhoc;
    }

    public Float getPrecioReal() {
        return this.precioReal;
    }

    public SolicitudPrestacion precioReal(Float precioReal) {
        this.setPrecioReal(precioReal);
        return this;
    }

    public void setPrecioReal(Float precioReal) {
        this.precioReal = precioReal;
    }

    public Despacho getDespacho() {
        return this.despacho;
    }

    public void setDespacho(Despacho despacho) {
        this.despacho = despacho;
    }

    public SolicitudPrestacion despacho(Despacho despacho) {
        this.setDespacho(despacho);
        return this;
    }

    public ItemNomenclador getItemNomenclador() {
        return this.itemNomenclador;
    }

    public void setItemNomenclador(ItemNomenclador itemNomenclador) {
        this.itemNomenclador = itemNomenclador;
    }

    public SolicitudPrestacion itemNomenclador(ItemNomenclador itemNomenclador) {
        this.setItemNomenclador(itemNomenclador);
        return this;
    }

    public Prestador getPrestador() {
        return this.prestador;
    }

    public void setPrestador(Prestador prestador) {
        this.prestador = prestador;
    }

    public SolicitudPrestacion prestador(Prestador prestador) {
        this.setPrestador(prestador);
        return this;
    }

    public User getUsuarioSolicitud() {
        return this.usuarioSolicitud;
    }

    public void setUsuarioSolicitud(User user) {
        this.usuarioSolicitud = user;
    }

    public SolicitudPrestacion usuarioSolicitud(User user) {
        this.setUsuarioSolicitud(user);
        return this;
    }

    public Set<Insumo> getInsumos() {
        return this.insumos;
    }

    public void setInsumos(Set<Insumo> insumos) {
        this.insumos = insumos;
    }

    public SolicitudPrestacion insumos(Set<Insumo> insumos) {
        this.setInsumos(insumos);
        return this;
    }

    public SolicitudPrestacion addInsumo(Insumo insumo) {
        this.insumos.add(insumo);
        insumo.getSolicitudPrestacions().add(this);
        return this;
    }

    public SolicitudPrestacion removeInsumo(Insumo insumo) {
        this.insumos.remove(insumo);
        insumo.getSolicitudPrestacions().remove(this);
        return this;
    }

    public Adhesion getAdhesion() {
        return this.adhesion;
    }

    public void setAdhesion(Adhesion adhesion) {
        this.adhesion = adhesion;
    }

    public SolicitudPrestacion adhesion(Adhesion adhesion) {
        this.setAdhesion(adhesion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SolicitudPrestacion)) {
            return false;
        }
        return id != null && id.equals(((SolicitudPrestacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SolicitudPrestacion{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", numero=" + getNumero() +
            ", horaSolicitud='" + getHoraSolicitud() + "'" +
            ", domicilio='" + getDomicilio() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", edad=" + getEdad() +
            ", motivoLlamado='" + getMotivoLlamado() + "'" +
            ", seEfectuo='" + getSeEfectuo() + "'" +
            ", internacion='" + getInternacion() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", individuoAdhoc='" + getIndividuoAdhoc() + "'" +
            ", precioReal=" + getPrecioReal() +
            "}";
    }
}
