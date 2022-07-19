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
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * <p>Clase Java para CompExtIN complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="CompExtIN"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="SucCod" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="OpdCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="CliCod" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="SumNro" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="FactCls" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="FactVto1" type="{http://www.w3.org/2001/XMLSchema}date"/&gt;
 *         &lt;element name="FactOObs" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="Items"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Item" type="{http://tempuri.org/}CompExtIN.Item" maxOccurs="unbounded" minOccurs="0"/&gt;
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
@XmlType(name = "CompExtIN", propOrder = { "sucCod", "opdCod", "cliCod", "sumNro", "factCls", "factVto1", "factOObs", "items" })
public class CompExtIN {

    @XmlElement(name = "SucCod")
    protected byte sucCod;

    @XmlElement(name = "OpdCod", required = true)
    protected String opdCod;

    @XmlElement(name = "CliCod")
    protected int cliCod;

    @XmlElement(name = "SumNro")
    protected int sumNro;

    @XmlElement(name = "FactCls")
    protected short factCls;

    @XmlElement(name = "FactVto1", required = true, nillable = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar factVto1;

    @XmlElement(name = "FactOObs", required = true)
    protected String factOObs;

    @XmlElement(name = "Items", required = true)
    protected CompExtIN.Items items;

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
     * Obtiene el valor de la propiedad factCls.
     *
     */
    public short getFactCls() {
        return factCls;
    }

    /**
     * Define el valor de la propiedad factCls.
     *
     */
    public void setFactCls(short value) {
        this.factCls = value;
    }

    /**
     * Obtiene el valor de la propiedad factVto1.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getFactVto1() {
        return factVto1;
    }

    /**
     * Define el valor de la propiedad factVto1.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setFactVto1(XMLGregorianCalendar value) {
        this.factVto1 = value;
    }

    /**
     * Obtiene el valor de la propiedad factOObs.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getFactOObs() {
        return factOObs;
    }

    /**
     * Define el valor de la propiedad factOObs.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setFactOObs(String value) {
        this.factOObs = value;
    }

    /**
     * Obtiene el valor de la propiedad items.
     *
     * @return
     *     possible object is
     *     {@link CompExtIN.Items }
     *
     */
    public CompExtIN.Items getItems() {
        return items;
    }

    /**
     * Define el valor de la propiedad items.
     *
     * @param value
     *     allowed object is
     *     {@link CompExtIN.Items }
     *
     */
    public void setItems(CompExtIN.Items value) {
        this.items = value;
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
     *         &lt;element name="Item" type="{http://tempuri.org/}CompExtIN.Item" maxOccurs="unbounded" minOccurs="0"/&gt;
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
        protected List<CompExtINItem> item;

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
         * {@link CompExtINItem }
         *
         *
         */
        public List<CompExtINItem> getItem() {
            if (item == null) {
                item = new ArrayList<CompExtINItem>();
            }
            return this.item;
        }
    }
}
