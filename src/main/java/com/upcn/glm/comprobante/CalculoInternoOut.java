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
 * <p>Clase Java para CalculoInternoOut complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="CalculoInternoOut"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Comprobantes"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Comprobante" type="{http://tempuri.org/}CalculoInternoOut.Comprobante" maxOccurs="unbounded" minOccurs="0"/&gt;
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
 *                   &lt;element name="Error" type="{http://tempuri.org/}CalculoInternoOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
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
@XmlType(name = "CalculoInternoOut", propOrder = { "comprobantes", "errores" })
public class CalculoInternoOut {

    @XmlElement(name = "Comprobantes", required = true)
    protected CalculoInternoOut.Comprobantes comprobantes;

    @XmlElement(name = "Errores", required = true)
    protected CalculoInternoOut.Errores errores;

    /**
     * Obtiene el valor de la propiedad comprobantes.
     *
     * @return
     *     possible object is
     *     {@link CalculoInternoOut.Comprobantes }
     *
     */
    public CalculoInternoOut.Comprobantes getComprobantes() {
        return comprobantes;
    }

    /**
     * Define el valor de la propiedad comprobantes.
     *
     * @param value
     *     allowed object is
     *     {@link CalculoInternoOut.Comprobantes }
     *
     */
    public void setComprobantes(CalculoInternoOut.Comprobantes value) {
        this.comprobantes = value;
    }

    /**
     * Obtiene el valor de la propiedad errores.
     *
     * @return
     *     possible object is
     *     {@link CalculoInternoOut.Errores }
     *
     */
    public CalculoInternoOut.Errores getErrores() {
        return errores;
    }

    /**
     * Define el valor de la propiedad errores.
     *
     * @param value
     *     allowed object is
     *     {@link CalculoInternoOut.Errores }
     *
     */
    public void setErrores(CalculoInternoOut.Errores value) {
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
     *         &lt;element name="Comprobante" type="{http://tempuri.org/}CalculoInternoOut.Comprobante" maxOccurs="unbounded" minOccurs="0"/&gt;
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
        protected List<CalculoInternoOutComprobante> comprobante;

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
         * {@link CalculoInternoOutComprobante }
         *
         *
         */
        public List<CalculoInternoOutComprobante> getComprobante() {
            if (comprobante == null) {
                comprobante = new ArrayList<CalculoInternoOutComprobante>();
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
     *         &lt;element name="Error" type="{http://tempuri.org/}CalculoInternoOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
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
        protected List<CalculoInternoOutError> error;

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
         * {@link CalculoInternoOutError }
         *
         *
         */
        public List<CalculoInternoOutError> getError() {
            if (error == null) {
                error = new ArrayList<CalculoInternoOutError>();
            }
            return this.error;
        }
    }
}
