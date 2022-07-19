package com.upcn.ssoc22.service;

import com.upcn.glm.comprobante.*;
import com.upcn.glm.comprobante.CompExtIN.Items;
import com.upcn.ssoc22.domain.ItemPropio;
import com.upcn.ssoc22.service.exception.GLMException;
import java.time.ZonedDateTime;
import java.util.GregorianCalendar;
import java.util.List;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.client.core.SoapActionCallback;

@Service
public class GLMService extends WebServiceGatewaySupport {

    @Value("#{new Boolean('${upcn.glm-real}')}")
    private boolean wsGlmReal;

    @Value("#{new Boolean('${upcn.glm-simular-error}')}")
    private boolean wsSimularError;

    @Value("${upcn.glm-ws-user}")
    private String wsUser;

    @Value("${upcn.glm-ws-uri}")
    private String wsUri;

    @Value("${upcn.glm-wsdl-novedad}")
    private String wsdlNovedad;

    @Value("${upcn.glm-wsdl-comprobante}")
    private String wsdlComprobante;

    @Value("${upcn.glm-ws-action.insertar}")
    private String actionInsertar;

    @Value("${upcn.glm-ws-action.consultar}")
    private String actionConsultar;

    @Value("${upcn.glm-ws-action.actualizar}")
    private String actionActualizar;

    private static DatatypeFactory datatypeFactory;
    private static final Logger log = LoggerFactory.getLogger(GLMService.class);

    private static Jaxb2Marshaller marshaller;

    public Jaxb2Marshaller buildMarshallerNovedad() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.upcn.glm.novedad");
        return marshaller;
    }

    public Jaxb2Marshaller buildMarshallerComprobante() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.upcn.glm.comprobante");
        return marshaller;
    }

    public GLMService() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        } catch (DatatypeConfigurationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        marshaller = buildMarshallerNovedad();

        setDefaultUri(wsUri);
        setMarshaller(marshaller);
        setUnmarshaller(marshaller);
    }

    public void simularError() throws GLMException {
        if (wsSimularError) throw new GLMException("Error simulado");
    }

    public String actualizarFactura(int socio, int suministro, ZonedDateTime vencimiento, String observaciones, List<ItemPropio> items)
        throws GLMException {
        simularError();

        if (!wsGlmReal) {
            log.warn("GLM fake. No se factura.");
            return "GLM Fake";
        }

        setMarshaller(buildMarshallerComprobante());
        setUnmarshaller(buildMarshallerComprobante());

        WSComprobanteACTUALIZACIONCALCULOEXTERNO request = new WSComprobanteACTUALIZACIONCALCULOEXTERNO();

        CompExtIN compExtIN = new CompExtIN();
        compExtIN.setSucCod((byte) 1);
        compExtIN.setOpdCod("WEB");

        // *** MODIFICAR
        compExtIN.setCliCod(socio);
        compExtIN.setSumNro(suministro);
        compExtIN.setFactCls((short) 9999);
        GregorianCalendar gc = GregorianCalendar.from(vencimiento);
        compExtIN.setFactVto1(datatypeFactory.newXMLGregorianCalendar(gc));
        compExtIN.setFactOObs(observaciones);

        Items itemsParaAgregar = new Items();

        for (ItemPropio i : items) {
            CompExtINItem item = new CompExtINItem();
            item.setFac1Srv(i.getServicio().byteValue());
            item.setFac2Itm(i.getItem().shortValue());
            item.setFac2Imp1(i.getImporte().doubleValue());

            itemsParaAgregar.getItem().add(item);
        }

        compExtIN.setItems(itemsParaAgregar);

        // ***

        request.setCompextin(compExtIN);

        WSComprobanteACTUALIZACIONCALCULOEXTERNOResponse response = (WSComprobanteACTUALIZACIONCALCULOEXTERNOResponse) getWebServiceTemplate()
            .marshalSendAndReceive(wsdlComprobante, request, new SoapActionCallback(actionActualizar));

        if (response.getCompextout().getErrores().getError().size() > 0) {
            throw new GLMException(response.getCompextout().getErrores().getError().get(0).getErrDsc());
        }

        String resTipo = "" + response.getCompextout().getComprobantes().getComprobante().get(0).getFrm();
        String resLetra = "" + response.getCompextout().getComprobantes().getComprobante().get(0).getLet();
        String resPtoVta = "" + response.getCompextout().getComprobantes().getComprobante().get(0).getPto();
        String resNumero = "" + response.getCompextout().getComprobantes().getComprobante().get(0).getNro();

        return resTipo + "-" + resLetra + "-" + resPtoVta + "-" + resNumero;
    }
}
