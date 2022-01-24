import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MovilComponentsPage, MovilDeleteDialog, MovilUpdatePage } from './movil.page-object';

const expect = chai.expect;

describe('Movil e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let movilComponentsPage: MovilComponentsPage;
  let movilUpdatePage: MovilUpdatePage;
  let movilDeleteDialog: MovilDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Movils', async () => {
    await navBarPage.goToEntity('movil');
    movilComponentsPage = new MovilComponentsPage();
    await browser.wait(ec.visibilityOf(movilComponentsPage.title), 5000);
    expect(await movilComponentsPage.getTitle()).to.eq('ssoc22App.movil.home.title');
    await browser.wait(ec.or(ec.visibilityOf(movilComponentsPage.entities), ec.visibilityOf(movilComponentsPage.noResult)), 1000);
  });

  it('should load create Movil page', async () => {
    await movilComponentsPage.clickOnCreateButton();
    movilUpdatePage = new MovilUpdatePage();
    expect(await movilUpdatePage.getPageTitle()).to.eq('ssoc22App.movil.home.createOrEditLabel');
    await movilUpdatePage.cancel();
  });

  it('should create and save Movils', async () => {
    const nbButtonsBeforeCreate = await movilComponentsPage.countDeleteButtons();

    await movilComponentsPage.clickOnCreateButton();

    await promise.all([movilUpdatePage.setNumeroInput('5')]);

    await movilUpdatePage.save();
    expect(await movilUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await movilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Movil', async () => {
    const nbButtonsBeforeDelete = await movilComponentsPage.countDeleteButtons();
    await movilComponentsPage.clickOnLastDeleteButton();

    movilDeleteDialog = new MovilDeleteDialog();
    expect(await movilDeleteDialog.getDialogTitle()).to.eq('ssoc22App.movil.delete.question');
    await movilDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(movilComponentsPage.title), 5000);

    expect(await movilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
