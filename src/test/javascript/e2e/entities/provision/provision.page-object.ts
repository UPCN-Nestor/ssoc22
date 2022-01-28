import { element, by, ElementFinder } from 'protractor';

export class ProvisionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-provision div table .btn-danger'));
  title = element.all(by.css('jhi-provision div h2#page-heading span')).first();
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

export class ProvisionUpdatePage {
  pageTitle = element(by.id('jhi-provision-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));

  itemNomencladorSelect = element(by.id('field_itemNomenclador'));
  prestacionSelect = element(by.id('field_prestacion'));
  insumoSelect = element(by.id('field_insumo'));
  planSelect = element(by.id('field_plan'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
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

  async planSelectLastOption(): Promise<void> {
    await this.planSelect.all(by.tagName('option')).last().click();
  }

  async planSelectOption(option: string): Promise<void> {
    await this.planSelect.sendKeys(option);
  }

  getPlanSelect(): ElementFinder {
    return this.planSelect;
  }

  async getPlanSelectedOption(): Promise<string> {
    return await this.planSelect.element(by.css('option:checked')).getText();
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

export class ProvisionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-provision-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-provision'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
