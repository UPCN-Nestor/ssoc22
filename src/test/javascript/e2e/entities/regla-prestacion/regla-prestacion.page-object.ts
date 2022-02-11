import { element, by, ElementFinder } from 'protractor';

export class ReglaPrestacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-regla-prestacion div table .btn-danger'));
  title = element.all(by.css('jhi-regla-prestacion div h2#page-heading span')).first();
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

export class ReglaPrestacionUpdatePage {
  pageTitle = element(by.id('jhi-regla-prestacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  codigoReglaInput = element(by.id('field_codigoRegla'));
  tipoReglaInput = element(by.id('field_tipoRegla'));
  datosInput = element(by.id('field_datos'));
  nombreInput = element(by.id('field_nombre'));

  provisionSelect = element(by.id('field_provision'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCodigoReglaInput(codigoRegla: string): Promise<void> {
    await this.codigoReglaInput.sendKeys(codigoRegla);
  }

  async getCodigoReglaInput(): Promise<string> {
    return await this.codigoReglaInput.getAttribute('value');
  }

  async setTipoReglaInput(tipoRegla: string): Promise<void> {
    await this.tipoReglaInput.sendKeys(tipoRegla);
  }

  async getTipoReglaInput(): Promise<string> {
    return await this.tipoReglaInput.getAttribute('value');
  }

  async setDatosInput(datos: string): Promise<void> {
    await this.datosInput.sendKeys(datos);
  }

  async getDatosInput(): Promise<string> {
    return await this.datosInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async provisionSelectLastOption(): Promise<void> {
    await this.provisionSelect.all(by.tagName('option')).last().click();
  }

  async provisionSelectOption(option: string): Promise<void> {
    await this.provisionSelect.sendKeys(option);
  }

  getProvisionSelect(): ElementFinder {
    return this.provisionSelect;
  }

  async getProvisionSelectedOption(): Promise<string> {
    return await this.provisionSelect.element(by.css('option:checked')).getText();
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

export class ReglaPrestacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reglaPrestacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reglaPrestacion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
