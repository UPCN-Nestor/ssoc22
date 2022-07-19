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
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para ArrayOfCompExtIN.Item complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ArrayOfCompExtIN.Item"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CompExtIN.Item" type="{http://tempuri.org/}CompExtIN.Item" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfCompExtIN.Item", propOrder = { "compExtINItem" })
public class ArrayOfCompExtINItem {

    @XmlElement(name = "CompExtIN.Item")
    protected List<CompExtINItem> compExtINItem;

    /**
     * Gets the value of the compExtINItem property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the compExtINItem property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCompExtINItem().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CompExtINItem }
     *
     *
     */
    public List<CompExtINItem> getCompExtINItem() {
        if (compExtINItem == null) {
            compExtINItem = new ArrayList<CompExtINItem>();
        }
        return this.compExtINItem;
    }
}
