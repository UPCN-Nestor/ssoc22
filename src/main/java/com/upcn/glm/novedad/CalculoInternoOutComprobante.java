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
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * <p>Clase Java para CalculoInternoOut.Comprobante complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="CalculoInternoOut.Comprobante"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Cli" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="Sum" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="Fec" type="{http://www.w3.org/2001/XMLSchema}date"/&gt;
 *         &lt;element name="Frm" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Let" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Pto" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="Nro" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="Imp" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CalculoInternoOut.Comprobante", propOrder = { "cli", "sum", "fec", "frm", "let", "pto", "nro", "imp" })
public class CalculoInternoOutComprobante {

    @XmlElement(name = "Cli")
    protected int cli;

    @XmlElement(name = "Sum")
    protected int sum;

    @XmlElement(name = "Fec", required = true, nillable = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar fec;

    @XmlElement(name = "Frm")
    protected byte frm;

    @XmlElement(name = "Let", required = true)
    protected String let;

    @XmlElement(name = "Pto")
    protected short pto;

    @XmlElement(name = "Nro")
    protected int nro;

    @XmlElement(name = "Imp")
    protected double imp;

    /**
     * Obtiene el valor de la propiedad cli.
     *
     */
    public int getCli() {
        return cli;
    }

    /**
     * Define el valor de la propiedad cli.
     *
     */
    public void setCli(int value) {
        this.cli = value;
    }

    /**
     * Obtiene el valor de la propiedad sum.
     *
     */
    public int getSum() {
        return sum;
    }

    /**
     * Define el valor de la propiedad sum.
     *
     */
    public void setSum(int value) {
        this.sum = value;
    }

    /**
     * Obtiene el valor de la propiedad fec.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getFec() {
        return fec;
    }

    /**
     * Define el valor de la propiedad fec.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setFec(XMLGregorianCalendar value) {
        this.fec = value;
    }

    /**
     * Obtiene el valor de la propiedad frm.
     *
     */
    public byte getFrm() {
        return frm;
    }

    /**
     * Define el valor de la propiedad frm.
     *
     */
    public void setFrm(byte value) {
        this.frm = value;
    }

    /**
     * Obtiene el valor de la propiedad let.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getLet() {
        return let;
    }

    /**
     * Define el valor de la propiedad let.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setLet(String value) {
        this.let = value;
    }

    /**
     * Obtiene el valor de la propiedad pto.
     *
     */
    public short getPto() {
        return pto;
    }

    /**
     * Define el valor de la propiedad pto.
     *
     */
    public void setPto(short value) {
        this.pto = value;
    }

    /**
     * Obtiene el valor de la propiedad nro.
     *
     */
    public int getNro() {
        return nro;
    }

    /**
     * Define el valor de la propiedad nro.
     *
     */
    public void setNro(int value) {
        this.nro = value;
    }

    /**
     * Obtiene el valor de la propiedad imp.
     *
     */
    public double getImp() {
        return imp;
    }

    /**
     * Define el valor de la propiedad imp.
     *
     */
    public void setImp(double value) {
        this.imp = value;
    }
}
