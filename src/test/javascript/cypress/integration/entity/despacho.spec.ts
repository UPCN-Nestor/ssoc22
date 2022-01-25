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

describe('Despacho e2e test', () => {
  const despachoPageUrl = '/despacho';
  const despachoPageUrlPattern = new RegExp('/despacho(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const despachoSample = {};

  let despacho: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/despachos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/despachos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/despachos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (despacho) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/despachos/${despacho.id}`,
      }).then(() => {
        despacho = undefined;
      });
    }
  });

  it('Despachos menu should load Despachos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('despacho');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Despacho').should('exist');
    cy.url().should('match', despachoPageUrlPattern);
  });

  describe('Despacho page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(despachoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Despacho page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/despacho/new$'));
        cy.getEntityCreateUpdateHeading('Despacho');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', despachoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/despachos',
          body: despachoSample,
        }).then(({ body }) => {
          despacho = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/despachos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [despacho],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(despachoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Despacho page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('despacho');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', despachoPageUrlPattern);
      });

      it('edit button click should load edit Despacho page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Despacho');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', despachoPageUrlPattern);
      });

      it('last delete button click should delete instance of Despacho', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('despacho').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', despachoPageUrlPattern);

        despacho = undefined;
      });
    });
  });

  describe('new Despacho page', () => {
    beforeEach(() => {
      cy.visit(`${despachoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Despacho');
    });

    it('should create an instance of Despacho', () => {
      cy.get(`[data-cy="horaSalida"]`).type('2022-01-23T23:56').should('have.value', '2022-01-23T23:56');

      cy.get(`[data-cy="horaLlegada"]`).type('2022-01-23T15:54').should('have.value', '2022-01-23T15:54');

      cy.get(`[data-cy="horaLibre"]`).type('2022-01-24T02:35').should('have.value', '2022-01-24T02:35');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        despacho = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', despachoPageUrlPattern);
    });
  });
});
