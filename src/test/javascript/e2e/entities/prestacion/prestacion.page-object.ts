import { element, by, ElementFinder } from 'protractor';

export class PrestacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prestacion div table .btn-danger'));
  title = element.all(by.css('jhi-prestacion div h2#page-heading span')).first();
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

export class PrestacionUpdatePage {
  pageTitle = element(by.id('jhi-prestacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  tipoInput = element(by.id('field_tipo'));
  precioInput = element(by.id('field_precio'));
  carenciaInput = element(by.id('field_carencia'));
  nombreInput = element(by.id('field_nombre'));
  codigoInput = element(by.id('field_codigo'));

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

  async setTipoInput(tipo: string): Promise<void> {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput(): Promise<string> {
    return await this.tipoInput.getAttribute('value');
  }

  async setPrecioInput(precio: string): Promise<void> {
    await this.precioInput.sendKeys(precio);
  }

  async getPrecioInput(): Promise<string> {
    return await this.precioInput.getAttribute('value');
  }

  async setCarenciaInput(carencia: string): Promise<void> {
    await this.carenciaInput.sendKeys(carencia);
  }

  async getCarenciaInput(): Promise<string> {
    return await this.carenciaInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
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

export class PrestacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prestacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prestacion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
