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
 * <p>Clase Java para ReciboIn.Ente complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ReciboIn.Ente"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="EntCod" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="EntImp" type="{http://www.w3.org/2001/XMLSchema}double"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ReciboIn.Ente", propOrder = { "entCod", "entImp" })
public class ReciboInEnte {

    @XmlElement(name = "EntCod", required = true)
    protected String entCod;

    @XmlElement(name = "EntImp")
    protected double entImp;

    /**
     * Obtiene el valor de la propiedad entCod.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getEntCod() {
        return entCod;
    }

    /**
     * Define el valor de la propiedad entCod.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setEntCod(String value) {
        this.entCod = value;
    }

    /**
     * Obtiene el valor de la propiedad entImp.
     *
     */
    public double getEntImp() {
        return entImp;
    }

    /**
     * Define el valor de la propiedad entImp.
     *
     */
    public void setEntImp(double value) {
        this.entImp = value;
    }
}
