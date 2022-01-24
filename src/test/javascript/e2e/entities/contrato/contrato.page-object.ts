import { element, by, ElementFinder } from 'protractor';

export class ContratoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contrato div table .btn-danger'));
  title = element.all(by.css('jhi-contrato div h2#page-heading span')).first();
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

export class ContratoUpdatePage {
  pageTitle = element(by.id('jhi-contrato-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaAltaInput = element(by.id('field_fechaAlta'));
  particularidadesInput = element(by.id('field_particularidades'));

  planSelect = element(by.id('field_plan'));
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

  async setParticularidadesInput(particularidades: string): Promise<void> {
    await this.particularidadesInput.sendKeys(particularidades);
  }

  async getParticularidadesInput(): Promise<string> {
    return await this.particularidadesInput.getAttribute('value');
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

export class ContratoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contrato-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contrato'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
