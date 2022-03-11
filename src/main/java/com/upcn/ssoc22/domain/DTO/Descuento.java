package com.upcn.ssoc22.domain.DTO;

import java.io.Serializable;

public class Descuento implements Serializable {

    private Float descuento;

    public Float getDescuento() {
        return descuento;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }

    private String motivoDescuento;

    public String getMotivoDescuento() {
        return motivoDescuento;
    }

    public void setMotivoDescuento(String motivoDescuento) {
        this.motivoDescuento = motivoDescuento;
    }
}
