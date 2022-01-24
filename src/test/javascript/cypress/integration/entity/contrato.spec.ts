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

describe('Contrato e2e test', () => {
  const contratoPageUrl = '/contrato';
  const contratoPageUrlPattern = new RegExp('/contrato(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const contratoSample = {};

  let contrato: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/contratoes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/contratoes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/contratoes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (contrato) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/contratoes/${contrato.id}`,
      }).then(() => {
        contrato = undefined;
      });
    }
  });

  it('Contratoes menu should load Contratoes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('contrato');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Contrato').should('exist');
    cy.url().should('match', contratoPageUrlPattern);
  });

  describe('Contrato page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(contratoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Contrato page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/contrato/new$'));
        cy.getEntityCreateUpdateHeading('Contrato');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contratoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/contratoes',
          body: contratoSample,
        }).then(({ body }) => {
          contrato = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/contratoes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [contrato],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(contratoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Contrato page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('contrato');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contratoPageUrlPattern);
      });

      it('edit button click should load edit Contrato page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contrato');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contratoPageUrlPattern);
      });

      it('last delete button click should delete instance of Contrato', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('contrato').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contratoPageUrlPattern);

        contrato = undefined;
      });
    });
  });

  describe('new Contrato page', () => {
    beforeEach(() => {
      cy.visit(`${contratoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Contrato');
    });

    it('should create an instance of Contrato', () => {
      cy.get(`[data-cy="fechaAlta"]`).type('2022-01-23T16:18').should('have.value', '2022-01-23T16:18');

      cy.get(`[data-cy="particularidades"]`).type('Inteligente transmitting').should('have.value', 'Inteligente transmitting');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        contrato = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', contratoPageUrlPattern);
    });
  });
});
