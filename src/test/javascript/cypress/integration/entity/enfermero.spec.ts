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

describe('Enfermero e2e test', () => {
  const enfermeroPageUrl = '/enfermero';
  const enfermeroPageUrlPattern = new RegExp('/enfermero(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const enfermeroSample = {};

  let enfermero: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/enfermeros+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/enfermeros').as('postEntityRequest');
    cy.intercept('DELETE', '/api/enfermeros/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (enfermero) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/enfermeros/${enfermero.id}`,
      }).then(() => {
        enfermero = undefined;
      });
    }
  });

  it('Enfermeros menu should load Enfermeros page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('enfermero');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Enfermero').should('exist');
    cy.url().should('match', enfermeroPageUrlPattern);
  });

  describe('Enfermero page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(enfermeroPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Enfermero page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/enfermero/new$'));
        cy.getEntityCreateUpdateHeading('Enfermero');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', enfermeroPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/enfermeros',
          body: enfermeroSample,
        }).then(({ body }) => {
          enfermero = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/enfermeros+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [enfermero],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(enfermeroPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Enfermero page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('enfermero');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', enfermeroPageUrlPattern);
      });

      it('edit button click should load edit Enfermero page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Enfermero');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', enfermeroPageUrlPattern);
      });

      it('last delete button click should delete instance of Enfermero', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('enfermero').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', enfermeroPageUrlPattern);

        enfermero = undefined;
      });
    });
  });

  describe('new Enfermero page', () => {
    beforeEach(() => {
      cy.visit(`${enfermeroPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Enfermero');
    });

    it('should create an instance of Enfermero', () => {
      cy.get(`[data-cy="nombre"]`).type('extranet Hormigon B2B').should('have.value', 'extranet Hormigon B2B');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        enfermero = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', enfermeroPageUrlPattern);
    });
  });
});
