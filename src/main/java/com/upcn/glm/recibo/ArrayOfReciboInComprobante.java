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
 * <p>Clase Java para ArrayOfReciboIn.Comprobante complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ArrayOfReciboIn.Comprobante"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ReciboIn.Comprobante" type="{http://tempuri.org/}ReciboIn.Comprobante" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfReciboIn.Comprobante", propOrder = { "reciboInComprobante" })
public class ArrayOfReciboInComprobante {

    @XmlElement(name = "ReciboIn.Comprobante")
    protected List<ReciboInComprobante> reciboInComprobante;

    /**
     * Gets the value of the reciboInComprobante property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the reciboInComprobante property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getReciboInComprobante().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReciboInComprobante }
     *
     *
     */
    public List<ReciboInComprobante> getReciboInComprobante() {
        if (reciboInComprobante == null) {
            reciboInComprobante = new ArrayList<ReciboInComprobante>();
        }
        return this.reciboInComprobante;
    }
}
