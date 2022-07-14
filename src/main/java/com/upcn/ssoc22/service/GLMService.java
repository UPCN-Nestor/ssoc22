package com.upcn.ssoc22.service;

import com.upcn.ssoc22.service.exception.GLMException;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

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

    @Value("${upcn.glm-ws-action.insertar}")
    private String actionInsertar;

    @Value("${upcn.glm-ws-action.consultar}")
    private String actionConsultar;

    private static DatatypeFactory datatypeFactory;
    private static final Logger log = LoggerFactory.getLogger(GLMService.class);

    private static Jaxb2Marshaller marshaller;

    public Jaxb2Marshaller buildMarshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.upcn.glm..");
        return marshaller;
    }

    public GLMService() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        } catch (DatatypeConfigurationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        marshaller = buildMarshaller();

        setDefaultUri(wsUri);
        setMarshaller(marshaller);
        setUnmarshaller(marshaller);
    }

    public void simularError() throws GLMException {
        if (wsSimularError) throw new GLMException("Error simulado");
    }
}
