import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContratoComponentsPage, ContratoDeleteDialog, ContratoUpdatePage } from './contrato.page-object';

const expect = chai.expect;

describe('Contrato e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contratoComponentsPage: ContratoComponentsPage;
  let contratoUpdatePage: ContratoUpdatePage;
  let contratoDeleteDialog: ContratoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contratoes', async () => {
    await navBarPage.goToEntity('contrato');
    contratoComponentsPage = new ContratoComponentsPage();
    await browser.wait(ec.visibilityOf(contratoComponentsPage.title), 5000);
    expect(await contratoComponentsPage.getTitle()).to.eq('ssoc22App.contrato.home.title');
    await browser.wait(ec.or(ec.visibilityOf(contratoComponentsPage.entities), ec.visibilityOf(contratoComponentsPage.noResult)), 1000);
  });

  it('should load create Contrato page', async () => {
    await contratoComponentsPage.clickOnCreateButton();
    contratoUpdatePage = new ContratoUpdatePage();
    expect(await contratoUpdatePage.getPageTitle()).to.eq('ssoc22App.contrato.home.createOrEditLabel');
    await contratoUpdatePage.cancel();
  });

  it('should create and save Contratoes', async () => {
    const nbButtonsBeforeCreate = await contratoComponentsPage.countDeleteButtons();

    await contratoComponentsPage.clickOnCreateButton();

    await promise.all([
      contratoUpdatePage.setFechaAltaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      contratoUpdatePage.setParticularidadesInput('particularidades'),
      contratoUpdatePage.planSelectLastOption(),
      contratoUpdatePage.clienteSelectLastOption(),
    ]);

    await contratoUpdatePage.save();
    expect(await contratoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contratoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contrato', async () => {
    const nbButtonsBeforeDelete = await contratoComponentsPage.countDeleteButtons();
    await contratoComponentsPage.clickOnLastDeleteButton();

    contratoDeleteDialog = new ContratoDeleteDialog();
    expect(await contratoDeleteDialog.getDialogTitle()).to.eq('ssoc22App.contrato.delete.question');
    await contratoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(contratoComponentsPage.title), 5000);

    expect(await contratoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
