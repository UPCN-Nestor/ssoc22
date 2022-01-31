import { element, by, ElementFinder } from 'protractor';

export class PlanComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-plan div table .btn-danger'));
  title = element.all(by.css('jhi-plan div h2#page-heading span')).first();
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

export class PlanUpdatePage {
  pageTitle = element(by.id('jhi-plan-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nombreInput = element(by.id('field_nombre'));
  habilitacionesInput = element(by.id('field_habilitaciones'));
  descuentosInput = element(by.id('field_descuentos'));
  restriccionesInput = element(by.id('field_restricciones'));

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

  async setHabilitacionesInput(habilitaciones: string): Promise<void> {
    await this.habilitacionesInput.sendKeys(habilitaciones);
  }

  async getHabilitacionesInput(): Promise<string> {
    return await this.habilitacionesInput.getAttribute('value');
  }

  async setDescuentosInput(descuentos: string): Promise<void> {
    await this.descuentosInput.sendKeys(descuentos);
  }

  async getDescuentosInput(): Promise<string> {
    return await this.descuentosInput.getAttribute('value');
  }

  async setRestriccionesInput(restricciones: string): Promise<void> {
    await this.restriccionesInput.sendKeys(restricciones);
  }

  async getRestriccionesInput(): Promise<string> {
    return await this.restriccionesInput.getAttribute('value');
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

export class PlanDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-plan-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-plan'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
