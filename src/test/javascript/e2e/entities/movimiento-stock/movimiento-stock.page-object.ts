import { element, by, ElementFinder } from 'protractor';

export class MovimientoStockComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-movimiento-stock div table .btn-danger'));
  title = element.all(by.css('jhi-movimiento-stock div h2#page-heading span')).first();
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

export class MovimientoStockUpdatePage {
  pageTitle = element(by.id('jhi-movimiento-stock-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaInput = element(by.id('field_fecha'));
  cantidadInput = element(by.id('field_cantidad'));

  insumoSelect = element(by.id('field_insumo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
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

export class MovimientoStockDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-movimientoStock-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-movimientoStock'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
