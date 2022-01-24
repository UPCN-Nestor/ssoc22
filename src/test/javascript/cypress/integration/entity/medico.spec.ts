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

describe('Medico e2e test', () => {
  const medicoPageUrl = '/medico';
  const medicoPageUrlPattern = new RegExp('/medico(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const medicoSample = {};

  let medico: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/medicos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/medicos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/medicos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (medico) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/medicos/${medico.id}`,
      }).then(() => {
        medico = undefined;
      });
    }
  });

  it('Medicos menu should load Medicos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('medico');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Medico').should('exist');
    cy.url().should('match', medicoPageUrlPattern);
  });

  describe('Medico page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(medicoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Medico page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/medico/new$'));
        cy.getEntityCreateUpdateHeading('Medico');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', medicoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/medicos',
          body: medicoSample,
        }).then(({ body }) => {
          medico = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/medicos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [medico],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(medicoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Medico page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('medico');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', medicoPageUrlPattern);
      });

      it('edit button click should load edit Medico page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Medico');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', medicoPageUrlPattern);
      });

      it('last delete button click should delete instance of Medico', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('medico').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', medicoPageUrlPattern);

        medico = undefined;
      });
    });
  });

  describe('new Medico page', () => {
    beforeEach(() => {
      cy.visit(`${medicoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Medico');
    });

    it('should create an instance of Medico', () => {
      cy.get(`[data-cy="nombre"]`).type('Azul networks').should('have.value', 'Azul networks');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        medico = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', medicoPageUrlPattern);
    });
  });
});
