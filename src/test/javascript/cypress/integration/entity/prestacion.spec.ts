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

describe('Prestacion e2e test', () => {
  const prestacionPageUrl = '/prestacion';
  const prestacionPageUrlPattern = new RegExp('/prestacion(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const prestacionSample = {};

  let prestacion: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prestacions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prestacions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prestacions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prestacion) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prestacions/${prestacion.id}`,
      }).then(() => {
        prestacion = undefined;
      });
    }
  });

  it('Prestacions menu should load Prestacions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prestacion');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Prestacion').should('exist');
    cy.url().should('match', prestacionPageUrlPattern);
  });

  describe('Prestacion page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prestacionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Prestacion page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/prestacion/new$'));
        cy.getEntityCreateUpdateHeading('Prestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestacionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prestacions',
          body: prestacionSample,
        }).then(({ body }) => {
          prestacion = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prestacions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [prestacion],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prestacionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Prestacion page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prestacion');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestacionPageUrlPattern);
      });

      it('edit button click should load edit Prestacion page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Prestacion');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestacionPageUrlPattern);
      });

      it('last delete button click should delete instance of Prestacion', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prestacion').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestacionPageUrlPattern);

        prestacion = undefined;
      });
    });
  });

  describe('new Prestacion page', () => {
    beforeEach(() => {
      cy.visit(`${prestacionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Prestacion');
    });

    it('should create an instance of Prestacion', () => {
      cy.get(`[data-cy="tipo"]`).type('transmitting').should('have.value', 'transmitting');

      cy.get(`[data-cy="precio"]`).type('67802').should('have.value', '67802');

      cy.get(`[data-cy="carencia"]`).type('PT58M').should('have.value', 'PT58M');

      cy.get(`[data-cy="nombre"]`).type('rich Planificador Central').should('have.value', 'rich Planificador Central');

      cy.get(`[data-cy="codigo"]`).type('invoice e-markets').should('have.value', 'invoice e-markets');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        prestacion = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', prestacionPageUrlPattern);
    });
  });
});
