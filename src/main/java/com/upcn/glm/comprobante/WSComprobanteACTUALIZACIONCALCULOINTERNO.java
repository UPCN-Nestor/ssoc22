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
 *         &lt;element name="Calculointernoin" type="{http://tempuri.org/}CalculoInternoIn"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "calculointernoin" })
@XmlRootElement(name = "WSComprobante.ACTUALIZACIONCALCULOINTERNO")
public class WSComprobanteACTUALIZACIONCALCULOINTERNO {

    @XmlElement(name = "Calculointernoin", required = true)
    protected CalculoInternoIn calculointernoin;

    /**
     * Obtiene el valor de la propiedad calculointernoin.
     *
     * @return
     *     possible object is
     *     {@link CalculoInternoIn }
     *
     */
    public CalculoInternoIn getCalculointernoin() {
        return calculointernoin;
    }

    /**
     * Define el valor de la propiedad calculointernoin.
     *
     * @param value
     *     allowed object is
     *     {@link CalculoInternoIn }
     *
     */
    public void setCalculointernoin(CalculoInternoIn value) {
        this.calculointernoin = value;
    }
}
