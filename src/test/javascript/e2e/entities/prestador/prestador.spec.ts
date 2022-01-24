import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrestadorComponentsPage, PrestadorDeleteDialog, PrestadorUpdatePage } from './prestador.page-object';

const expect = chai.expect;

describe('Prestador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prestadorComponentsPage: PrestadorComponentsPage;
  let prestadorUpdatePage: PrestadorUpdatePage;
  let prestadorDeleteDialog: PrestadorDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Prestadors', async () => {
    await navBarPage.goToEntity('prestador');
    prestadorComponentsPage = new PrestadorComponentsPage();
    await browser.wait(ec.visibilityOf(prestadorComponentsPage.title), 5000);
    expect(await prestadorComponentsPage.getTitle()).to.eq('ssoc22App.prestador.home.title');
    await browser.wait(ec.or(ec.visibilityOf(prestadorComponentsPage.entities), ec.visibilityOf(prestadorComponentsPage.noResult)), 1000);
  });

  it('should load create Prestador page', async () => {
    await prestadorComponentsPage.clickOnCreateButton();
    prestadorUpdatePage = new PrestadorUpdatePage();
    expect(await prestadorUpdatePage.getPageTitle()).to.eq('ssoc22App.prestador.home.createOrEditLabel');
    await prestadorUpdatePage.cancel();
  });

  it('should create and save Prestadors', async () => {
    const nbButtonsBeforeCreate = await prestadorComponentsPage.countDeleteButtons();

    await prestadorComponentsPage.clickOnCreateButton();

    await promise.all([
      prestadorUpdatePage.setNombreInput('nombre'),
      prestadorUpdatePage.setCondicionInput('condicion'),
      // prestadorUpdatePage.itemNomencladorSelectLastOption(),
    ]);

    await prestadorUpdatePage.save();
    expect(await prestadorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prestadorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prestador', async () => {
    const nbButtonsBeforeDelete = await prestadorComponentsPage.countDeleteButtons();
    await prestadorComponentsPage.clickOnLastDeleteButton();

    prestadorDeleteDialog = new PrestadorDeleteDialog();
    expect(await prestadorDeleteDialog.getDialogTitle()).to.eq('ssoc22App.prestador.delete.question');
    await prestadorDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(prestadorComponentsPage.title), 5000);

    expect(await prestadorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
