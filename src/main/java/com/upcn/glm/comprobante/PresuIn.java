//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.14 a las 10:56:50 AM ART
//

package com.upcn.glm.comprobante;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para PresuIn complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuIn"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SucCod" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="OpdCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="CliCod" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="SumNro" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="ImporteTotal" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="Servicios"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Servicio" type="{http://tempuri.org/}PresuIn.Servicio" maxOccurs="unbounded" minOccurs="0"/&gt;
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
@XmlType(name = "PresuIn", propOrder = { "sucCod", "opdCod", "cliCod", "sumNro", "importeTotal", "servicios" })
public class PresuIn {

    @XmlElement(name = "SucCod")
    protected byte sucCod;

    @XmlElement(name = "OpdCod", required = true)
    protected String opdCod;

    @XmlElement(name = "CliCod")
    protected int cliCod;

    @XmlElement(name = "SumNro")
    protected int sumNro;

    @XmlElement(name = "ImporteTotal")
    protected double importeTotal;

    @XmlElement(name = "Servicios", required = true)
    protected PresuIn.Servicios servicios;

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
     * Obtiene el valor de la propiedad cliCod.
     *
     */
    public int getCliCod() {
        return cliCod;
    }

    /**
     * Define el valor de la propiedad cliCod.
     *
     */
    public void setCliCod(int value) {
        this.cliCod = value;
    }

    /**
     * Obtiene el valor de la propiedad sumNro.
     *
     */
    public int getSumNro() {
        return sumNro;
    }

    /**
     * Define el valor de la propiedad sumNro.
     *
     */
    public void setSumNro(int value) {
        this.sumNro = value;
    }

    /**
     * Obtiene el valor de la propiedad importeTotal.
     *
     */
    public double getImporteTotal() {
        return importeTotal;
    }

    /**
     * Define el valor de la propiedad importeTotal.
     *
     */
    public void setImporteTotal(double value) {
        this.importeTotal = value;
    }

    /**
     * Obtiene el valor de la propiedad servicios.
     *
     * @return
     *     possible object is
     *     {@link PresuIn.Servicios }
     *
     */
    public PresuIn.Servicios getServicios() {
        return servicios;
    }

    /**
     * Define el valor de la propiedad servicios.
     *
     * @param value
     *     allowed object is
     *     {@link PresuIn.Servicios }
     *
     */
    public void setServicios(PresuIn.Servicios value) {
        this.servicios = value;
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
     *         &lt;element name="Servicio" type="{http://tempuri.org/}PresuIn.Servicio" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "servicio" })
    public static class Servicios {

        @XmlElement(name = "Servicio")
        protected List<PresuInServicio> servicio;

        /**
         * Gets the value of the servicio property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the servicio property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getServicio().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link PresuInServicio }
         *
         *
         */
        public List<PresuInServicio> getServicio() {
            if (servicio == null) {
                servicio = new ArrayList<PresuInServicio>();
            }
            return this.servicio;
        }
    }
}
