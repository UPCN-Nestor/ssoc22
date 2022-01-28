package com.upcn.ssoc22.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;

public class AdhesionNoHabilitadaException extends BadRequestAlertException {

    public AdhesionNoHabilitadaException() {
        super(ErrorConstants.ADHESION_NO_HABILITADA_TYPE, "Adhesion no habilitada", "adhesion", "adhesionnohabilitada");
    }
}
