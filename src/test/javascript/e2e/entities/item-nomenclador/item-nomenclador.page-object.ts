import { element, by, ElementFinder } from 'protractor';

export class ItemNomencladorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-nomenclador div table .btn-danger'));
  title = element.all(by.css('jhi-item-nomenclador div h2#page-heading span')).first();
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

export class ItemNomencladorUpdatePage {
  pageTitle = element(by.id('jhi-item-nomenclador-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nombreInput = element(by.id('field_nombre'));
  carenciaInput = element(by.id('field_carencia'));
  codigoInput = element(by.id('field_codigo'));

  prestacionSelect = element(by.id('field_prestacion'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setCarenciaInput(carencia: string): Promise<void> {
    await this.carenciaInput.sendKeys(carencia);
  }

  async getCarenciaInput(): Promise<string> {
    return await this.carenciaInput.getAttribute('value');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async prestacionSelectLastOption(): Promise<void> {
    await this.prestacionSelect.all(by.tagName('option')).last().click();
  }

  async prestacionSelectOption(option: string): Promise<void> {
    await this.prestacionSelect.sendKeys(option);
  }

  getPrestacionSelect(): ElementFinder {
    return this.prestacionSelect;
  }

  async getPrestacionSelectedOption(): Promise<string> {
    return await this.prestacionSelect.element(by.css('option:checked')).getText();
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

export class ItemNomencladorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemNomenclador-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemNomenclador'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
