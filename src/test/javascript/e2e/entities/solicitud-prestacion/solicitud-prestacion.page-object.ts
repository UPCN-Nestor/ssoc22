import { element, by, ElementFinder } from 'protractor';

export class SolicitudPrestacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-solicitud-prestacion div table .btn-danger'));
  title = element.all(by.css('jhi-solicitud-prestacion div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SolicitudPrestacionUpdatePage {
  pageTitle = element(by.id('jhi-solicitud-prestacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  tipoInput = element(by.id('field_tipo'));
  numeroInput = element(by.id('field_numero'));
  horaSolicitudInput = element(by.id('field_horaSolicitud'));
  domicilioInput = element(by.id('field_domicilio'));
  telefonoInput = element(by.id('field_telefono'));
  edadInput = element(by.id('field_edad'));
  motivoLlamadoInput = element(by.id('field_motivoLlamado'));
  seEfectuoInput = element(by.id('field_seEfectuo'));
  internacionInput = element(by.id('field_internacion'));
  observacionesInput = element(by.id('field_observaciones'));

  despachoSelect = element(by.id('field_despacho'));
  usuarioSolicitudSelect = element(by.id('field_usuarioSolicitud'));
  itemNomencladorSelect = element(by.id('field_itemNomenclador'));
  insumoSelect = element(by.id('field_insumo'));
  individuoSelect = element(by.id('field_individuo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTipoInput(tipo: string): Promise<void> {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput(): Promise<string> {
    return await this.tipoInput.getAttribute('value');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setHoraSolicitudInput(horaSolicitud: string): Promise<void> {
    await this.horaSolicitudInput.sendKeys(horaSolicitud);
  }

  async getHoraSolicitudInput(): Promise<string> {
    return await this.horaSolicitudInput.getAttribute('value');
  }

  async setDomicilioInput(domicilio: string): Promise<void> {
    await this.domicilioInput.sendKeys(domicilio);
  }

  async getDomicilioInput(): Promise<string> {
    return await this.domicilioInput.getAttribute('value');
  }

  async setTelefonoInput(telefono: string): Promise<void> {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput(): Promise<string> {
    return await this.telefonoInput.getAttribute('value');
  }

  async setEdadInput(edad: string): Promise<void> {
    await this.edadInput.sendKeys(edad);
  }

  async getEdadInput(): Promise<string> {
    return await this.edadInput.getAttribute('value');
  }

  async setMotivoLlamadoInput(motivoLlamado: string): Promise<void> {
    await this.motivoLlamadoInput.sendKeys(motivoLlamado);
  }

  async getMotivoLlamadoInput(): Promise<string> {
    return await this.motivoLlamadoInput.getAttribute('value');
  }

  getSeEfectuoInput(): ElementFinder {
    return this.seEfectuoInput;
  }

  getInternacionInput(): ElementFinder {
    return this.internacionInput;
  }

  async setObservacionesInput(observaciones: string): Promise<void> {
    await this.observacionesInput.sendKeys(observaciones);
  }

  async getObservacionesInput(): Promise<string> {
    return await this.observacionesInput.getAttribute('value');
  }

  async despachoSelectLastOption(): Promise<void> {
    await this.despachoSelect.all(by.tagName('option')).last().click();
  }

  async despachoSelectOption(option: string): Promise<void> {
    await this.despachoSelect.sendKeys(option);
  }

  getDespachoSelect(): ElementFinder {
    return this.despachoSelect;
  }

  async getDespachoSelectedOption(): Promise<string> {
    return await this.despachoSelect.element(by.css('option:checked')).getText();
  }

  async usuarioSolicitudSelectLastOption(): Promise<void> {
    await this.usuarioSolicitudSelect.all(by.tagName('option')).last().click();
  }

  async usuarioSolicitudSelectOption(option: string): Promise<void> {
    await this.usuarioSolicitudSelect.sendKeys(option);
  }

  getUsuarioSolicitudSelect(): ElementFinder {
    return this.usuarioSolicitudSelect;
  }

  async getUsuarioSolicitudSelectedOption(): Promise<string> {
    return await this.usuarioSolicitudSelect.element(by.css('option:checked')).getText();
  }

  async itemNomencladorSelectLastOption(): Promise<void> {
    await this.itemNomencladorSelect.all(by.tagName('option')).last().click();
  }

  async itemNomencladorSelectOption(option: string): Promise<void> {
    await this.itemNomencladorSelect.sendKeys(option);
  }

  getItemNomencladorSelect(): ElementFinder {
    return this.itemNomencladorSelect;
  }

  async getItemNomencladorSelectedOption(): Promise<string> {
    return await this.itemNomencladorSelect.element(by.css('option:checked')).getText();
  }

  async insumoSelectLastOption(): Promise<void> {
    await this.insumoSelect.all(by.tagName('option')).last().click();
  }

  async insumoSelectOption(option: string): Promise<void> {
    await this.insumoSelect.sendKeys(option);
  }

  getInsumoSelect(): ElementFinder {
    return this.insumoSelect;
  }

  async getInsumoSelectedOption(): Promise<string> {
    return await this.insumoSelect.element(by.css('option:checked')).getText();
  }

  async individuoSelectLastOption(): Promise<void> {
    await this.individuoSelect.all(by.tagName('option')).last().click();
  }

  async individuoSelectOption(option: string): Promise<void> {
    await this.individuoSelect.sendKeys(option);
  }

  getIndividuoSelect(): ElementFinder {
    return this.individuoSelect;
  }

  async getIndividuoSelectedOption(): Promise<string> {
    return await this.individuoSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SolicitudPrestacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-solicitudPrestacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-solicitudPrestacion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
