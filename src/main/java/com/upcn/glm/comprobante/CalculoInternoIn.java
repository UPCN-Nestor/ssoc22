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
 * <p>Clase Java para CalculoInternoIn complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="CalculoInternoIn"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SucCod" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="OpdCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Lote" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="ImpLot" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="ImpDif" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="ImpDifNoEner" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CalculoInternoIn", propOrder = { "sucCod", "opdCod", "lote", "impLot", "impDif", "impDifNoEner" })
public class CalculoInternoIn {

    @XmlElement(name = "SucCod")
    protected byte sucCod;

    @XmlElement(name = "OpdCod", required = true)
    protected String opdCod;

    @XmlElement(name = "Lote")
    protected int lote;

    @XmlElement(name = "ImpLot")
    protected double impLot;

    @XmlElement(name = "ImpDif")
    protected double impDif;

    @XmlElement(name = "ImpDifNoEner")
    protected double impDifNoEner;

    /**
     * Obtiene el valor de la propiedad sucCod.
     *
     */
    public byte getSucCod() {
        return sucCod;
    }

    /**
     * Define el valor de la propiedad sucCod.
     *
     */
    public void setSucCod(byte value) {
        this.sucCod = value;
    }

    /**
     * Obtiene el valor de la propiedad opdCod.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getOpdCod() {
        return opdCod;
    }

    /**
     * Define el valor de la propiedad opdCod.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setOpdCod(String value) {
        this.opdCod = value;
    }

    /**
     * Obtiene el valor de la propiedad lote.
     *
     */
    public int getLote() {
        return lote;
    }

    /**
     * Define el valor de la propiedad lote.
     *
     */
    public void setLote(int value) {
        this.lote = value;
    }

    /**
     * Obtiene el valor de la propiedad impLot.
     *
     */
    public double getImpLot() {
        return impLot;
    }

    /**
     * Define el valor de la propiedad impLot.
     *
     */
    public void setImpLot(double value) {
        this.impLot = value;
    }

    /**
     * Obtiene el valor de la propiedad impDif.
     *
     */
    public double getImpDif() {
        return impDif;
    }

    /**
     * Define el valor de la propiedad impDif.
     *
     */
    public void setImpDif(double value) {
        this.impDif = value;
    }

    /**
     * Obtiene el valor de la propiedad impDifNoEner.
     *
     */
    public double getImpDifNoEner() {
        return impDifNoEner;
    }

    /**
     * Define el valor de la propiedad impDifNoEner.
     *
     */
    public void setImpDifNoEner(double value) {
        this.impDifNoEner = value;
    }
}
