package com.upcn.ssoc22.service.impl;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.DTO.Descuento;
import com.upcn.ssoc22.domain.Provision;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import com.upcn.ssoc22.repository.ProvisionRepository;
import com.upcn.ssoc22.service.ProvisionService;
import com.upcn.ssoc22.service.ReglaPrestacionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Provision}.
 */
@Service
@Transactional
public class ProvisionServiceImpl implements ProvisionService {

    private final Logger log = LoggerFactory.getLogger(ProvisionServiceImpl.class);

    private final ProvisionRepository provisionRepository;
    private final ReglaPrestacionService reglaPrestacionService;

    public ProvisionServiceImpl(ProvisionRepository provisionRepository, ReglaPrestacionService reglaPrestacionService) {
        this.provisionRepository = provisionRepository;
        this.reglaPrestacionService = reglaPrestacionService;
    }

    @Override
    public Provision save(Provision provision) {
        log.debug("Request to save Provision : {}", provision);
        return provisionRepository.save(provision);
    }

    @Override
    public Optional<Provision> partialUpdate(Provision provision) {
        log.debug("Request to partially update Provision : {}", provision);

        return provisionRepository
            .findById(provision.getId())
            .map(existingProvision -> {
                return existingProvision;
            })
            .map(provisionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Provision> findAll() {
        log.debug("Request to get all Provisions");
        return provisionRepository.findAllWithEagerRelationships();
    }

    public Page<Provision> findAllWithEagerRelationships(Pageable pageable) {
        return provisionRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Provision> findOne(Long id) {
        log.debug("Request to get Provision : {}", id);
        return provisionRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Provision : {}", id);
        provisionRepository.deleteById(id);
    }

    public boolean estaHabilitadaPara(Provision p, Adhesion a) {
        boolean habilitada = false;

        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Habilita")) {
                log.info(">>> Regla de habilitaci??n: " + r.getId());
                if (reglaPrestacionService.procesarReglaDeHabilitacion(r, a)) {
                    log.info(">>> Ok.");
                    habilitada = true;
                    break;
                }
            }
        }

        return habilitada;
    }

    // Devuelve true si la regla r fue copiada a la provisi??n p; false si es "original". Esto ocurre cuando una pr??ctica "hereda" una regla de la prestaci??n "todos los bonos"
    private boolean esReglaCopiada(ReglaPrestacion r, Provision p) {
        return r.getProvision() != p;
    }

    public int diasCarencia(Provision p, Adhesion a) {
        int dias = 0;

        // Primero se procesan las reglas copiadas del caso "todos los bonos"
        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Carencia") && esReglaCopiada(r, p)) {
                log.info(">>>> Se hall?? una regla copiada del caso general: " + r.getNombre() + " " + r.getDatos());
                int carencia = reglaPrestacionService.procesarReglaDeCarencia(r, a);
                dias = dias > carencia ? dias : carencia;
            }
        }

        // Luego se procesan las reglas particulares
        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Carencia") && !esReglaCopiada(r, p)) {
                // Si hay al menos una regla particular, pisa la general.
                dias = 0;

                log.info(">>>> Regla de carencia: " + r.getNombre() + " " + r.getDatos());
                int carencia = reglaPrestacionService.procesarReglaDeCarencia(r, a);
                dias = dias > carencia ? dias : carencia; // Se queda la mayor carencia entre las reglas aplicadas
            }
        }

        return dias;
    }

    public Descuento procesarDescuento(Provision prov, Adhesion a, float precioBase) {
        float precio = precioBase;
        String motivo = "";

        for (ReglaPrestacion r : prov.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Descuento")) {
                log.info(">>> Regla de descuento: " + r.getId() + " " + r.getNombre() + " " + r.getDatos());
                motivo += r.getNombre() + ": " + r.getDatos();
                precio = reglaPrestacionService.procesarReglaDeDescuento(r, a, precioBase);
            }
        }

        Descuento toRet = new Descuento();
        toRet.setDescuento(precio);
        toRet.setMotivoDescuento(motivo);
        return toRet;
    }

    public List<Provision> findAllByPlanId(Long planid) {
        return provisionRepository.findAllByPlanIdWithEagerRelationships(planid);
    }

    @Override
    public Pair<Boolean, String> cumpleLimites(Provision p, Adhesion a) {
        boolean toRet = true;
        String motivo = "";

        // Si las reglas generales (copiadas) y espec??ficas van a tener la misma jerarqu??a, ac?? hay que refactorizar para eliminar la distinci??n de "esReglaCopiada"

        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Limite") && esReglaCopiada(r, p)) {
                log.info(">>> Regla de limite COPIADA: " + r.getId() + " " + r.getNombre() + " " + r.getDatos());
                if (r.getCodigoRegla().equals("LPM")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorMesPorPaciente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
                if (r.getCodigoRegla().equals("LPA")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorA??oPorPaciente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
                if (r.getCodigoRegla().equals("LCM")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorMesPorCliente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
            }
        }

        for (ReglaPrestacion r : p.getReglaPrestacions()) {
            if (r.getTipoRegla().equals("Limite") && !esReglaCopiada(r, p)) {
                //toRet = true;

                log.info(">>> Regla de limite: " + r.getId() + " " + r.getNombre() + " " + r.getDatos());
                if (r.getCodigoRegla().equals("LPM")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorMesPorPaciente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
                if (r.getCodigoRegla().equals("LPA")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorA??oPorPaciente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
                if (r.getCodigoRegla().equals("LCM")) {
                    if (!reglaPrestacionService.procesarReglaDeLimiteVecesPorMesPorCliente(r, a)) {
                        log.info(">>> No se cumple.");
                        motivo += r.getNombre() + ": " + r.getDatos() + ". ";
                        toRet = false;
                    }
                }
            }
        }

        return Pair.of(toRet, motivo);
    }
}
