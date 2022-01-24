import { element, by, ElementFinder } from 'protractor';

export class TarifaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tarifa div table .btn-danger'));
  title = element.all(by.css('jhi-tarifa div h2#page-heading span')).first();
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

export class TarifaUpdatePage {
  pageTitle = element(by.id('jhi-tarifa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  tipoInput = element(by.id('field_tipo'));
  datosInput = element(by.id('field_datos'));
  vigenciaHastaInput = element(by.id('field_vigenciaHasta'));

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

  async setTipoInput(tipo: string): Promise<void> {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput(): Promise<string> {
    return await this.tipoInput.getAttribute('value');
  }

  async setDatosInput(datos: string): Promise<void> {
    await this.datosInput.sendKeys(datos);
  }

  async getDatosInput(): Promise<string> {
    return await this.datosInput.getAttribute('value');
  }

  async setVigenciaHastaInput(vigenciaHasta: string): Promise<void> {
    await this.vigenciaHastaInput.sendKeys(vigenciaHasta);
  }

  async getVigenciaHastaInput(): Promise<string> {
    return await this.vigenciaHastaInput.getAttribute('value');
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

export class TarifaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tarifa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tarifa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
