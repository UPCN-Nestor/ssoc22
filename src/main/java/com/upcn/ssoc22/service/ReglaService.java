package com.upcn.ssoc22.service;

import com.upcn.ssoc22.domain.Adhesion;
import com.upcn.ssoc22.domain.ReglaPrestacion;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import net.bytebuddy.asm.Advice.Local;
import org.springframework.stereotype.Service;

@Service
public class ReglaService {

    /*** NESTOR */

    public boolean procesarReglaParaHabilitacionPrestacion(ReglaPrestacion r, Adhesion paraQuien) {
        if (r.getRegla().equals("carencia-meses")) {
            int mesesCarencia = Integer.parseInt(r.getDatos());
            if (paraQuien.getFechaAlta().plusMonths(mesesCarencia).isBefore(LocalDate.now())) return true; else return false;
        }

        return false;
    }

    // public Object procesarReglaParaPorcentajeDescuento(ReglaPrestacion r, Adhesion paraQuien) { }

    // Esta la consulto desde la creación de planes para ofrecer las posibilidades,
    // se hace el insert con este nombre en la tabla ReglaPrestacion y de ahí en adelante todo se maneja con ese campo
    public static List<String> reglas = new ArrayList<>(List.of("carencia-meses", "otra"));

    // ??
    enum TipoRegla {
        REGLA_CARENCIA,
        REGLA_DESCUENTO,
        REGLA_LIMITE,
    }
    /*****/
}
