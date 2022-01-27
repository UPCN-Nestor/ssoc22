import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('SolicitudPrestacion e2e test', () => {
  const solicitudPrestacionPageUrl = '/solicitud-prestacion';
  const solicitudPrestacionPageUrlPattern = new RegExp('/solicitud-prestacion(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const solicitudPrestacionSample = {};

  let solicitudPrestacion: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/solicitud-prestacions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/solicitud-prestacions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/solicitud-prestacions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (solicitudPrestacion) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/solicitud-prestacions/${solicitudPrestacion.id}`,
      }).then(() => {
        solicitudPrestacion = undefined;
      });
    }
  });

  it('SolicitudPrestacions menu should load SolicitudPrestacions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('solicitud-prestacion');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SolicitudPrestacion').should('exist');
    cy.url().should('match', solicitudPrestacionPageUrlPattern);
  });

  describe('SolicitudPrestacion page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(solicitudPrestacionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SolicitudPrestacion page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/solicitud-prestacion/new$'));
        cy.getEntityCreateUpdateHeading('SolicitudPrestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', solicitudPrestacionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/solicitud-prestacions',
          body: solicitudPrestacionSample,
        }).then(({ body }) => {
          solicitudPrestacion = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/solicitud-prestacions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [solicitudPrestacion],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(solicitudPrestacionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SolicitudPrestacion page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('solicitudPrestacion');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', solicitudPrestacionPageUrlPattern);
      });

      it('edit button click should load edit SolicitudPrestacion page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SolicitudPrestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', solicitudPrestacionPageUrlPattern);
      });

      it('last delete button click should delete instance of SolicitudPrestacion', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('solicitudPrestacion').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', solicitudPrestacionPageUrlPattern);

        solicitudPrestacion = undefined;
      });
    });
  });

  describe('new SolicitudPrestacion page', () => {
    beforeEach(() => {
      cy.visit(`${solicitudPrestacionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SolicitudPrestacion');
    });

    it('should create an instance of SolicitudPrestacion', () => {
      cy.get(`[data-cy="tipo"]`).type('microchip Deportes').should('have.value', 'microchip Deportes');

      cy.get(`[data-cy="numero"]`).type('56223').should('have.value', '56223');

      cy.get(`[data-cy="horaSolicitud"]`).type('2022-01-24T06:06').should('have.value', '2022-01-24T06:06');

      cy.get(`[data-cy="domicilio"]`).type('Global generate colaboración').should('have.value', 'Global generate colaboración');

      cy.get(`[data-cy="telefono"]`).type('proyección Azul').should('have.value', 'proyección Azul');

      cy.get(`[data-cy="edad"]`).type('44298').should('have.value', '44298');

      cy.get(`[data-cy="motivoLlamado"]`).type('evolve').should('have.value', 'evolve');

      cy.get(`[data-cy="seEfectuo"]`).should('not.be.checked');
      cy.get(`[data-cy="seEfectuo"]`).click().should('be.checked');

      cy.get(`[data-cy="internacion"]`).should('not.be.checked');
      cy.get(`[data-cy="internacion"]`).click().should('be.checked');

      cy.get(`[data-cy="observaciones"]`)
        .type('navigating web-readiness application')
        .should('have.value', 'navigating web-readiness application');

      cy.get(`[data-cy="individuoAdhoc"]`).type('disintermediate').should('have.value', 'disintermediate');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        solicitudPrestacion = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', solicitudPrestacionPageUrlPattern);
    });
  });
});
