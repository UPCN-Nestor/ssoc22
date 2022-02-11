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

describe('Tarifa e2e test', () => {
  const tarifaPageUrl = '/tarifa';
  const tarifaPageUrlPattern = new RegExp('/tarifa(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const tarifaSample = {};

  let tarifa: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/tarifas+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/tarifas').as('postEntityRequest');
    cy.intercept('DELETE', '/api/tarifas/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tarifa) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/tarifas/${tarifa.id}`,
      }).then(() => {
        tarifa = undefined;
      });
    }
  });

  it('Tarifas menu should load Tarifas page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('tarifa');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Tarifa').should('exist');
    cy.url().should('match', tarifaPageUrlPattern);
  });

  describe('Tarifa page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tarifaPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Tarifa page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/tarifa/new$'));
        cy.getEntityCreateUpdateHeading('Tarifa');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tarifaPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/tarifas',
          body: tarifaSample,
        }).then(({ body }) => {
          tarifa = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/tarifas+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [tarifa],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(tarifaPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Tarifa page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tarifa');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tarifaPageUrlPattern);
      });

      it('edit button click should load edit Tarifa page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Tarifa');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tarifaPageUrlPattern);
      });

      it('last delete button click should delete instance of Tarifa', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('tarifa').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tarifaPageUrlPattern);

        tarifa = undefined;
      });
    });
  });

  describe('new Tarifa page', () => {
    beforeEach(() => {
      cy.visit(`${tarifaPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Tarifa');
    });

    it('should create an instance of Tarifa', () => {
      cy.get(`[data-cy="tipo"]`).type('transmitting').should('have.value', 'transmitting');

      cy.get(`[data-cy="datos"]`).type('Dollar Analista').should('have.value', 'Dollar Analista');

      cy.get(`[data-cy="precio"]`).type('67793').should('have.value', '67793');

      cy.get(`[data-cy="vigenciaDesde"]`).type('2022-01-24T01:40').should('have.value', '2022-01-24T01:40');

      cy.get(`[data-cy="vigenciaHasta"]`).type('2022-01-23T20:02').should('have.value', '2022-01-23T20:02');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        tarifa = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', tarifaPageUrlPattern);
    });
  });
});
