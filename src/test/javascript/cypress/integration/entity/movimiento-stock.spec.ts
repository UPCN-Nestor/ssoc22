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

describe('MovimientoStock e2e test', () => {
  const movimientoStockPageUrl = '/movimiento-stock';
  const movimientoStockPageUrlPattern = new RegExp('/movimiento-stock(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const movimientoStockSample = {};

  let movimientoStock: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/movimiento-stocks+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/movimiento-stocks').as('postEntityRequest');
    cy.intercept('DELETE', '/api/movimiento-stocks/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (movimientoStock) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/movimiento-stocks/${movimientoStock.id}`,
      }).then(() => {
        movimientoStock = undefined;
      });
    }
  });

  it('MovimientoStocks menu should load MovimientoStocks page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('movimiento-stock');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('MovimientoStock').should('exist');
    cy.url().should('match', movimientoStockPageUrlPattern);
  });

  describe('MovimientoStock page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(movimientoStockPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create MovimientoStock page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/movimiento-stock/new$'));
        cy.getEntityCreateUpdateHeading('MovimientoStock');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movimientoStockPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/movimiento-stocks',
          body: movimientoStockSample,
        }).then(({ body }) => {
          movimientoStock = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/movimiento-stocks+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [movimientoStock],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(movimientoStockPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details MovimientoStock page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('movimientoStock');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movimientoStockPageUrlPattern);
      });

      it('edit button click should load edit MovimientoStock page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('MovimientoStock');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movimientoStockPageUrlPattern);
      });

      it('last delete button click should delete instance of MovimientoStock', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('movimientoStock').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', movimientoStockPageUrlPattern);

        movimientoStock = undefined;
      });
    });
  });

  describe('new MovimientoStock page', () => {
    beforeEach(() => {
      cy.visit(`${movimientoStockPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('MovimientoStock');
    });

    it('should create an instance of MovimientoStock', () => {
      cy.get(`[data-cy="fecha"]`).type('2022-01-23T20:17').should('have.value', '2022-01-23T20:17');

      cy.get(`[data-cy="cantidad"]`).type('81572').should('have.value', '81572');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        movimientoStock = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', movimientoStockPageUrlPattern);
    });
  });
});
