package com.upcn.ssoc22.web.rest.errors;

public class PrestacionNoHabilitadaException extends BadRequestAlertException {

    public PrestacionNoHabilitadaException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Prestación no habilitada", "itemNomenclador", "prestacionnohabilitada");
    }
}
