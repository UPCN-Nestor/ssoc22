//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.19 a las 08:12:17 AM ART
//

package com.upcn.glm.novedad;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para PresuOut.Item complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuOut.Item"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Tf1OrdFac" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Tf2Srv" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Tf3Itm" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="ItmDsc" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Tf3Cnp" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="CptDsc" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Tf3TpoCal" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Tf3Imp1" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PresuOut.Item", propOrder = { "tf1OrdFac", "tf2Srv", "tf3Itm", "itmDsc", "tf3Cnp", "cptDsc", "tf3TpoCal", "tf3Imp1" })
public class PresuOutItem {

    @XmlElement(name = "Tf1OrdFac")
    protected byte tf1OrdFac;

    @XmlElement(name = "Tf2Srv")
    protected byte tf2Srv;

    @XmlElement(name = "Tf3Itm")
    protected short tf3Itm;

    @XmlElement(name = "ItmDsc", required = true)
    protected String itmDsc;

    @XmlElement(name = "Tf3Cnp")
    protected short tf3Cnp;

    @XmlElement(name = "CptDsc", required = true)
    protected String cptDsc;

    @XmlElement(name = "Tf3TpoCal", required = true)
    protected String tf3TpoCal;

    @XmlElement(name = "Tf3Imp1")
    protected double tf3Imp1;

    /**
     * Obtiene el valor de la propiedad tf1OrdFac.
     *
     */
    public byte getTf1OrdFac() {
        return tf1OrdFac;
    }

    /**
     * Define el valor de la propiedad tf1OrdFac.
     *
     */
    public void setTf1OrdFac(byte value) {
        this.tf1OrdFac = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2Srv.
     *
     */
    public byte getTf2Srv() {
        return tf2Srv;
    }

    /**
     * Define el valor de la propiedad tf2Srv.
     *
     */
    public void setTf2Srv(byte value) {
        this.tf2Srv = value;
    }

    /**
     * Obtiene el valor de la propiedad tf3Itm.
     *
     */
    public short getTf3Itm() {
        return tf3Itm;
    }

    /**
     * Define el valor de la propiedad tf3Itm.
     *
     */
    public void setTf3Itm(short value) {
        this.tf3Itm = value;
    }

    /**
     * Obtiene el valor de la propiedad itmDsc.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getItmDsc() {
        return itmDsc;
    }

    /**
     * Define el valor de la propiedad itmDsc.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setItmDsc(String value) {
        this.itmDsc = value;
    }

    /**
     * Obtiene el valor de la propiedad tf3Cnp.
     *
     */
    public short getTf3Cnp() {
        return tf3Cnp;
    }

    /**
     * Define el valor de la propiedad tf3Cnp.
     *
     */
    public void setTf3Cnp(short value) {
        this.tf3Cnp = value;
    }

    /**
     * Obtiene el valor de la propiedad cptDsc.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getCptDsc() {
        return cptDsc;
    }

    /**
     * Define el valor de la propiedad cptDsc.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setCptDsc(String value) {
        this.cptDsc = value;
    }

    /**
     * Obtiene el valor de la propiedad tf3TpoCal.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getTf3TpoCal() {
        return tf3TpoCal;
    }

    /**
     * Define el valor de la propiedad tf3TpoCal.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setTf3TpoCal(String value) {
        this.tf3TpoCal = value;
    }

    /**
     * Obtiene el valor de la propiedad tf3Imp1.
     *
     */
    public double getTf3Imp1() {
        return tf3Imp1;
    }

    /**
     * Define el valor de la propiedad tf3Imp1.
     *
     */
    public void setTf3Imp1(double value) {
        this.tf3Imp1 = value;
    }
}
