//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.14 a las 10:56:50 AM ART
//

package com.upcn.glm.comprobante;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para CompExtIN.Item complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="CompExtIN.Item"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Fac1Srv" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Fac2Itm" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="Fac2Imp1" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CompExtIN.Item", propOrder = { "fac1Srv", "fac2Itm", "fac2Imp1" })
public class CompExtINItem {

    @XmlElement(name = "Fac1Srv")
    protected byte fac1Srv;

    @XmlElement(name = "Fac2Itm")
    protected short fac2Itm;

    @XmlElement(name = "Fac2Imp1")
    protected double fac2Imp1;

    /**
     * Obtiene el valor de la propiedad fac1Srv.
     *
     */
    public byte getFac1Srv() {
        return fac1Srv;
    }

    /**
     * Define el valor de la propiedad fac1Srv.
     *
     */
    public void setFac1Srv(byte value) {
        this.fac1Srv = value;
    }

    /**
     * Obtiene el valor de la propiedad fac2Itm.
     *
     */
    public short getFac2Itm() {
        return fac2Itm;
    }

    /**
     * Define el valor de la propiedad fac2Itm.
     *
     */
    public void setFac2Itm(short value) {
        this.fac2Itm = value;
    }

    /**
     * Obtiene el valor de la propiedad fac2Imp1.
     *
     */
    public double getFac2Imp1() {
        return fac2Imp1;
    }

    /**
     * Define el valor de la propiedad fac2Imp1.
     *
     */
    public void setFac2Imp1(double value) {
        this.fac2Imp1 = value;
    }
}
