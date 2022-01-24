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

describe('Movil e2e test', () => {
  const movilPageUrl = '/movil';
  const movilPageUrlPattern = new RegExp('/movil(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const movilSample = {};

  let movil: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/movils+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/movils').as('postEntityRequest');
    cy.intercept('DELETE', '/api/movils/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (movil) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/movils/${movil.id}`,
      }).then(() => {
        movil = undefined;
      });
    }
  });

  it('Movils menu should load Movils page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('movil');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Movil').should('exist');
    cy.url().should('match', movilPageUrlPattern);
  });

  describe('Movil page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(movilPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Movil page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/movil/new$'));
        cy.getEntityCreateUpdateHeading('Movil');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movilPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/movils',
          body: movilSample,
        }).then(({ body }) => {
          movil = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/movils+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [movil],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(movilPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Movil page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('movil');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movilPageUrlPattern);
      });

      it('edit button click should load edit Movil page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Movil');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movilPageUrlPattern);
      });

      it('last delete button click should delete instance of Movil', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('movil').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movilPageUrlPattern);

        movil = undefined;
      });
    });
  });

  describe('new Movil page', () => {
    beforeEach(() => {
      cy.visit(`${movilPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Movil');
    });

    it('should create an instance of Movil', () => {
      cy.get(`[data-cy="numero"]`).type('29852').should('have.value', '29852');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        movil = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', movilPageUrlPattern);
    });
  });
});
