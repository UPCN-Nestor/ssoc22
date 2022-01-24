import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChoferComponentsPage, ChoferDeleteDialog, ChoferUpdatePage } from './chofer.page-object';

const expect = chai.expect;

describe('Chofer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let choferComponentsPage: ChoferComponentsPage;
  let choferUpdatePage: ChoferUpdatePage;
  let choferDeleteDialog: ChoferDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Chofers', async () => {
    await navBarPage.goToEntity('chofer');
    choferComponentsPage = new ChoferComponentsPage();
    await browser.wait(ec.visibilityOf(choferComponentsPage.title), 5000);
    expect(await choferComponentsPage.getTitle()).to.eq('ssoc22App.chofer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(choferComponentsPage.entities), ec.visibilityOf(choferComponentsPage.noResult)), 1000);
  });

  it('should load create Chofer page', async () => {
    await choferComponentsPage.clickOnCreateButton();
    choferUpdatePage = new ChoferUpdatePage();
    expect(await choferUpdatePage.getPageTitle()).to.eq('ssoc22App.chofer.home.createOrEditLabel');
    await choferUpdatePage.cancel();
  });

  it('should create and save Chofers', async () => {
    const nbButtonsBeforeCreate = await choferComponentsPage.countDeleteButtons();

    await choferComponentsPage.clickOnCreateButton();

    await promise.all([choferUpdatePage.setNombreInput('nombre')]);

    await choferUpdatePage.save();
    expect(await choferUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await choferComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Chofer', async () => {
    const nbButtonsBeforeDelete = await choferComponentsPage.countDeleteButtons();
    await choferComponentsPage.clickOnLastDeleteButton();

    choferDeleteDialog = new ChoferDeleteDialog();
    expect(await choferDeleteDialog.getDialogTitle()).to.eq('ssoc22App.chofer.delete.question');
    await choferDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(choferComponentsPage.title), 5000);

    expect(await choferComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
