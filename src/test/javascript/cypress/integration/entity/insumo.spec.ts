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

describe('Insumo e2e test', () => {
  const insumoPageUrl = '/insumo';
  const insumoPageUrlPattern = new RegExp('/insumo(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const insumoSample = {};

  let insumo: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/insumos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/insumos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/insumos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (insumo) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/insumos/${insumo.id}`,
      }).then(() => {
        insumo = undefined;
      });
    }
  });

  it('Insumos menu should load Insumos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('insumo');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Insumo').should('exist');
    cy.url().should('match', insumoPageUrlPattern);
  });

  describe('Insumo page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(insumoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Insumo page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/insumo/new$'));
        cy.getEntityCreateUpdateHeading('Insumo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', insumoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/insumos',
          body: insumoSample,
        }).then(({ body }) => {
          insumo = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/insumos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [insumo],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(insumoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Insumo page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('insumo');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', insumoPageUrlPattern);
      });

      it('edit button click should load edit Insumo page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Insumo');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', insumoPageUrlPattern);
      });

      it('last delete button click should delete instance of Insumo', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('insumo').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', insumoPageUrlPattern);

        insumo = undefined;
      });
    });
  });

  describe('new Insumo page', () => {
    beforeEach(() => {
      cy.visit(`${insumoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Insumo');
    });

    it('should create an instance of Insumo', () => {
      cy.get(`[data-cy="tipo"]`).type('redundant Joyería Datos').should('have.value', 'redundant Joyería Datos');

      cy.get(`[data-cy="precioVenta"]`).type('80441').should('have.value', '80441');

      cy.get(`[data-cy="esModificable"]`).should('not.be.checked');
      cy.get(`[data-cy="esModificable"]`).click().should('be.checked');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        insumo = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', insumoPageUrlPattern);
    });
  });
});
