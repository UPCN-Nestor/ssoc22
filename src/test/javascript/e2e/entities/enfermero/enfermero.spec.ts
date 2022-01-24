import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EnfermeroComponentsPage, EnfermeroDeleteDialog, EnfermeroUpdatePage } from './enfermero.page-object';

const expect = chai.expect;

describe('Enfermero e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enfermeroComponentsPage: EnfermeroComponentsPage;
  let enfermeroUpdatePage: EnfermeroUpdatePage;
  let enfermeroDeleteDialog: EnfermeroDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Enfermeros', async () => {
    await navBarPage.goToEntity('enfermero');
    enfermeroComponentsPage = new EnfermeroComponentsPage();
    await browser.wait(ec.visibilityOf(enfermeroComponentsPage.title), 5000);
    expect(await enfermeroComponentsPage.getTitle()).to.eq('ssoc22App.enfermero.home.title');
    await browser.wait(ec.or(ec.visibilityOf(enfermeroComponentsPage.entities), ec.visibilityOf(enfermeroComponentsPage.noResult)), 1000);
  });

  it('should load create Enfermero page', async () => {
    await enfermeroComponentsPage.clickOnCreateButton();
    enfermeroUpdatePage = new EnfermeroUpdatePage();
    expect(await enfermeroUpdatePage.getPageTitle()).to.eq('ssoc22App.enfermero.home.createOrEditLabel');
    await enfermeroUpdatePage.cancel();
  });

  it('should create and save Enfermeros', async () => {
    const nbButtonsBeforeCreate = await enfermeroComponentsPage.countDeleteButtons();

    await enfermeroComponentsPage.clickOnCreateButton();

    await promise.all([enfermeroUpdatePage.setNombreInput('nombre')]);

    await enfermeroUpdatePage.save();
    expect(await enfermeroUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await enfermeroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Enfermero', async () => {
    const nbButtonsBeforeDelete = await enfermeroComponentsPage.countDeleteButtons();
    await enfermeroComponentsPage.clickOnLastDeleteButton();

    enfermeroDeleteDialog = new EnfermeroDeleteDialog();
    expect(await enfermeroDeleteDialog.getDialogTitle()).to.eq('ssoc22App.enfermero.delete.question');
    await enfermeroDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(enfermeroComponentsPage.title), 5000);

    expect(await enfermeroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
