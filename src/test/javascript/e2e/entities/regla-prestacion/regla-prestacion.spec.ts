import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReglaPrestacionComponentsPage, ReglaPrestacionDeleteDialog, ReglaPrestacionUpdatePage } from './regla-prestacion.page-object';

const expect = chai.expect;

describe('ReglaPrestacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reglaPrestacionComponentsPage: ReglaPrestacionComponentsPage;
  let reglaPrestacionUpdatePage: ReglaPrestacionUpdatePage;
  let reglaPrestacionDeleteDialog: ReglaPrestacionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ReglaPrestacions', async () => {
    await navBarPage.goToEntity('regla-prestacion');
    reglaPrestacionComponentsPage = new ReglaPrestacionComponentsPage();
    await browser.wait(ec.visibilityOf(reglaPrestacionComponentsPage.title), 5000);
    expect(await reglaPrestacionComponentsPage.getTitle()).to.eq('ssoc22App.reglaPrestacion.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(reglaPrestacionComponentsPage.entities), ec.visibilityOf(reglaPrestacionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ReglaPrestacion page', async () => {
    await reglaPrestacionComponentsPage.clickOnCreateButton();
    reglaPrestacionUpdatePage = new ReglaPrestacionUpdatePage();
    expect(await reglaPrestacionUpdatePage.getPageTitle()).to.eq('ssoc22App.reglaPrestacion.home.createOrEditLabel');
    await reglaPrestacionUpdatePage.cancel();
  });

  it('should create and save ReglaPrestacions', async () => {
    const nbButtonsBeforeCreate = await reglaPrestacionComponentsPage.countDeleteButtons();

    await reglaPrestacionComponentsPage.clickOnCreateButton();

    await promise.all([
      reglaPrestacionUpdatePage.setCodigoReglaInput('codigoRegla'),
      reglaPrestacionUpdatePage.setTipoReglaInput('tipoRegla'),
      reglaPrestacionUpdatePage.setDatosInput('datos'),
      reglaPrestacionUpdatePage.provisionSelectLastOption(),
    ]);

    await reglaPrestacionUpdatePage.save();
    expect(await reglaPrestacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reglaPrestacionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ReglaPrestacion', async () => {
    const nbButtonsBeforeDelete = await reglaPrestacionComponentsPage.countDeleteButtons();
    await reglaPrestacionComponentsPage.clickOnLastDeleteButton();

    reglaPrestacionDeleteDialog = new ReglaPrestacionDeleteDialog();
    expect(await reglaPrestacionDeleteDialog.getDialogTitle()).to.eq('ssoc22App.reglaPrestacion.delete.question');
    await reglaPrestacionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(reglaPrestacionComponentsPage.title), 5000);

    expect(await reglaPrestacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
