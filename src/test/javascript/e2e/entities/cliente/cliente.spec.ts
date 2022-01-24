import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClienteComponentsPage, ClienteDeleteDialog, ClienteUpdatePage } from './cliente.page-object';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteDeleteDialog: ClienteDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clientes', async () => {
    await navBarPage.goToEntity('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    await browser.wait(ec.visibilityOf(clienteComponentsPage.title), 5000);
    expect(await clienteComponentsPage.getTitle()).to.eq('ssoc22App.cliente.home.title');
    await browser.wait(ec.or(ec.visibilityOf(clienteComponentsPage.entities), ec.visibilityOf(clienteComponentsPage.noResult)), 1000);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle()).to.eq('ssoc22App.cliente.home.createOrEditLabel');
    await clienteUpdatePage.cancel();
  });

  it('should create and save Clientes', async () => {
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

    await clienteComponentsPage.clickOnCreateButton();

    await promise.all([
      clienteUpdatePage.setNombreInput('nombre'),
      clienteUpdatePage.setSocioInput('5'),
      clienteUpdatePage.setSuministroInput('5'),
      clienteUpdatePage.setDniInput('dni'),
      clienteUpdatePage.enPadronSelectLastOption(),
    ]);

    await clienteUpdatePage.save();
    expect(await clienteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cliente', async () => {
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle()).to.eq('ssoc22App.cliente.delete.question');
    await clienteDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(clienteComponentsPage.title), 5000);

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
