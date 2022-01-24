import { element, by, ElementFinder } from 'protractor';

export class AdhesionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adhesion div table .btn-danger'));
  title = element.all(by.css('jhi-adhesion div h2#page-heading span')).first();
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

export class AdhesionUpdatePage {
  pageTitle = element(by.id('jhi-adhesion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaAltaInput = element(by.id('field_fechaAlta'));
  estadoInput = element(by.id('field_estado'));
  condicionInput = element(by.id('field_condicion'));

  individuoSelect = element(by.id('field_individuo'));
  clienteSelect = element(by.id('field_cliente'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFechaAltaInput(fechaAlta: string): Promise<void> {
    await this.fechaAltaInput.sendKeys(fechaAlta);
  }

  async getFechaAltaInput(): Promise<string> {
    return await this.fechaAltaInput.getAttribute('value');
  }

  async setEstadoInput(estado: string): Promise<void> {
    await this.estadoInput.sendKeys(estado);
  }

  async getEstadoInput(): Promise<string> {
    return await this.estadoInput.getAttribute('value');
  }

  async setCondicionInput(condicion: string): Promise<void> {
    await this.condicionInput.sendKeys(condicion);
  }

  async getCondicionInput(): Promise<string> {
    return await this.condicionInput.getAttribute('value');
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

  async clienteSelectLastOption(): Promise<void> {
    await this.clienteSelect.all(by.tagName('option')).last().click();
  }

  async clienteSelectOption(option: string): Promise<void> {
    await this.clienteSelect.sendKeys(option);
  }

  getClienteSelect(): ElementFinder {
    return this.clienteSelect;
  }

  async getClienteSelectedOption(): Promise<string> {
    return await this.clienteSelect.element(by.css('option:checked')).getText();
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

export class AdhesionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adhesion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adhesion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
