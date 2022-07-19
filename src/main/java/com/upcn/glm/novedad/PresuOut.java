//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.19 a las 08:12:17 AM ART
//

package com.upcn.glm.novedad;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * <p>Clase Java para PresuOut complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuOut"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Lote" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="Ano" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="Mes" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="FechaCal" type="{http://www.w3.org/2001/XMLSchema}date"/&gt;
 *         &lt;element name="ImpLot" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="ImpEner" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="ImpNoEner" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *         &lt;element name="CuadrosTarifarios"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Cuadro" type="{http://tempuri.org/}PresuOut.Cuadro" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="Servicios"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Servicio" type="{http://tempuri.org/}PresuOut.Servicio" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="Items"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Item" type="{http://tempuri.org/}PresuOut.Item" maxOccurs="unbounded" minOccurs="0"/&gt;
 *                 &lt;/sequence&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="Errores"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Error" type="{http://tempuri.org/}PresuOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
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
@XmlType(
    name = "PresuOut",
    propOrder = { "lote", "ano", "mes", "fechaCal", "impLot", "impEner", "impNoEner", "cuadrosTarifarios", "servicios", "items", "errores" }
)
public class PresuOut {

    @XmlElement(name = "Lote")
    protected int lote;

    @XmlElement(name = "Ano")
    protected short ano;

    @XmlElement(name = "Mes")
    protected byte mes;

    @XmlElement(name = "FechaCal", required = true, nillable = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar fechaCal;

    @XmlElement(name = "ImpLot")
    protected double impLot;

    @XmlElement(name = "ImpEner")
    protected double impEner;

    @XmlElement(name = "ImpNoEner")
    protected double impNoEner;

    @XmlElement(name = "CuadrosTarifarios", required = true)
    protected PresuOut.CuadrosTarifarios cuadrosTarifarios;

    @XmlElement(name = "Servicios", required = true)
    protected PresuOut.Servicios servicios;

    @XmlElement(name = "Items", required = true)
    protected PresuOut.Items items;

    @XmlElement(name = "Errores", required = true)
    protected PresuOut.Errores errores;

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
     * Obtiene el valor de la propiedad ano.
     *
     */
    public short getAno() {
        return ano;
    }

    /**
     * Define el valor de la propiedad ano.
     *
     */
    public void setAno(short value) {
        this.ano = value;
    }

    /**
     * Obtiene el valor de la propiedad mes.
     *
     */
    public byte getMes() {
        return mes;
    }

    /**
     * Define el valor de la propiedad mes.
     *
     */
    public void setMes(byte value) {
        this.mes = value;
    }

    /**
     * Obtiene el valor de la propiedad fechaCal.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getFechaCal() {
        return fechaCal;
    }

    /**
     * Define el valor de la propiedad fechaCal.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setFechaCal(XMLGregorianCalendar value) {
        this.fechaCal = value;
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
     * Obtiene el valor de la propiedad impEner.
     *
     */
    public double getImpEner() {
        return impEner;
    }

    /**
     * Define el valor de la propiedad impEner.
     *
     */
    public void setImpEner(double value) {
        this.impEner = value;
    }

    /**
     * Obtiene el valor de la propiedad impNoEner.
     *
     */
    public double getImpNoEner() {
        return impNoEner;
    }

    /**
     * Define el valor de la propiedad impNoEner.
     *
     */
    public void setImpNoEner(double value) {
        this.impNoEner = value;
    }

    /**
     * Obtiene el valor de la propiedad cuadrosTarifarios.
     *
     * @return
     *     possible object is
     *     {@link PresuOut.CuadrosTarifarios }
     *
     */
    public PresuOut.CuadrosTarifarios getCuadrosTarifarios() {
        return cuadrosTarifarios;
    }

    /**
     * Define el valor de la propiedad cuadrosTarifarios.
     *
     * @param value
     *     allowed object is
     *     {@link PresuOut.CuadrosTarifarios }
     *
     */
    public void setCuadrosTarifarios(PresuOut.CuadrosTarifarios value) {
        this.cuadrosTarifarios = value;
    }

    /**
     * Obtiene el valor de la propiedad servicios.
     *
     * @return
     *     possible object is
     *     {@link PresuOut.Servicios }
     *
     */
    public PresuOut.Servicios getServicios() {
        return servicios;
    }

    /**
     * Define el valor de la propiedad servicios.
     *
     * @param value
     *     allowed object is
     *     {@link PresuOut.Servicios }
     *
     */
    public void setServicios(PresuOut.Servicios value) {
        this.servicios = value;
    }

    /**
     * Obtiene el valor de la propiedad items.
     *
     * @return
     *     possible object is
     *     {@link PresuOut.Items }
     *
     */
    public PresuOut.Items getItems() {
        return items;
    }

    /**
     * Define el valor de la propiedad items.
     *
     * @param value
     *     allowed object is
     *     {@link PresuOut.Items }
     *
     */
    public void setItems(PresuOut.Items value) {
        this.items = value;
    }

    /**
     * Obtiene el valor de la propiedad errores.
     *
     * @return
     *     possible object is
     *     {@link PresuOut.Errores }
     *
     */
    public PresuOut.Errores getErrores() {
        return errores;
    }

    /**
     * Define el valor de la propiedad errores.
     *
     * @param value
     *     allowed object is
     *     {@link PresuOut.Errores }
     *
     */
    public void setErrores(PresuOut.Errores value) {
        this.errores = value;
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
     *         &lt;element name="Cuadro" type="{http://tempuri.org/}PresuOut.Cuadro" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "cuadro" })
    public static class CuadrosTarifarios {

        @XmlElement(name = "Cuadro")
        protected List<PresuOutCuadro> cuadro;

        /**
         * Gets the value of the cuadro property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the cuadro property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getCuadro().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link PresuOutCuadro }
         *
         *
         */
        public List<PresuOutCuadro> getCuadro() {
            if (cuadro == null) {
                cuadro = new ArrayList<PresuOutCuadro>();
            }
            return this.cuadro;
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
     *         &lt;element name="Error" type="{http://tempuri.org/}PresuOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "error" })
    public static class Errores {

        @XmlElement(name = "Error")
        protected List<PresuOutError> error;

        /**
         * Gets the value of the error property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the error property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getError().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link PresuOutError }
         *
         *
         */
        public List<PresuOutError> getError() {
            if (error == null) {
                error = new ArrayList<PresuOutError>();
            }
            return this.error;
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
     *         &lt;element name="Item" type="{http://tempuri.org/}PresuOut.Item" maxOccurs="unbounded" minOccurs="0"/&gt;
     *       &lt;/sequence&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     *
     *
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = { "item" })
    public static class Items {

        @XmlElement(name = "Item")
        protected List<PresuOutItem> item;

        /**
         * Gets the value of the item property.
         *
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the item property.
         *
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getItem().add(newItem);
         * </pre>
         *
         *
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link PresuOutItem }
         *
         *
         */
        public List<PresuOutItem> getItem() {
            if (item == null) {
                item = new ArrayList<PresuOutItem>();
            }
            return this.item;
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
     *         &lt;element name="Servicio" type="{http://tempuri.org/}PresuOut.Servicio" maxOccurs="unbounded" minOccurs="0"/&gt;
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
        protected List<PresuOutServicio> servicio;

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
         * {@link PresuOutServicio }
         *
         *
         */
        public List<PresuOutServicio> getServicio() {
            if (servicio == null) {
                servicio = new ArrayList<PresuOutServicio>();
            }
            return this.servicio;
        }
    }
}
