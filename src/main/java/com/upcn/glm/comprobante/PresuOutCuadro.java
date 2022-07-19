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
import javax.xml.bind.annotation.XmlType;

/**
 * <p>Clase Java para PresuOut.Cuadro complex type.
 *
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 *
 * <pre>
 * &lt;complexType name="PresuOut.Cuadro"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Tf2Srv" type="{http://www.w3.org/2001/XMLSchema}byte"/&gt;
 *         &lt;element name="Tf5LstCod" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="Tf5LstDias" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "PresuOut.Cuadro", propOrder = { "tf2Srv", "tf5LstCod", "tf5LstDias" })
public class PresuOutCuadro {

    @XmlElement(name = "Tf2Srv")
    protected byte tf2Srv;

    @XmlElement(name = "Tf5LstCod")
    protected short tf5LstCod;

    @XmlElement(name = "Tf5LstDias")
    protected short tf5LstDias;

    /**
     * Obtiene el valor de la propiedad tf2Srv.
     *
     */
    public byte getTf2Srv() {
        return tf2Srv;
    }

    /**
     * Define el valor de la propiedad tf2Srv.
     *
     */
    public void setTf2Srv(byte value) {
        this.tf2Srv = value;
    }

    /**
     * Obtiene el valor de la propiedad tf5LstCod.
     *
     */
    public short getTf5LstCod() {
        return tf5LstCod;
    }

    /**
     * Define el valor de la propiedad tf5LstCod.
     *
     */
    public void setTf5LstCod(short value) {
        this.tf5LstCod = value;
    }

    /**
     * Obtiene el valor de la propiedad tf5LstDias.
     *
     */
    public short getTf5LstDias() {
        return tf5LstDias;
    }

    /**
     * Define el valor de la propiedad tf5LstDias.
     *
     */
    public void setTf5LstDias(short value) {
        this.tf5LstDias = value;
    }
}
