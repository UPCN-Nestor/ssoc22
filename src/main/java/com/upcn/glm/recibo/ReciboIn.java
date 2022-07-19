//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.14 a las 07:43:27 AM ART
//

package com.upcn.glm.recibo;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para ReciboIn complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ReciboIn"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SucCod" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="OpdCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Comprobantes"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Comprobante" type="{http://tempuri.org/}ReciboIn.Comprobante" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="Entes"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Ente" type="{http://tempuri.org/}ReciboIn.Ente" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReciboIn", propOrder = { "sucCod", "opdCod", "comprobantes", "entes" })
public class ReciboIn {

    @XmlElement(name = "SucCod")
    protected byte sucCod;

    @XmlElement(name = "OpdCod", required = true)
    protected String opdCod;

    @XmlElement(name = "Comprobantes", required = true)
    protected ReciboIn.Comprobantes comprobantes;

    @XmlElement(name = "Entes", required = true)
    protected ReciboIn.Entes entes;

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
     * Obtiene el valor de la propiedad comprobantes.
     *
     * @return
     *     possible object is
     *     {@link ReciboIn.Comprobantes }
     *
     */
    public ReciboIn.Comprobantes getComprobantes() {
        return comprobantes;
    }

    /**
     * Define el valor de la propiedad comprobantes.
     *
     * @param value
     *     allowed object is
     *     {@link ReciboIn.Comprobantes }
     *
     */
    public void setComprobantes(ReciboIn.Comprobantes value) {
        this.comprobantes = value;
    }

    /**
     * Obtiene el valor de la propiedad entes.
     *
     * @return
     *     possible object is
     *     {@link ReciboIn.Entes }
     *
     */
    public ReciboIn.Entes getEntes() {
        return entes;
    }

    /**
     * Define el valor de la propiedad entes.
     *
     * @param value
     *     allowed object is
     *     {@link ReciboIn.Entes }
     *
     */
    public void setEntes(ReciboIn.Entes value) {
        this.entes = value;
    }

    /**
     * <p>Clase Java para anonymous complex type.
     *
     * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
     *
     * <pre>
     * &lt;complexType&gt;
     *   &lt;complexContent&gt;
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *       &lt;sequence&gt;
     *         &lt;element name="Comprobante" type="{http://tempuri.org/}ReciboIn.Comprobante" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "comprobante" })
    public static class Comprobantes {

        @XmlElement(name = "Comprobante")
        protected List<ReciboInComprobante> comprobante;

        /**
         * Gets the value of the comprobante property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the comprobante property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getComprobante().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link ReciboInComprobante }
         *
         *
         */
        public List<ReciboInComprobante> getComprobante() {
            if (comprobante == null) {
                comprobante = new ArrayList<ReciboInComprobante>();
            }
            return this.comprobante;
        }
    }

    /**
     * <p>Clase Java para anonymous complex type.
     *
     * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
     *
     * <pre>
     * &lt;complexType&gt;
     *   &lt;complexContent&gt;
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *       &lt;sequence&gt;
     *         &lt;element name="Ente" type="{http://tempuri.org/}ReciboIn.Ente" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "ente" })
    public static class Entes {

        @XmlElement(name = "Ente")
        protected List<ReciboInEnte> ente;

        /**
         * Gets the value of the ente property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the ente property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getEnte().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link ReciboInEnte }
         *
         *
         */
        public List<ReciboInEnte> getEnte() {
            if (ente == null) {
                ente = new ArrayList<ReciboInEnte>();
            }
            return this.ente;
        }
    }
}
