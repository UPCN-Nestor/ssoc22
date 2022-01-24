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

describe('Prestador e2e test', () => {
  const prestadorPageUrl = '/prestador';
  const prestadorPageUrlPattern = new RegExp('/prestador(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const prestadorSample = {};

  let prestador: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/prestadors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/prestadors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/prestadors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (prestador) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/prestadors/${prestador.id}`,
      }).then(() => {
        prestador = undefined;
      });
    }
  });

  it('Prestadors menu should load Prestadors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('prestador');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Prestador').should('exist');
    cy.url().should('match', prestadorPageUrlPattern);
  });

  describe('Prestador page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(prestadorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Prestador page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/prestador/new$'));
        cy.getEntityCreateUpdateHeading('Prestador');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestadorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/prestadors',
          body: prestadorSample,
        }).then(({ body }) => {
          prestador = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/prestadors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [prestador],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(prestadorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Prestador page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('prestador');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestadorPageUrlPattern);
      });

      it('edit button click should load edit Prestador page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Prestador');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestadorPageUrlPattern);
      });

      it('last delete button click should delete instance of Prestador', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('prestador').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', prestadorPageUrlPattern);

        prestador = undefined;
      });
    });
  });

  describe('new Prestador page', () => {
    beforeEach(() => {
      cy.visit(`${prestadorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Prestador');
    });

    it('should create an instance of Prestador', () => {
      cy.get(`[data-cy="nombre"]`).type('Diseñador Algodón Account').should('have.value', 'Diseñador Algodón Account');

      cy.get(`[data-cy="condicion"]`).type('Bebes Rand bluetooth').should('have.value', 'Bebes Rand bluetooth');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        prestador = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', prestadorPageUrlPattern);
    });
  });
});
