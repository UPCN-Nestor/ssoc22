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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

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
 *         &lt;element name="Compextin" type="{http://tempuri.org/}CompExtIN"/&gt;
 *         &lt;element name="Compextout" type="{http://tempuri.org/}CalculoInternoOut"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "compextin", "compextout" })
@XmlRootElement(name = "WSComprobante.ACTUALIZACIONCALCULOEXTERNOResponse")
public class WSComprobanteACTUALIZACIONCALCULOEXTERNOResponse {

    @XmlElement(name = "Compextin", required = true)
    protected CompExtIN compextin;

    @XmlElement(name = "Compextout", required = true)
    protected CalculoInternoOut compextout;

    /**
     * Obtiene el valor de la propiedad compextin.
     *
     * @return
     *     possible object is
     *     {@link CompExtIN }
     *
     */
    public CompExtIN getCompextin() {
        return compextin;
    }

    /**
     * Define el valor de la propiedad compextin.
     *
     * @param value
     *     allowed object is
     *     {@link CompExtIN }
     *
     */
    public void setCompextin(CompExtIN value) {
        this.compextin = value;
    }

    /**
     * Obtiene el valor de la propiedad compextout.
     *
     * @return
     *     possible object is
     *     {@link CalculoInternoOut }
     *
     */
    public CalculoInternoOut getCompextout() {
        return compextout;
    }

    /**
     * Define el valor de la propiedad compextout.
     *
     * @param value
     *     allowed object is
     *     {@link CalculoInternoOut }
     *
     */
    public void setCompextout(CalculoInternoOut value) {
        this.compextout = value;
    }
}
