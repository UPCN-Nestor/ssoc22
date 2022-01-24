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

describe('ItemFactura e2e test', () => {
  const itemFacturaPageUrl = '/item-factura';
  const itemFacturaPageUrlPattern = new RegExp('/item-factura(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const itemFacturaSample = {};

  let itemFactura: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/item-facturas+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/item-facturas').as('postEntityRequest');
    cy.intercept('DELETE', '/api/item-facturas/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (itemFactura) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/item-facturas/${itemFactura.id}`,
      }).then(() => {
        itemFactura = undefined;
      });
    }
  });

  it('ItemFacturas menu should load ItemFacturas page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('item-factura');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ItemFactura').should('exist');
    cy.url().should('match', itemFacturaPageUrlPattern);
  });

  describe('ItemFactura page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(itemFacturaPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ItemFactura page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/item-factura/new$'));
        cy.getEntityCreateUpdateHeading('ItemFactura');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemFacturaPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/item-facturas',
          body: itemFacturaSample,
        }).then(({ body }) => {
          itemFactura = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/item-facturas+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [itemFactura],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(itemFacturaPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ItemFactura page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('itemFactura');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemFacturaPageUrlPattern);
      });

      it('edit button click should load edit ItemFactura page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ItemFactura');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemFacturaPageUrlPattern);
      });

      it('last delete button click should delete instance of ItemFactura', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('itemFactura').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', itemFacturaPageUrlPattern);

        itemFactura = undefined;
      });
    });
  });

  describe('new ItemFactura page', () => {
    beforeEach(() => {
      cy.visit(`${itemFacturaPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ItemFactura');
    });

    it('should create an instance of ItemFactura', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        itemFactura = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', itemFacturaPageUrlPattern);
    });
  });
});
