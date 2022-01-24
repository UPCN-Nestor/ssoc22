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

describe('Individuo e2e test', () => {
  const individuoPageUrl = '/individuo';
  const individuoPageUrlPattern = new RegExp('/individuo(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const individuoSample = {};

  let individuo: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/individuos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/individuos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/individuos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (individuo) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/individuos/${individuo.id}`,
      }).then(() => {
        individuo = undefined;
      });
    }
  });

  it('Individuos menu should load Individuos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('individuo');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Individuo').should('exist');
    cy.url().should('match', individuoPageUrlPattern);
  });

  describe('Individuo page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(individuoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Individuo page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/individuo/new$'));
        cy.getEntityCreateUpdateHeading('Individuo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', individuoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/individuos',
          body: individuoSample,
        }).then(({ body }) => {
          individuo = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/individuos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [individuo],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(individuoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Individuo page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('individuo');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', individuoPageUrlPattern);
      });

      it('edit button click should load edit Individuo page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Individuo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', individuoPageUrlPattern);
      });

      it('last delete button click should delete instance of Individuo', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('individuo').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', individuoPageUrlPattern);

        individuo = undefined;
      });
    });
  });

  describe('new Individuo page', () => {
    beforeEach(() => {
      cy.visit(`${individuoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Individuo');
    });

    it('should create an instance of Individuo', () => {
      cy.get(`[data-cy="nombre"]`).type('Factores').should('have.value', 'Factores');

      cy.get(`[data-cy="dni"]`).type('withdrawal').should('have.value', 'withdrawal');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        individuo = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', individuoPageUrlPattern);
    });
  });
});
