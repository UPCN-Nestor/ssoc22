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

describe('Chofer e2e test', () => {
  const choferPageUrl = '/chofer';
  const choferPageUrlPattern = new RegExp('/chofer(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const choferSample = {};

  let chofer: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/chofers+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/chofers').as('postEntityRequest');
    cy.intercept('DELETE', '/api/chofers/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (chofer) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/chofers/${chofer.id}`,
      }).then(() => {
        chofer = undefined;
      });
    }
  });

  it('Chofers menu should load Chofers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('chofer');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Chofer').should('exist');
    cy.url().should('match', choferPageUrlPattern);
  });

  describe('Chofer page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(choferPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Chofer page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/chofer/new$'));
        cy.getEntityCreateUpdateHeading('Chofer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', choferPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/chofers',
          body: choferSample,
        }).then(({ body }) => {
          chofer = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/chofers+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [chofer],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(choferPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Chofer page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('chofer');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', choferPageUrlPattern);
      });

      it('edit button click should load edit Chofer page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Chofer');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', choferPageUrlPattern);
      });

      it('last delete button click should delete instance of Chofer', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('chofer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', choferPageUrlPattern);

        chofer = undefined;
      });
    });
  });

  describe('new Chofer page', () => {
    beforeEach(() => {
      cy.visit(`${choferPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Chofer');
    });

    it('should create an instance of Chofer', () => {
      cy.get(`[data-cy="nombre"]`).type('invoice HDD').should('have.value', 'invoice HDD');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        chofer = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', choferPageUrlPattern);
    });
  });
});
