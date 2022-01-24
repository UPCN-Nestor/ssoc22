import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InsumoComponentsPage, InsumoDeleteDialog, InsumoUpdatePage } from './insumo.page-object';

const expect = chai.expect;

describe('Insumo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let insumoComponentsPage: InsumoComponentsPage;
  let insumoUpdatePage: InsumoUpdatePage;
  let insumoDeleteDialog: InsumoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Insumos', async () => {
    await navBarPage.goToEntity('insumo');
    insumoComponentsPage = new InsumoComponentsPage();
    await browser.wait(ec.visibilityOf(insumoComponentsPage.title), 5000);
    expect(await insumoComponentsPage.getTitle()).to.eq('ssoc22App.insumo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(insumoComponentsPage.entities), ec.visibilityOf(insumoComponentsPage.noResult)), 1000);
  });

  it('should load create Insumo page', async () => {
    await insumoComponentsPage.clickOnCreateButton();
    insumoUpdatePage = new InsumoUpdatePage();
    expect(await insumoUpdatePage.getPageTitle()).to.eq('ssoc22App.insumo.home.createOrEditLabel');
    await insumoUpdatePage.cancel();
  });

  it('should create and save Insumos', async () => {
    const nbButtonsBeforeCreate = await insumoComponentsPage.countDeleteButtons();

    await insumoComponentsPage.clickOnCreateButton();

    await promise.all([
      insumoUpdatePage.setTipoInput('tipo'),
      insumoUpdatePage.setPrecioVentaInput('5'),
      insumoUpdatePage.getEsModificableInput().click(),
    ]);

    await insumoUpdatePage.save();
    expect(await insumoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await insumoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Insumo', async () => {
    const nbButtonsBeforeDelete = await insumoComponentsPage.countDeleteButtons();
    await insumoComponentsPage.clickOnLastDeleteButton();

    insumoDeleteDialog = new InsumoDeleteDialog();
    expect(await insumoDeleteDialog.getDialogTitle()).to.eq('ssoc22App.insumo.delete.question');
    await insumoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(insumoComponentsPage.title), 5000);

    expect(await insumoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
