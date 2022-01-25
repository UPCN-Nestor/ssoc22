package com.upcn.ssoc22.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Despacho.
 */
@Entity
@Table(name = "despacho")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Despacho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "hora_salida")
    private ZonedDateTime horaSalida;

    @Column(name = "hora_llegada")
    private ZonedDateTime horaLlegada;

    @Column(name = "hora_libre")
    private ZonedDateTime horaLibre;

    @ManyToOne
    @JsonIgnoreProperties(value = { "itemNomencladors", "despachos" }, allowSetters = true)
    private Prestador prestador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Chofer chofer;

    @ManyToOne
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Medico medico;

    @ManyToOne
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Enfermero enfermero;

    @ManyToOne
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Movil movil;

    @JsonIgnoreProperties(value = { "despacho", "itemNomenclador", "insumos", "individuo" }, allowSetters = true)
    @OneToOne(mappedBy = "despacho")
    private SolicitudPrestacion solicitudPrestacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Despacho id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getHoraSalida() {
        return this.horaSalida;
    }

    public Despacho horaSalida(ZonedDateTime horaSalida) {
        this.setHoraSalida(horaSalida);
        return this;
    }

    public void setHoraSalida(ZonedDateTime horaSalida) {
        this.horaSalida = horaSalida;
    }

    public ZonedDateTime getHoraLlegada() {
        return this.horaLlegada;
    }

    public Despacho horaLlegada(ZonedDateTime horaLlegada) {
        this.setHoraLlegada(horaLlegada);
        return this;
    }

    public void setHoraLlegada(ZonedDateTime horaLlegada) {
        this.horaLlegada = horaLlegada;
    }

    public ZonedDateTime getHoraLibre() {
        return this.horaLibre;
    }

    public Despacho horaLibre(ZonedDateTime horaLibre) {
        this.setHoraLibre(horaLibre);
        return this;
    }

    public void setHoraLibre(ZonedDateTime horaLibre) {
        this.horaLibre = horaLibre;
    }

    public Prestador getPrestador() {
        return this.prestador;
    }

    public void setPrestador(Prestador prestador) {
        this.prestador = prestador;
    }

    public Despacho prestador(Prestador prestador) {
        this.setPrestador(prestador);
        return this;
    }

    public Chofer getChofer() {
        return this.chofer;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public Despacho chofer(Chofer chofer) {
        this.setChofer(chofer);
        return this;
    }

    public Medico getMedico() {
        return this.medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Despacho medico(Medico medico) {
        this.setMedico(medico);
        return this;
    }

    public Enfermero getEnfermero() {
        return this.enfermero;
    }

    public void setEnfermero(Enfermero enfermero) {
        this.enfermero = enfermero;
    }

    public Despacho enfermero(Enfermero enfermero) {
        this.setEnfermero(enfermero);
        return this;
    }

    public Movil getMovil() {
        return this.movil;
    }

    public void setMovil(Movil movil) {
        this.movil = movil;
    }

    public Despacho movil(Movil movil) {
        this.setMovil(movil);
        return this;
    }

    public SolicitudPrestacion getSolicitudPrestacion() {
        return this.solicitudPrestacion;
    }

    public void setSolicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        if (this.solicitudPrestacion != null) {
            this.solicitudPrestacion.setDespacho(null);
        }
        if (solicitudPrestacion != null) {
            solicitudPrestacion.setDespacho(this);
        }
        this.solicitudPrestacion = solicitudPrestacion;
    }

    public Despacho solicitudPrestacion(SolicitudPrestacion solicitudPrestacion) {
        this.setSolicitudPrestacion(solicitudPrestacion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Despacho)) {
            return false;
        }
        return id != null && id.equals(((Despacho) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Despacho{" +
            "id=" + getId() +
            ", horaSalida='" + getHoraSalida() + "'" +
            ", horaLlegada='" + getHoraLlegada() + "'" +
            ", horaLibre='" + getHoraLibre() + "'" +
            "}";
    }
}
