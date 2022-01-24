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

describe('Factura e2e test', () => {
  const facturaPageUrl = '/factura';
  const facturaPageUrlPattern = new RegExp('/factura(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const facturaSample = {};

  let factura: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/facturas+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/facturas').as('postEntityRequest');
    cy.intercept('DELETE', '/api/facturas/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (factura) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/facturas/${factura.id}`,
      }).then(() => {
        factura = undefined;
      });
    }
  });

  it('Facturas menu should load Facturas page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('factura');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Factura').should('exist');
    cy.url().should('match', facturaPageUrlPattern);
  });

  describe('Factura page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(facturaPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Factura page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/factura/new$'));
        cy.getEntityCreateUpdateHeading('Factura');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', facturaPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/facturas',
          body: facturaSample,
        }).then(({ body }) => {
          factura = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/facturas+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [factura],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(facturaPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Factura page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('factura');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', facturaPageUrlPattern);
      });

      it('edit button click should load edit Factura page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Factura');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', facturaPageUrlPattern);
      });

      it('last delete button click should delete instance of Factura', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('factura').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', facturaPageUrlPattern);

        factura = undefined;
      });
    });
  });

  describe('new Factura page', () => {
    beforeEach(() => {
      cy.visit(`${facturaPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Factura');
    });

    it('should create an instance of Factura', () => {
      cy.get(`[data-cy="fechaEmision"]`).type('2022-01-23T18:33').should('have.value', '2022-01-23T18:33');

      cy.get(`[data-cy="numeroInterno"]`).type('Digitalizado').should('have.value', 'Digitalizado');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        factura = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', facturaPageUrlPattern);
    });
  });
});
