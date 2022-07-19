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
 * <p>Clase Java para ReciboOut complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ReciboOut"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ReciboNro" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="Errores"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="Error" type="{http://tempuri.org/}ReciboOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
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
@XmlType(name = "ReciboOut", propOrder = { "reciboNro", "errores" })
public class ReciboOut {

    @XmlElement(name = "ReciboNro")
    protected int reciboNro;

    @XmlElement(name = "Errores", required = true)
    protected ReciboOut.Errores errores;

    /**
     * Obtiene el valor de la propiedad reciboNro.
     *
     */
    public int getReciboNro() {
        return reciboNro;
    }

    /**
     * Define el valor de la propiedad reciboNro.
     *
     */
    public void setReciboNro(int value) {
        this.reciboNro = value;
    }

    /**
     * Obtiene el valor de la propiedad errores.
     *
     * @return
     *     possible object is
     *     {@link ReciboOut.Errores }
     *
     */
    public ReciboOut.Errores getErrores() {
        return errores;
    }

    /**
     * Define el valor de la propiedad errores.
     *
     * @param value
     *     allowed object is
     *     {@link ReciboOut.Errores }
     *
     */
    public void setErrores(ReciboOut.Errores value) {
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
     *         &lt;element name="Error" type="{http://tempuri.org/}ReciboOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
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
        protected List<ReciboOutError> error;

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
         * {@link ReciboOutError }
         *
         *
         */
        public List<ReciboOutError> getError() {
            if (error == null) {
                error = new ArrayList<ReciboOutError>();
            }
            return this.error;
        }
    }
}
