import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrestacionComponentsPage, PrestacionDeleteDialog, PrestacionUpdatePage } from './prestacion.page-object';

const expect = chai.expect;

describe('Prestacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prestacionComponentsPage: PrestacionComponentsPage;
  let prestacionUpdatePage: PrestacionUpdatePage;
  let prestacionDeleteDialog: PrestacionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Prestacions', async () => {
    await navBarPage.goToEntity('prestacion');
    prestacionComponentsPage = new PrestacionComponentsPage();
    await browser.wait(ec.visibilityOf(prestacionComponentsPage.title), 5000);
    expect(await prestacionComponentsPage.getTitle()).to.eq('ssoc22App.prestacion.home.title');
    await browser.wait(ec.or(ec.visibilityOf(prestacionComponentsPage.entities), ec.visibilityOf(prestacionComponentsPage.noResult)), 1000);
  });

  it('should load create Prestacion page', async () => {
    await prestacionComponentsPage.clickOnCreateButton();
    prestacionUpdatePage = new PrestacionUpdatePage();
    expect(await prestacionUpdatePage.getPageTitle()).to.eq('ssoc22App.prestacion.home.createOrEditLabel');
    await prestacionUpdatePage.cancel();
  });

  it('should create and save Prestacions', async () => {
    const nbButtonsBeforeCreate = await prestacionComponentsPage.countDeleteButtons();

    await prestacionComponentsPage.clickOnCreateButton();

    await promise.all([
      prestacionUpdatePage.setTipoInput('tipo'),
      prestacionUpdatePage.setPrecioInput('5'),
      prestacionUpdatePage.setCarenciaInput('PT12S'),
      prestacionUpdatePage.setNombreInput('nombre'),
      prestacionUpdatePage.setCodigoInput('codigo'),
      // prestacionUpdatePage.insumoSelectLastOption(),
    ]);

    await prestacionUpdatePage.save();
    expect(await prestacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prestacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prestacion', async () => {
    const nbButtonsBeforeDelete = await prestacionComponentsPage.countDeleteButtons();
    await prestacionComponentsPage.clickOnLastDeleteButton();

    prestacionDeleteDialog = new PrestacionDeleteDialog();
    expect(await prestacionDeleteDialog.getDialogTitle()).to.eq('ssoc22App.prestacion.delete.question');
    await prestacionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(prestacionComponentsPage.title), 5000);

    expect(await prestacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
