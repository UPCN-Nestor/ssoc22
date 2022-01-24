import { element, by, ElementFinder } from 'protractor';

export class ClienteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cliente div table .btn-danger'));
  title = element.all(by.css('jhi-cliente div h2#page-heading span')).first();
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

export class ClienteUpdatePage {
  pageTitle = element(by.id('jhi-cliente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nombreInput = element(by.id('field_nombre'));
  socioInput = element(by.id('field_socio'));
  suministroInput = element(by.id('field_suministro'));
  dniInput = element(by.id('field_dni'));

  enPadronSelect = element(by.id('field_enPadron'));

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

  async setSocioInput(socio: string): Promise<void> {
    await this.socioInput.sendKeys(socio);
  }

  async getSocioInput(): Promise<string> {
    return await this.socioInput.getAttribute('value');
  }

  async setSuministroInput(suministro: string): Promise<void> {
    await this.suministroInput.sendKeys(suministro);
  }

  async getSuministroInput(): Promise<string> {
    return await this.suministroInput.getAttribute('value');
  }

  async setDniInput(dni: string): Promise<void> {
    await this.dniInput.sendKeys(dni);
  }

  async getDniInput(): Promise<string> {
    return await this.dniInput.getAttribute('value');
  }

  async enPadronSelectLastOption(): Promise<void> {
    await this.enPadronSelect.all(by.tagName('option')).last().click();
  }

  async enPadronSelectOption(option: string): Promise<void> {
    await this.enPadronSelect.sendKeys(option);
  }

  getEnPadronSelect(): ElementFinder {
    return this.enPadronSelect;
  }

  async getEnPadronSelectedOption(): Promise<string> {
    return await this.enPadronSelect.element(by.css('option:checked')).getText();
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

export class ClienteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cliente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cliente'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
