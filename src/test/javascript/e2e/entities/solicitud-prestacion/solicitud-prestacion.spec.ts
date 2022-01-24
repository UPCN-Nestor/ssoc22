import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SolicitudPrestacionComponentsPage,
  SolicitudPrestacionDeleteDialog,
  SolicitudPrestacionUpdatePage,
} from './solicitud-prestacion.page-object';

const expect = chai.expect;

describe('SolicitudPrestacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let solicitudPrestacionComponentsPage: SolicitudPrestacionComponentsPage;
  let solicitudPrestacionUpdatePage: SolicitudPrestacionUpdatePage;
  let solicitudPrestacionDeleteDialog: SolicitudPrestacionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SolicitudPrestacions', async () => {
    await navBarPage.goToEntity('solicitud-prestacion');
    solicitudPrestacionComponentsPage = new SolicitudPrestacionComponentsPage();
    await browser.wait(ec.visibilityOf(solicitudPrestacionComponentsPage.title), 5000);
    expect(await solicitudPrestacionComponentsPage.getTitle()).to.eq('ssoc22App.solicitudPrestacion.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(solicitudPrestacionComponentsPage.entities), ec.visibilityOf(solicitudPrestacionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SolicitudPrestacion page', async () => {
    await solicitudPrestacionComponentsPage.clickOnCreateButton();
    solicitudPrestacionUpdatePage = new SolicitudPrestacionUpdatePage();
    expect(await solicitudPrestacionUpdatePage.getPageTitle()).to.eq('ssoc22App.solicitudPrestacion.home.createOrEditLabel');
    await solicitudPrestacionUpdatePage.cancel();
  });

  it('should create and save SolicitudPrestacions', async () => {
    const nbButtonsBeforeCreate = await solicitudPrestacionComponentsPage.countDeleteButtons();

    await solicitudPrestacionComponentsPage.clickOnCreateButton();

    await promise.all([
      solicitudPrestacionUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      solicitudPrestacionUpdatePage.setNumeroInput('5'),
      solicitudPrestacionUpdatePage.setHoraSolicitudInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      solicitudPrestacionUpdatePage.setDomicilioInput('domicilio'),
      solicitudPrestacionUpdatePage.setTelefonoInput('telefono'),
      solicitudPrestacionUpdatePage.setEdadInput('5'),
      solicitudPrestacionUpdatePage.setObservacionesInput('observaciones'),
      solicitudPrestacionUpdatePage.setTipoInput('tipo'),
      solicitudPrestacionUpdatePage.despachoSelectLastOption(),
      solicitudPrestacionUpdatePage.itemNomencladorSelectLastOption(),
      // solicitudPrestacionUpdatePage.insumoSelectLastOption(),
      solicitudPrestacionUpdatePage.individuoSelectLastOption(),
    ]);

    await solicitudPrestacionUpdatePage.save();
    expect(await solicitudPrestacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await solicitudPrestacionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SolicitudPrestacion', async () => {
    const nbButtonsBeforeDelete = await solicitudPrestacionComponentsPage.countDeleteButtons();
    await solicitudPrestacionComponentsPage.clickOnLastDeleteButton();

    solicitudPrestacionDeleteDialog = new SolicitudPrestacionDeleteDialog();
    expect(await solicitudPrestacionDeleteDialog.getDialogTitle()).to.eq('ssoc22App.solicitudPrestacion.delete.question');
    await solicitudPrestacionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(solicitudPrestacionComponentsPage.title), 5000);

    expect(await solicitudPrestacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
