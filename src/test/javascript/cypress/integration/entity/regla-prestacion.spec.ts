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

describe('ReglaPrestacion e2e test', () => {
  const reglaPrestacionPageUrl = '/regla-prestacion';
  const reglaPrestacionPageUrlPattern = new RegExp('/regla-prestacion(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const reglaPrestacionSample = {};

  let reglaPrestacion: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/regla-prestacions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/regla-prestacions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/regla-prestacions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (reglaPrestacion) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/regla-prestacions/${reglaPrestacion.id}`,
      }).then(() => {
        reglaPrestacion = undefined;
      });
    }
  });

  it('ReglaPrestacions menu should load ReglaPrestacions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('regla-prestacion');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ReglaPrestacion').should('exist');
    cy.url().should('match', reglaPrestacionPageUrlPattern);
  });

  describe('ReglaPrestacion page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(reglaPrestacionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ReglaPrestacion page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/regla-prestacion/new$'));
        cy.getEntityCreateUpdateHeading('ReglaPrestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reglaPrestacionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/regla-prestacions',
          body: reglaPrestacionSample,
        }).then(({ body }) => {
          reglaPrestacion = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/regla-prestacions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [reglaPrestacion],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(reglaPrestacionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ReglaPrestacion page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('reglaPrestacion');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reglaPrestacionPageUrlPattern);
      });

      it('edit button click should load edit ReglaPrestacion page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ReglaPrestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reglaPrestacionPageUrlPattern);
      });

      it('last delete button click should delete instance of ReglaPrestacion', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('reglaPrestacion').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', reglaPrestacionPageUrlPattern);

        reglaPrestacion = undefined;
      });
    });
  });

  describe('new ReglaPrestacion page', () => {
    beforeEach(() => {
      cy.visit(`${reglaPrestacionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ReglaPrestacion');
    });

    it('should create an instance of ReglaPrestacion', () => {
      cy.get(`[data-cy="codigoRegla"]`).type('deposit Dong transmitter').should('have.value', 'deposit Dong transmitter');

      cy.get(`[data-cy="tipoRegla"]`).type('eyeballs generating Groenlandia').should('have.value', 'eyeballs generating Groenlandia');

      cy.get(`[data-cy="datos"]`).type('technologies Investigación Somali').should('have.value', 'technologies Investigación Somali');

      cy.get(`[data-cy="nombre"]`)
        .type('Inteligente methodologies Bedfordshire')
        .should('have.value', 'Inteligente methodologies Bedfordshire');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        reglaPrestacion = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', reglaPrestacionPageUrlPattern);
    });
  });
});
