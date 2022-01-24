import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProvisionComponentsPage, ProvisionDeleteDialog, ProvisionUpdatePage } from './provision.page-object';

const expect = chai.expect;

describe('Provision e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let provisionComponentsPage: ProvisionComponentsPage;
  let provisionUpdatePage: ProvisionUpdatePage;
  let provisionDeleteDialog: ProvisionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Provisions', async () => {
    await navBarPage.goToEntity('provision');
    provisionComponentsPage = new ProvisionComponentsPage();
    await browser.wait(ec.visibilityOf(provisionComponentsPage.title), 5000);
    expect(await provisionComponentsPage.getTitle()).to.eq('ssoc22App.provision.home.title');
    await browser.wait(ec.or(ec.visibilityOf(provisionComponentsPage.entities), ec.visibilityOf(provisionComponentsPage.noResult)), 1000);
  });

  it('should load create Provision page', async () => {
    await provisionComponentsPage.clickOnCreateButton();
    provisionUpdatePage = new ProvisionUpdatePage();
    expect(await provisionUpdatePage.getPageTitle()).to.eq('ssoc22App.provision.home.createOrEditLabel');
    await provisionUpdatePage.cancel();
  });

  it('should create and save Provisions', async () => {
    const nbButtonsBeforeCreate = await provisionComponentsPage.countDeleteButtons();

    await provisionComponentsPage.clickOnCreateButton();

    await promise.all([
      provisionUpdatePage.itemNomencladorSelectLastOption(),
      // provisionUpdatePage.insumoSelectLastOption(),
      provisionUpdatePage.planSelectLastOption(),
    ]);

    await provisionUpdatePage.save();
    expect(await provisionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await provisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Provision', async () => {
    const nbButtonsBeforeDelete = await provisionComponentsPage.countDeleteButtons();
    await provisionComponentsPage.clickOnLastDeleteButton();

    provisionDeleteDialog = new ProvisionDeleteDialog();
    expect(await provisionDeleteDialog.getDialogTitle()).to.eq('ssoc22App.provision.delete.question');
    await provisionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(provisionComponentsPage.title), 5000);

    expect(await provisionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
