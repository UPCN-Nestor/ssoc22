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

describe('ItemNomenclador e2e test', () => {
  const itemNomencladorPageUrl = '/item-nomenclador';
  const itemNomencladorPageUrlPattern = new RegExp('/item-nomenclador(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const itemNomencladorSample = {};

  let itemNomenclador: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/item-nomencladors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/item-nomencladors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/item-nomencladors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (itemNomenclador) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/item-nomencladors/${itemNomenclador.id}`,
      }).then(() => {
        itemNomenclador = undefined;
      });
    }
  });

  it('ItemNomencladors menu should load ItemNomencladors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('item-nomenclador');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ItemNomenclador').should('exist');
    cy.url().should('match', itemNomencladorPageUrlPattern);
  });

  describe('ItemNomenclador page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(itemNomencladorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ItemNomenclador page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/item-nomenclador/new$'));
        cy.getEntityCreateUpdateHeading('ItemNomenclador');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemNomencladorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/item-nomencladors',
          body: itemNomencladorSample,
        }).then(({ body }) => {
          itemNomenclador = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/item-nomencladors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [itemNomenclador],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(itemNomencladorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ItemNomenclador page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('itemNomenclador');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemNomencladorPageUrlPattern);
      });

      it('edit button click should load edit ItemNomenclador page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ItemNomenclador');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemNomencladorPageUrlPattern);
      });

      it('last delete button click should delete instance of ItemNomenclador', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('itemNomenclador').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemNomencladorPageUrlPattern);

        itemNomenclador = undefined;
      });
    });
  });

  describe('new ItemNomenclador page', () => {
    beforeEach(() => {
      cy.visit(`${itemNomencladorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ItemNomenclador');
    });

    it('should create an instance of ItemNomenclador', () => {
      cy.get(`[data-cy="nombre"]`).type('Tala Cambridgeshire withdrawal').should('have.value', 'Tala Cambridgeshire withdrawal');

      cy.get(`[data-cy="diasCarencia"]`).type('55248').should('have.value', '55248');

      cy.get(`[data-cy="codigo"]`).type('payment override cliente').should('have.value', 'payment override cliente');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        itemNomenclador = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', itemNomencladorPageUrlPattern);
    });
  });
});
