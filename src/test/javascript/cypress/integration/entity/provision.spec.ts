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

describe('Provision e2e test', () => {
  const provisionPageUrl = '/provision';
  const provisionPageUrlPattern = new RegExp('/provision(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const provisionSample = {};

  let provision: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/provisions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/provisions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/provisions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (provision) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/provisions/${provision.id}`,
      }).then(() => {
        provision = undefined;
      });
    }
  });

  it('Provisions menu should load Provisions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('provision');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Provision').should('exist');
    cy.url().should('match', provisionPageUrlPattern);
  });

  describe('Provision page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(provisionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Provision page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/provision/new$'));
        cy.getEntityCreateUpdateHeading('Provision');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', provisionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/provisions',
          body: provisionSample,
        }).then(({ body }) => {
          provision = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/provisions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [provision],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(provisionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Provision page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('provision');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', provisionPageUrlPattern);
      });

      it('edit button click should load edit Provision page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Provision');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', provisionPageUrlPattern);
      });

      it('last delete button click should delete instance of Provision', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('provision').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', provisionPageUrlPattern);

        provision = undefined;
      });
    });
  });

  describe('new Provision page', () => {
    beforeEach(() => {
      cy.visit(`${provisionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Provision');
    });

    it('should create an instance of Provision', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        provision = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', provisionPageUrlPattern);
    });
  });
});
