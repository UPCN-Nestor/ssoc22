import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { IndividuoComponentsPage, IndividuoDeleteDialog, IndividuoUpdatePage } from './individuo.page-object';

const expect = chai.expect;

describe('Individuo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let individuoComponentsPage: IndividuoComponentsPage;
  let individuoUpdatePage: IndividuoUpdatePage;
  let individuoDeleteDialog: IndividuoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Individuos', async () => {
    await navBarPage.goToEntity('individuo');
    individuoComponentsPage = new IndividuoComponentsPage();
    await browser.wait(ec.visibilityOf(individuoComponentsPage.title), 5000);
    expect(await individuoComponentsPage.getTitle()).to.eq('ssoc22App.individuo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(individuoComponentsPage.entities), ec.visibilityOf(individuoComponentsPage.noResult)), 1000);
  });

  it('should load create Individuo page', async () => {
    await individuoComponentsPage.clickOnCreateButton();
    individuoUpdatePage = new IndividuoUpdatePage();
    expect(await individuoUpdatePage.getPageTitle()).to.eq('ssoc22App.individuo.home.createOrEditLabel');
    await individuoUpdatePage.cancel();
  });

  it('should create and save Individuos', async () => {
    const nbButtonsBeforeCreate = await individuoComponentsPage.countDeleteButtons();

    await individuoComponentsPage.clickOnCreateButton();

    await promise.all([individuoUpdatePage.setNombreInput('nombre'), individuoUpdatePage.setDniInput('dni')]);

    await individuoUpdatePage.save();
    expect(await individuoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await individuoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Individuo', async () => {
    const nbButtonsBeforeDelete = await individuoComponentsPage.countDeleteButtons();
    await individuoComponentsPage.clickOnLastDeleteButton();

    individuoDeleteDialog = new IndividuoDeleteDialog();
    expect(await individuoDeleteDialog.getDialogTitle()).to.eq('ssoc22App.individuo.delete.question');
    await individuoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(individuoComponentsPage.title), 5000);

    expect(await individuoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
