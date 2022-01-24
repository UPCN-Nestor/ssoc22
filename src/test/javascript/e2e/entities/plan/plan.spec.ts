import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlanComponentsPage, PlanDeleteDialog, PlanUpdatePage } from './plan.page-object';

const expect = chai.expect;

describe('Plan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planComponentsPage: PlanComponentsPage;
  let planUpdatePage: PlanUpdatePage;
  let planDeleteDialog: PlanDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Plans', async () => {
    await navBarPage.goToEntity('plan');
    planComponentsPage = new PlanComponentsPage();
    await browser.wait(ec.visibilityOf(planComponentsPage.title), 5000);
    expect(await planComponentsPage.getTitle()).to.eq('ssoc22App.plan.home.title');
    await browser.wait(ec.or(ec.visibilityOf(planComponentsPage.entities), ec.visibilityOf(planComponentsPage.noResult)), 1000);
  });

  it('should load create Plan page', async () => {
    await planComponentsPage.clickOnCreateButton();
    planUpdatePage = new PlanUpdatePage();
    expect(await planUpdatePage.getPageTitle()).to.eq('ssoc22App.plan.home.createOrEditLabel');
    await planUpdatePage.cancel();
  });

  it('should create and save Plans', async () => {
    const nbButtonsBeforeCreate = await planComponentsPage.countDeleteButtons();

    await planComponentsPage.clickOnCreateButton();

    await promise.all([
      planUpdatePage.setHabilitacionesInput('habilitaciones'),
      planUpdatePage.setDescuentosInput('descuentos'),
      planUpdatePage.setRestriccionesInput('restricciones'),
    ]);

    await planUpdatePage.save();
    expect(await planUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await planComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Plan', async () => {
    const nbButtonsBeforeDelete = await planComponentsPage.countDeleteButtons();
    await planComponentsPage.clickOnLastDeleteButton();

    planDeleteDialog = new PlanDeleteDialog();
    expect(await planDeleteDialog.getDialogTitle()).to.eq('ssoc22App.plan.delete.question');
    await planDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(planComponentsPage.title), 5000);

    expect(await planComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
