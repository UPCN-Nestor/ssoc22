import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemNomencladorComponentsPage, ItemNomencladorDeleteDialog, ItemNomencladorUpdatePage } from './item-nomenclador.page-object';

const expect = chai.expect;

describe('ItemNomenclador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemNomencladorComponentsPage: ItemNomencladorComponentsPage;
  let itemNomencladorUpdatePage: ItemNomencladorUpdatePage;
  let itemNomencladorDeleteDialog: ItemNomencladorDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemNomencladors', async () => {
    await navBarPage.goToEntity('item-nomenclador');
    itemNomencladorComponentsPage = new ItemNomencladorComponentsPage();
    await browser.wait(ec.visibilityOf(itemNomencladorComponentsPage.title), 5000);
    expect(await itemNomencladorComponentsPage.getTitle()).to.eq('ssoc22App.itemNomenclador.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(itemNomencladorComponentsPage.entities), ec.visibilityOf(itemNomencladorComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ItemNomenclador page', async () => {
    await itemNomencladorComponentsPage.clickOnCreateButton();
    itemNomencladorUpdatePage = new ItemNomencladorUpdatePage();
    expect(await itemNomencladorUpdatePage.getPageTitle()).to.eq('ssoc22App.itemNomenclador.home.createOrEditLabel');
    await itemNomencladorUpdatePage.cancel();
  });

  it('should create and save ItemNomencladors', async () => {
    const nbButtonsBeforeCreate = await itemNomencladorComponentsPage.countDeleteButtons();

    await itemNomencladorComponentsPage.clickOnCreateButton();

    await promise.all([
      itemNomencladorUpdatePage.setNombreInput('nombre'),
      itemNomencladorUpdatePage.setDiasCarenciaInput('5'),
      itemNomencladorUpdatePage.setCodigoInput('codigo'),
      itemNomencladorUpdatePage.prestacionSelectLastOption(),
    ]);

    await itemNomencladorUpdatePage.save();
    expect(await itemNomencladorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemNomencladorComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ItemNomenclador', async () => {
    const nbButtonsBeforeDelete = await itemNomencladorComponentsPage.countDeleteButtons();
    await itemNomencladorComponentsPage.clickOnLastDeleteButton();

    itemNomencladorDeleteDialog = new ItemNomencladorDeleteDialog();
    expect(await itemNomencladorDeleteDialog.getDialogTitle()).to.eq('ssoc22App.itemNomenclador.delete.question');
    await itemNomencladorDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(itemNomencladorComponentsPage.title), 5000);

    expect(await itemNomencladorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
