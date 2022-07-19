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
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * <p>Clase Java para PresuOut.Servicio complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuOut.Servicio"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Tf2Srv" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Tf2Ctg" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="Tf2EttCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Tf2FecAnt" type="{http://www.w3.org/2001/XMLSchema}date"/&gt;
 *         &lt;element name="Tf2FecLec" type="{http://www.w3.org/2001/XMLSchema}date"/&gt;
 *         &lt;element name="Tf2TMCns" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PresuOut.Servicio", propOrder = { "tf2Srv", "tf2Ctg", "tf2EttCod", "tf2FecAnt", "tf2FecLec", "tf2TMCns" })
public class PresuOutServicio {

    @XmlElement(name = "Tf2Srv")
    protected byte tf2Srv;

    @XmlElement(name = "Tf2Ctg")
    protected short tf2Ctg;

    @XmlElement(name = "Tf2EttCod", required = true)
    protected String tf2EttCod;

    @XmlElement(name = "Tf2FecAnt", required = true, nillable = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar tf2FecAnt;

    @XmlElement(name = "Tf2FecLec", required = true, nillable = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar tf2FecLec;

    @XmlElement(name = "Tf2TMCns")
    protected double tf2TMCns;

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
     * Obtiene el valor de la propiedad tf2Ctg.
     *
     */
    public short getTf2Ctg() {
        return tf2Ctg;
    }

    /**
     * Define el valor de la propiedad tf2Ctg.
     *
     */
    public void setTf2Ctg(short value) {
        this.tf2Ctg = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2EttCod.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getTf2EttCod() {
        return tf2EttCod;
    }

    /**
     * Define el valor de la propiedad tf2EttCod.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setTf2EttCod(String value) {
        this.tf2EttCod = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2FecAnt.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getTf2FecAnt() {
        return tf2FecAnt;
    }

    /**
     * Define el valor de la propiedad tf2FecAnt.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setTf2FecAnt(XMLGregorianCalendar value) {
        this.tf2FecAnt = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2FecLec.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getTf2FecLec() {
        return tf2FecLec;
    }

    /**
     * Define el valor de la propiedad tf2FecLec.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setTf2FecLec(XMLGregorianCalendar value) {
        this.tf2FecLec = value;
    }

    /**
     * Obtiene el valor de la propiedad tf2TMCns.
     *
     */
    public double getTf2TMCns() {
        return tf2TMCns;
    }

    /**
     * Define el valor de la propiedad tf2TMCns.
     *
     */
    public void setTf2TMCns(double value) {
        this.tf2TMCns = value;
    }
}
