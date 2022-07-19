//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.3.0
// Visite <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a>
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen.
// Generado el: 2022.07.14 a las 07:43:27 AM ART
//

package com.upcn.glm.recibo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para ReciboOut.Error complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ReciboOut.Error"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ErrDsc" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReciboOut.Error", propOrder = { "errDsc" })
public class ReciboOutError {

    @XmlElement(name = "ErrDsc", required = true)
    protected String errDsc;

    /**
     * Obtiene el valor de la propiedad errDsc.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getErrDsc() {
        return errDsc;
    }

    /**
     * Define el valor de la propiedad errDsc.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setErrDsc(String value) {
        this.errDsc = value;
    }
}
