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

    @ManyToMany
    @JoinTable(
        name = "rel_despacho__chofer",
        joinColumns = @JoinColumn(name = "despacho_id"),
        inverseJoinColumns = @JoinColumn(name = "chofer_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Set<Chofer> chofers = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_despacho__medico",
        joinColumns = @JoinColumn(name = "despacho_id"),
        inverseJoinColumns = @JoinColumn(name = "medico_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Set<Medico> medicos = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_despacho__enfermero",
        joinColumns = @JoinColumn(name = "despacho_id"),
        inverseJoinColumns = @JoinColumn(name = "enfermero_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Set<Enfermero> enfermeros = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_despacho__movil",
        joinColumns = @JoinColumn(name = "despacho_id"),
        inverseJoinColumns = @JoinColumn(name = "movil_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "despachos" }, allowSetters = true)
    private Set<Movil> movils = new HashSet<>();

    @JsonIgnoreProperties(value = { "despacho", "itemNomenclador", "prestador", "insumos", "individuo" }, allowSetters = true)
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

    public Set<Chofer> getChofers() {
        return this.chofers;
    }

    public void setChofers(Set<Chofer> chofers) {
        this.chofers = chofers;
    }

    public Despacho chofers(Set<Chofer> chofers) {
        this.setChofers(chofers);
        return this;
    }

    public Despacho addChofer(Chofer chofer) {
        this.chofers.add(chofer);
        chofer.getDespachos().add(this);
        return this;
    }

    public Despacho removeChofer(Chofer chofer) {
        this.chofers.remove(chofer);
        chofer.getDespachos().remove(this);
        return this;
    }

    public Set<Medico> getMedicos() {
        return this.medicos;
    }

    public void setMedicos(Set<Medico> medicos) {
        this.medicos = medicos;
    }

    public Despacho medicos(Set<Medico> medicos) {
        this.setMedicos(medicos);
        return this;
    }

    public Despacho addMedico(Medico medico) {
        this.medicos.add(medico);
        medico.getDespachos().add(this);
        return this;
    }

    public Despacho removeMedico(Medico medico) {
        this.medicos.remove(medico);
        medico.getDespachos().remove(this);
        return this;
    }

    public Set<Enfermero> getEnfermeros() {
        return this.enfermeros;
    }

    public void setEnfermeros(Set<Enfermero> enfermeros) {
        this.enfermeros = enfermeros;
    }

    public Despacho enfermeros(Set<Enfermero> enfermeros) {
        this.setEnfermeros(enfermeros);
        return this;
    }

    public Despacho addEnfermero(Enfermero enfermero) {
        this.enfermeros.add(enfermero);
        enfermero.getDespachos().add(this);
        return this;
    }

    public Despacho removeEnfermero(Enfermero enfermero) {
        this.enfermeros.remove(enfermero);
        enfermero.getDespachos().remove(this);
        return this;
    }

    public Set<Movil> getMovils() {
        return this.movils;
    }

    public void setMovils(Set<Movil> movils) {
        this.movils = movils;
    }

    public Despacho movils(Set<Movil> movils) {
        this.setMovils(movils);
        return this;
    }

    public Despacho addMovil(Movil movil) {
        this.movils.add(movil);
        movil.getDespachos().add(this);
        return this;
    }

    public Despacho removeMovil(Movil movil) {
        this.movils.remove(movil);
        movil.getDespachos().remove(this);
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
            "}";
    }
}
