import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemFacturaComponentsPage, ItemFacturaDeleteDialog, ItemFacturaUpdatePage } from './item-factura.page-object';

const expect = chai.expect;

describe('ItemFactura e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemFacturaComponentsPage: ItemFacturaComponentsPage;
  let itemFacturaUpdatePage: ItemFacturaUpdatePage;
  let itemFacturaDeleteDialog: ItemFacturaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemFacturas', async () => {
    await navBarPage.goToEntity('item-factura');
    itemFacturaComponentsPage = new ItemFacturaComponentsPage();
    await browser.wait(ec.visibilityOf(itemFacturaComponentsPage.title), 5000);
    expect(await itemFacturaComponentsPage.getTitle()).to.eq('ssoc22App.itemFactura.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(itemFacturaComponentsPage.entities), ec.visibilityOf(itemFacturaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ItemFactura page', async () => {
    await itemFacturaComponentsPage.clickOnCreateButton();
    itemFacturaUpdatePage = new ItemFacturaUpdatePage();
    expect(await itemFacturaUpdatePage.getPageTitle()).to.eq('ssoc22App.itemFactura.home.createOrEditLabel');
    await itemFacturaUpdatePage.cancel();
  });

  it('should create and save ItemFacturas', async () => {
    const nbButtonsBeforeCreate = await itemFacturaComponentsPage.countDeleteButtons();

    await itemFacturaComponentsPage.clickOnCreateButton();

    await promise.all([itemFacturaUpdatePage.clienteSelectLastOption(), itemFacturaUpdatePage.facturaSelectLastOption()]);

    await itemFacturaUpdatePage.save();
    expect(await itemFacturaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemFacturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemFactura', async () => {
    const nbButtonsBeforeDelete = await itemFacturaComponentsPage.countDeleteButtons();
    await itemFacturaComponentsPage.clickOnLastDeleteButton();

    itemFacturaDeleteDialog = new ItemFacturaDeleteDialog();
    expect(await itemFacturaDeleteDialog.getDialogTitle()).to.eq('ssoc22App.itemFactura.delete.question');
    await itemFacturaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(itemFacturaComponentsPage.title), 5000);

    expect(await itemFacturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
