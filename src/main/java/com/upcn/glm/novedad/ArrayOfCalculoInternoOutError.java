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
 * <p>Clase Java para ArrayOfCalculoInternoOut.Error complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="ArrayOfCalculoInternoOut.Error"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="CalculoInternoOut.Error" type="{http://tempuri.org/}CalculoInternoOut.Error" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ArrayOfCalculoInternoOut.Error", propOrder = { "calculoInternoOutError" })
public class ArrayOfCalculoInternoOutError {

    @XmlElement(name = "CalculoInternoOut.Error")
    protected List<CalculoInternoOutError> calculoInternoOutError;

    /**
     * Gets the value of the calculoInternoOutError property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the calculoInternoOutError property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCalculoInternoOutError().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CalculoInternoOutError }
     *
     *
     */
    public List<CalculoInternoOutError> getCalculoInternoOutError() {
        if (calculoInternoOutError == null) {
            calculoInternoOutError = new ArrayList<CalculoInternoOutError>();
        }
        return this.calculoInternoOutError;
    }
}
