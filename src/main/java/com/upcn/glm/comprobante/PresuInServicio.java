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
 * <p>Clase Java para PresuIn.Servicio complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuIn.Servicio"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SrvCod" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Tf2Cns" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2CnsP" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2CnsFP" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2CnsV" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2CnsER" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2PotP" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2PotFP" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2PotV" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Tf2Mlt" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="CantCF" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(
    name = "PresuIn.Servicio",
    propOrder = { "srvCod", "tf2Cns", "tf2CnsP", "tf2CnsFP", "tf2CnsV", "tf2CnsER", "tf2PotP", "tf2PotFP", "tf2PotV", "tf2Mlt", "cantCF" }
)
public class PresuInServicio {

    @XmlElement(name = "SrvCod")
    protected byte srvCod;

    @XmlElement(name = "Tf2Cns")
    protected double tf2Cns;

    @XmlElement(name = "Tf2CnsP")
    protected double tf2CnsP;

    @XmlElement(name = "Tf2CnsFP")
    protected double tf2CnsFP;

    @XmlElement(name = "Tf2CnsV")
    protected double tf2CnsV;

    @XmlElement(name = "Tf2CnsER")
    protected double tf2CnsER;

    @XmlElement(name = "Tf2PotP")
    protected double tf2PotP;

    @XmlElement(name = "Tf2PotFP")
    protected double tf2PotFP;

    @XmlElement(name = "Tf2PotV")
    protected double tf2PotV;

    @XmlElement(name = "Tf2Mlt")
    protected double tf2Mlt;

    @XmlElement(name = "CantCF")
    protected byte cantCF;

    /**
     * Obtiene el valor de la propiedad srvCod.
     *
     */
    public byte getSrvCod() {
        return srvCod;
    }

    /**
     * Define el valor de la propiedad srvCod.
     *
     */
    public void setSrvCod(byte value) {
        this.srvCod = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2Cns.
     *
     */
    public double getTf2Cns() {
        return tf2Cns;
    }

    /**
     * Define el valor de la propiedad tf2Cns.
     *
     */
    public void setTf2Cns(double value) {
        this.tf2Cns = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2CnsP.
     *
     */
    public double getTf2CnsP() {
        return tf2CnsP;
    }

    /**
     * Define el valor de la propiedad tf2CnsP.
     *
     */
    public void setTf2CnsP(double value) {
        this.tf2CnsP = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2CnsFP.
     *
     */
    public double getTf2CnsFP() {
        return tf2CnsFP;
    }

    /**
     * Define el valor de la propiedad tf2CnsFP.
     *
     */
    public void setTf2CnsFP(double value) {
        this.tf2CnsFP = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2CnsV.
     *
     */
    public double getTf2CnsV() {
        return tf2CnsV;
    }

    /**
     * Define el valor de la propiedad tf2CnsV.
     *
     */
    public void setTf2CnsV(double value) {
        this.tf2CnsV = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2CnsER.
     *
     */
    public double getTf2CnsER() {
        return tf2CnsER;
    }

    /**
     * Define el valor de la propiedad tf2CnsER.
     *
     */
    public void setTf2CnsER(double value) {
        this.tf2CnsER = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2PotP.
     *
     */
    public double getTf2PotP() {
        return tf2PotP;
    }

    /**
     * Define el valor de la propiedad tf2PotP.
     *
     */
    public void setTf2PotP(double value) {
        this.tf2PotP = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2PotFP.
     *
     */
    public double getTf2PotFP() {
        return tf2PotFP;
    }

    /**
     * Define el valor de la propiedad tf2PotFP.
     *
     */
    public void setTf2PotFP(double value) {
        this.tf2PotFP = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2PotV.
     *
     */
    public double getTf2PotV() {
        return tf2PotV;
    }

    /**
     * Define el valor de la propiedad tf2PotV.
     *
     */
    public void setTf2PotV(double value) {
        this.tf2PotV = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2Mlt.
     *
     */
    public double getTf2Mlt() {
        return tf2Mlt;
    }

    /**
     * Define el valor de la propiedad tf2Mlt.
     *
     */
    public void setTf2Mlt(double value) {
        this.tf2Mlt = value;
    }

    /**
     * Obtiene el valor de la propiedad cantCF.
     *
     */
    public byte getCantCF() {
        return cantCF;
    }

    /**
     * Define el valor de la propiedad cantCF.
     *
     */
    public void setCantCF(byte value) {
        this.cantCF = value;
    }
}
