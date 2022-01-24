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

describe('Cliente e2e test', () => {
  const clientePageUrl = '/cliente';
  const clientePageUrlPattern = new RegExp('/cliente(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const clienteSample = {};

  let cliente: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/clientes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/clientes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/clientes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (cliente) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/clientes/${cliente.id}`,
      }).then(() => {
        cliente = undefined;
      });
    }
  });

  it('Clientes menu should load Clientes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('cliente');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Cliente').should('exist');
    cy.url().should('match', clientePageUrlPattern);
  });

  describe('Cliente page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(clientePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Cliente page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/cliente/new$'));
        cy.getEntityCreateUpdateHeading('Cliente');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/clientes',
          body: clienteSample,
        }).then(({ body }) => {
          cliente = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/clientes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [cliente],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(clientePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Cliente page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('cliente');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientePageUrlPattern);
      });

      it('edit button click should load edit Cliente page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cliente');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientePageUrlPattern);
      });

      it('last delete button click should delete instance of Cliente', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('cliente').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', clientePageUrlPattern);

        cliente = undefined;
      });
    });
  });

  describe('new Cliente page', () => {
    beforeEach(() => {
      cy.visit(`${clientePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Cliente');
    });

    it('should create an instance of Cliente', () => {
      cy.get(`[data-cy="nombre"]`).type('Azul Plástico').should('have.value', 'Azul Plástico');

      cy.get(`[data-cy="socio"]`).type('52900').should('have.value', '52900');

      cy.get(`[data-cy="suministro"]`).type('83465').should('have.value', '83465');

      cy.get(`[data-cy="dni"]`).type('Usabilidad portals').should('have.value', 'Usabilidad portals');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        cliente = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', clientePageUrlPattern);
    });
  });
});
