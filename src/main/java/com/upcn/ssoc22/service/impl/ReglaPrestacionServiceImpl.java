package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.ItemNomenclador;
import com.upcn.ssoc22.domain.Prestacion;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ReglaPrestacionRepository;
import com.upcn.ssoc22.repository.SolicitudPrestacionRepository;
import com.upcn.ssoc22.service.ReglaPrestacionService;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ReglaPrestacion}.
 */
@Service
@Transactional
public class ReglaPrestacionServiceImpl implements ReglaPrestacionService {

    private final Logger log = LoggerFactory.getLogger(ReglaPrestacionServiceImpl.class);

    private final ReglaPrestacionRepository reglaPrestacionRepository;
    private final SolicitudPrestacionRepository solicitudPrestacionRepository;

    public ReglaPrestacionServiceImpl(
        ReglaPrestacionRepository reglaPrestacionRepository,
        SolicitudPrestacionRepository solicitudPrestacionRepository
    ) {
        this.reglaPrestacionRepository = reglaPrestacionRepository;
        this.solicitudPrestacionRepository = solicitudPrestacionRepository;
    }

    @Override
    public ReglaPrestacion save(ReglaPrestacion reglaPrestacion) {
        log.debug("Request to save ReglaPrestacion : {}", reglaPrestacion);
        return reglaPrestacionRepository.save(reglaPrestacion);
    }

    @Override
    public Optional<ReglaPrestacion> partialUpdate(ReglaPrestacion reglaPrestacion) {
        log.debug("Request to partially update ReglaPrestacion : {}", reglaPrestacion);

        return reglaPrestacionRepository
            .findById(reglaPrestacion.getId())
            .map(existingReglaPrestacion -> {
                if (reglaPrestacion.getCodigoRegla() != null) {
                    existingReglaPrestacion.setCodigoRegla(reglaPrestacion.getCodigoRegla());
                }
                if (reglaPrestacion.getTipoRegla() != null) {
                    existingReglaPrestacion.setTipoRegla(reglaPrestacion.getTipoRegla());
                }
                if (reglaPrestacion.getDatos() != null) {
                    existingReglaPrestacion.setDatos(reglaPrestacion.getDatos());
                }

                return existingReglaPrestacion;
            })
            .map(reglaPrestacionRepository::save);
    }

    // Esto devuelve todas las Reglas "prototipo" disponibles
    @Override
    @Transactional(readOnly = true)
    public List<ReglaPrestacion> findAllPrototipos() {
        log.debug("Request to get all ReglaPrestacions");
        return reglaPrestacionRepository.findAllByProvisionId(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReglaPrestacion> findOne(Long id) {
        log.debug("Request to get ReglaPrestacion : {}", id);
        return reglaPrestacionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReglaPrestacion : {}", id);
        reglaPrestacionRepository.deleteById(id);
    }

    // Sin uso
    public boolean procesarReglaDeHabilitacion(ReglaPrestacion r, Adhesion a) {
        if (r.getTipoRegla().equals("Habilita")) {
            // Ejemplo
            return true;
        }

        return false;
    }

    @Override
    public int procesarReglaDeCarencia(ReglaPrestacion r, Adhesion a) {
        if (r.getTipoRegla().equals("Carencia")) {
            // Ejemplo
            return Integer.parseInt(r.getDatos());
        }
        return 0;
    }

    @Override
    public float procesarReglaDeDescuento(ReglaPrestacion r, Adhesion a, float precioBase) {
        if (r.getTipoRegla().equals("Descuento")) {
            // Ejemplo
            return precioBase * (100 - (Integer.parseInt(r.getDatos()))) / 100;
        }

        return precioBase;
    }

    @Override
    public boolean procesarReglaDeLimiteVecesPorAñoPorPaciente(ReglaPrestacion r, Adhesion a) {
        Prestacion p = r.getProvision().getPrestacion();
        ItemNomenclador i = r.getProvision().getItemNomenclador();

        ZonedDateTime inicioAño = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfYear()).truncatedTo(ChronoUnit.DAYS);
        ZonedDateTime finAño = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfYear()).truncatedTo(ChronoUnit.DAYS).plusYears(1);

        // Caso práctica individual
        if (i != null) {
            // Acá falta contemplar que la solicitudPrestación esté efectuada, no sólo solicitada
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorIndividuoYPracticaEntreFechas(
                i.getId(),
                a.getIndividuo().getId(),
                a.getId(),
                inicioAño,
                finAño
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + i.getNombre() + " el ultimo año: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }
        // Caso grupo de prácticas (ej. restricción sobre Bonos en general)
        else if (p != null) {
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorIndividuoYPrestacionEntreFechas(
                p.getId(),
                a.getIndividuo().getId(),
                a.getId(),
                inicioAño,
                finAño
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + p.getNombre() + " el ultimo año: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }

        return true;
    }

    @Override
    public boolean procesarReglaDeLimiteVecesPorMesPorPaciente(ReglaPrestacion r, Adhesion a) {
        Prestacion p = r.getProvision().getPrestacion();
        ItemNomenclador i = r.getProvision().getItemNomenclador();

        ZonedDateTime inicioMes = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfMonth()).truncatedTo(ChronoUnit.DAYS);
        ZonedDateTime finMes = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfMonth()).truncatedTo(ChronoUnit.DAYS).plusMonths(1);

        // Caso práctica individual
        if (i != null) {
            // Acá falta contemplar que la solicitudPrestación esté efectuada, no sólo solicitada
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorIndividuoYPracticaEntreFechas(
                i.getId(),
                a.getIndividuo().getId(),
                a.getId(),
                inicioMes,
                finMes
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + i.getNombre() + " el ultimo mes: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }
        // Caso grupo de prácticas (ej. restricción sobre Bonos en general)
        else if (p != null) {
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorIndividuoYPrestacionEntreFechas(
                p.getId(),
                a.getIndividuo().getId(),
                a.getId(),
                inicioMes,
                finMes
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + p.getNombre() + " el ultimo mes: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }

        return true;
    }

    @Override
    public boolean procesarReglaDeLimiteVecesPorMesPorCliente(ReglaPrestacion r, Adhesion a) {
        Prestacion p = r.getProvision().getPrestacion();
        ItemNomenclador i = r.getProvision().getItemNomenclador();

        ZonedDateTime inicioMes = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfMonth()).truncatedTo(ChronoUnit.DAYS);
        ZonedDateTime finMes = ZonedDateTime.now().with(TemporalAdjusters.firstDayOfMonth()).truncatedTo(ChronoUnit.DAYS).plusMonths(1);

        // Caso práctica individual
        if (i != null) {
            // Acá falta contemplar que la solicitudPrestación esté efectuada, no sólo solicitada
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorClienteYPracticaEntreFechas(
                i.getId(),
                a.getCliente().getId(),
                inicioMes,
                finMes
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + i.getNombre() + " el ultimo mes: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }
        // Caso grupo de prácticas (ej. restricción sobre Bonos en general)
        else if (p != null) {
            Integer cantidad = solicitudPrestacionRepository.getCantidadPorClienteYPrestacionEntreFechas(
                p.getId(),
                a.getCliente().getId(),
                inicioMes,
                finMes
            );
            Integer maxPermitido = Integer.parseInt(r.getDatos());
            log.info(">>>> Cantidad de " + p.getNombre() + " el ultimo mes: " + cantidad + ", max: " + maxPermitido);
            if (cantidad < maxPermitido) return true; else return false;
        }

        return true;
    }
}
