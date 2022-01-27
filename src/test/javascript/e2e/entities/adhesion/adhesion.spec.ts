import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdhesionComponentsPage, AdhesionDeleteDialog, AdhesionUpdatePage } from './adhesion.page-object';

const expect = chai.expect;

describe('Adhesion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adhesionComponentsPage: AdhesionComponentsPage;
  let adhesionUpdatePage: AdhesionUpdatePage;
  let adhesionDeleteDialog: AdhesionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Adhesions', async () => {
    await navBarPage.goToEntity('adhesion');
    adhesionComponentsPage = new AdhesionComponentsPage();
    await browser.wait(ec.visibilityOf(adhesionComponentsPage.title), 5000);
    expect(await adhesionComponentsPage.getTitle()).to.eq('ssoc22App.adhesion.home.title');
    await browser.wait(ec.or(ec.visibilityOf(adhesionComponentsPage.entities), ec.visibilityOf(adhesionComponentsPage.noResult)), 1000);
  });

  it('should load create Adhesion page', async () => {
    await adhesionComponentsPage.clickOnCreateButton();
    adhesionUpdatePage = new AdhesionUpdatePage();
    expect(await adhesionUpdatePage.getPageTitle()).to.eq('ssoc22App.adhesion.home.createOrEditLabel');
    await adhesionUpdatePage.cancel();
  });

  it('should create and save Adhesions', async () => {
    const nbButtonsBeforeCreate = await adhesionComponentsPage.countDeleteButtons();

    await adhesionComponentsPage.clickOnCreateButton();

    await promise.all([
      adhesionUpdatePage.setFechaAltaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      adhesionUpdatePage.setFechaBajaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      adhesionUpdatePage.setEstadoInput('estado'),
      adhesionUpdatePage.setCondicionInput('condicion'),
      adhesionUpdatePage.individuoSelectLastOption(),
      adhesionUpdatePage.clienteSelectLastOption(),
    ]);

    await adhesionUpdatePage.save();
    expect(await adhesionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adhesionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Adhesion', async () => {
    const nbButtonsBeforeDelete = await adhesionComponentsPage.countDeleteButtons();
    await adhesionComponentsPage.clickOnLastDeleteButton();

    adhesionDeleteDialog = new AdhesionDeleteDialog();
    expect(await adhesionDeleteDialog.getDialogTitle()).to.eq('ssoc22App.adhesion.delete.question');
    await adhesionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(adhesionComponentsPage.title), 5000);

    expect(await adhesionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
