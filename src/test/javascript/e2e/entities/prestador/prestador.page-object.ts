import { element, by, ElementFinder } from 'protractor';

export class PrestadorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prestador div table .btn-danger'));
  title = element.all(by.css('jhi-prestador div h2#page-heading span')).first();
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

export class PrestadorUpdatePage {
  pageTitle = element(by.id('jhi-prestador-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nombreInput = element(by.id('field_nombre'));
  condicionInput = element(by.id('field_condicion'));

  itemNomencladorSelect = element(by.id('field_itemNomenclador'));

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

  async setCondicionInput(condicion: string): Promise<void> {
    await this.condicionInput.sendKeys(condicion);
  }

  async getCondicionInput(): Promise<string> {
    return await this.condicionInput.getAttribute('value');
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

export class PrestadorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prestador-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prestador'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
