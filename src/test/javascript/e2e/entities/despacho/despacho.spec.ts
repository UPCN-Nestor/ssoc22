import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DespachoComponentsPage, DespachoDeleteDialog, DespachoUpdatePage } from './despacho.page-object';

const expect = chai.expect;

describe('Despacho e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let despachoComponentsPage: DespachoComponentsPage;
  let despachoUpdatePage: DespachoUpdatePage;
  let despachoDeleteDialog: DespachoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Despachos', async () => {
    await navBarPage.goToEntity('despacho');
    despachoComponentsPage = new DespachoComponentsPage();
    await browser.wait(ec.visibilityOf(despachoComponentsPage.title), 5000);
    expect(await despachoComponentsPage.getTitle()).to.eq('ssoc22App.despacho.home.title');
    await browser.wait(ec.or(ec.visibilityOf(despachoComponentsPage.entities), ec.visibilityOf(despachoComponentsPage.noResult)), 1000);
  });

  it('should load create Despacho page', async () => {
    await despachoComponentsPage.clickOnCreateButton();
    despachoUpdatePage = new DespachoUpdatePage();
    expect(await despachoUpdatePage.getPageTitle()).to.eq('ssoc22App.despacho.home.createOrEditLabel');
    await despachoUpdatePage.cancel();
  });

  it('should create and save Despachos', async () => {
    const nbButtonsBeforeCreate = await despachoComponentsPage.countDeleteButtons();

    await despachoComponentsPage.clickOnCreateButton();

    await promise.all([
      despachoUpdatePage.setHoraSalidaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      despachoUpdatePage.setHoraLlegadaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      despachoUpdatePage.prestadorSelectLastOption(),
      despachoUpdatePage.choferSelectLastOption(),
      despachoUpdatePage.medicoSelectLastOption(),
      despachoUpdatePage.enfermeroSelectLastOption(),
      despachoUpdatePage.movilSelectLastOption(),
    ]);

    await despachoUpdatePage.save();
    expect(await despachoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await despachoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Despacho', async () => {
    const nbButtonsBeforeDelete = await despachoComponentsPage.countDeleteButtons();
    await despachoComponentsPage.clickOnLastDeleteButton();

    despachoDeleteDialog = new DespachoDeleteDialog();
    expect(await despachoDeleteDialog.getDialogTitle()).to.eq('ssoc22App.despacho.delete.question');
    await despachoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(despachoComponentsPage.title), 5000);

    expect(await despachoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
