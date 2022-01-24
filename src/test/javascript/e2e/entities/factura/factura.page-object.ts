import { element, by, ElementFinder } from 'protractor';

export class FacturaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-factura div table .btn-danger'));
  title = element.all(by.css('jhi-factura div h2#page-heading span')).first();
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

export class FacturaUpdatePage {
  pageTitle = element(by.id('jhi-factura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaEmisionInput = element(by.id('field_fechaEmision'));
  numeroInternoInput = element(by.id('field_numeroInterno'));

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

  async setFechaEmisionInput(fechaEmision: string): Promise<void> {
    await this.fechaEmisionInput.sendKeys(fechaEmision);
  }

  async getFechaEmisionInput(): Promise<string> {
    return await this.fechaEmisionInput.getAttribute('value');
  }

  async setNumeroInternoInput(numeroInterno: string): Promise<void> {
    await this.numeroInternoInput.sendKeys(numeroInterno);
  }

  async getNumeroInternoInput(): Promise<string> {
    return await this.numeroInternoInput.getAttribute('value');
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

export class FacturaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-factura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-factura'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
