import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MovimientoStockComponentsPage, MovimientoStockDeleteDialog, MovimientoStockUpdatePage } from './movimiento-stock.page-object';

const expect = chai.expect;

describe('MovimientoStock e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let movimientoStockComponentsPage: MovimientoStockComponentsPage;
  let movimientoStockUpdatePage: MovimientoStockUpdatePage;
  let movimientoStockDeleteDialog: MovimientoStockDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MovimientoStocks', async () => {
    await navBarPage.goToEntity('movimiento-stock');
    movimientoStockComponentsPage = new MovimientoStockComponentsPage();
    await browser.wait(ec.visibilityOf(movimientoStockComponentsPage.title), 5000);
    expect(await movimientoStockComponentsPage.getTitle()).to.eq('ssoc22App.movimientoStock.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(movimientoStockComponentsPage.entities), ec.visibilityOf(movimientoStockComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MovimientoStock page', async () => {
    await movimientoStockComponentsPage.clickOnCreateButton();
    movimientoStockUpdatePage = new MovimientoStockUpdatePage();
    expect(await movimientoStockUpdatePage.getPageTitle()).to.eq('ssoc22App.movimientoStock.home.createOrEditLabel');
    await movimientoStockUpdatePage.cancel();
  });

  it('should create and save MovimientoStocks', async () => {
    const nbButtonsBeforeCreate = await movimientoStockComponentsPage.countDeleteButtons();

    await movimientoStockComponentsPage.clickOnCreateButton();

    await promise.all([
      movimientoStockUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      movimientoStockUpdatePage.setCantidadInput('5'),
      movimientoStockUpdatePage.insumoSelectLastOption(),
    ]);

    await movimientoStockUpdatePage.save();
    expect(await movimientoStockUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await movimientoStockComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MovimientoStock', async () => {
    const nbButtonsBeforeDelete = await movimientoStockComponentsPage.countDeleteButtons();
    await movimientoStockComponentsPage.clickOnLastDeleteButton();

    movimientoStockDeleteDialog = new MovimientoStockDeleteDialog();
    expect(await movimientoStockDeleteDialog.getDialogTitle()).to.eq('ssoc22App.movimientoStock.delete.question');
    await movimientoStockDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(movimientoStockComponentsPage.title), 5000);

    expect(await movimientoStockComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
