import { element, by, ElementFinder } from 'protractor';

export class DespachoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-despacho div table .btn-danger'));
  title = element.all(by.css('jhi-despacho div h2#page-heading span')).first();
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

export class DespachoUpdatePage {
  pageTitle = element(by.id('jhi-despacho-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  horaSalidaInput = element(by.id('field_horaSalida'));
  horaLlegadaInput = element(by.id('field_horaLlegada'));
  horaLibreInput = element(by.id('field_horaLibre'));

  prestadorSelect = element(by.id('field_prestador'));
  choferSelect = element(by.id('field_chofer'));
  medicoSelect = element(by.id('field_medico'));
  enfermeroSelect = element(by.id('field_enfermero'));
  movilSelect = element(by.id('field_movil'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setHoraSalidaInput(horaSalida: string): Promise<void> {
    await this.horaSalidaInput.sendKeys(horaSalida);
  }

  async getHoraSalidaInput(): Promise<string> {
    return await this.horaSalidaInput.getAttribute('value');
  }

  async setHoraLlegadaInput(horaLlegada: string): Promise<void> {
    await this.horaLlegadaInput.sendKeys(horaLlegada);
  }

  async getHoraLlegadaInput(): Promise<string> {
    return await this.horaLlegadaInput.getAttribute('value');
  }

  async setHoraLibreInput(horaLibre: string): Promise<void> {
    await this.horaLibreInput.sendKeys(horaLibre);
  }

  async getHoraLibreInput(): Promise<string> {
    return await this.horaLibreInput.getAttribute('value');
  }

  async prestadorSelectLastOption(): Promise<void> {
    await this.prestadorSelect.all(by.tagName('option')).last().click();
  }

  async prestadorSelectOption(option: string): Promise<void> {
    await this.prestadorSelect.sendKeys(option);
  }

  getPrestadorSelect(): ElementFinder {
    return this.prestadorSelect;
  }

  async getPrestadorSelectedOption(): Promise<string> {
    return await this.prestadorSelect.element(by.css('option:checked')).getText();
  }

  async choferSelectLastOption(): Promise<void> {
    await this.choferSelect.all(by.tagName('option')).last().click();
  }

  async choferSelectOption(option: string): Promise<void> {
    await this.choferSelect.sendKeys(option);
  }

  getChoferSelect(): ElementFinder {
    return this.choferSelect;
  }

  async getChoferSelectedOption(): Promise<string> {
    return await this.choferSelect.element(by.css('option:checked')).getText();
  }

  async medicoSelectLastOption(): Promise<void> {
    await this.medicoSelect.all(by.tagName('option')).last().click();
  }

  async medicoSelectOption(option: string): Promise<void> {
    await this.medicoSelect.sendKeys(option);
  }

  getMedicoSelect(): ElementFinder {
    return this.medicoSelect;
  }

  async getMedicoSelectedOption(): Promise<string> {
    return await this.medicoSelect.element(by.css('option:checked')).getText();
  }

  async enfermeroSelectLastOption(): Promise<void> {
    await this.enfermeroSelect.all(by.tagName('option')).last().click();
  }

  async enfermeroSelectOption(option: string): Promise<void> {
    await this.enfermeroSelect.sendKeys(option);
  }

  getEnfermeroSelect(): ElementFinder {
    return this.enfermeroSelect;
  }

  async getEnfermeroSelectedOption(): Promise<string> {
    return await this.enfermeroSelect.element(by.css('option:checked')).getText();
  }

  async movilSelectLastOption(): Promise<void> {
    await this.movilSelect.all(by.tagName('option')).last().click();
  }

  async movilSelectOption(option: string): Promise<void> {
    await this.movilSelect.sendKeys(option);
  }

  getMovilSelect(): ElementFinder {
    return this.movilSelect;
  }

  async getMovilSelectedOption(): Promise<string> {
    return await this.movilSelect.element(by.css('option:checked')).getText();
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

export class DespachoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-despacho-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-despacho'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
