import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TarifaComponentsPage, TarifaDeleteDialog, TarifaUpdatePage } from './tarifa.page-object';

const expect = chai.expect;

describe('Tarifa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tarifaComponentsPage: TarifaComponentsPage;
  let tarifaUpdatePage: TarifaUpdatePage;
  let tarifaDeleteDialog: TarifaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tarifas', async () => {
    await navBarPage.goToEntity('tarifa');
    tarifaComponentsPage = new TarifaComponentsPage();
    await browser.wait(ec.visibilityOf(tarifaComponentsPage.title), 5000);
    expect(await tarifaComponentsPage.getTitle()).to.eq('ssoc22App.tarifa.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tarifaComponentsPage.entities), ec.visibilityOf(tarifaComponentsPage.noResult)), 1000);
  });

  it('should load create Tarifa page', async () => {
    await tarifaComponentsPage.clickOnCreateButton();
    tarifaUpdatePage = new TarifaUpdatePage();
    expect(await tarifaUpdatePage.getPageTitle()).to.eq('ssoc22App.tarifa.home.createOrEditLabel');
    await tarifaUpdatePage.cancel();
  });

  it('should create and save Tarifas', async () => {
    const nbButtonsBeforeCreate = await tarifaComponentsPage.countDeleteButtons();

    await tarifaComponentsPage.clickOnCreateButton();

    await promise.all([
      tarifaUpdatePage.setTipoInput('tipo'),
      tarifaUpdatePage.setDatosInput('datos'),
      tarifaUpdatePage.setVigenciaHastaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      tarifaUpdatePage.planSelectLastOption(),
    ]);

    await tarifaUpdatePage.save();
    expect(await tarifaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tarifaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tarifa', async () => {
    const nbButtonsBeforeDelete = await tarifaComponentsPage.countDeleteButtons();
    await tarifaComponentsPage.clickOnLastDeleteButton();

    tarifaDeleteDialog = new TarifaDeleteDialog();
    expect(await tarifaDeleteDialog.getDialogTitle()).to.eq('ssoc22App.tarifa.delete.question');
    await tarifaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(tarifaComponentsPage.title), 5000);

    expect(await tarifaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
