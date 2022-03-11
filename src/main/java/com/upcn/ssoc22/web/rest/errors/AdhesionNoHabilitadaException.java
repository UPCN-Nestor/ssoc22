package com.upcn.ssoc22.web.rest.errors;

public class AdhesionNoHabilitadaException extends BadRequestAlertException {

    public AdhesionNoHabilitadaException() {
        super(ErrorConstants.ADHESION_NO_HABILITADA_TYPE, "Adhesion no habilitada", "adhesion", "adhesionnohabilitada");
    }
}
