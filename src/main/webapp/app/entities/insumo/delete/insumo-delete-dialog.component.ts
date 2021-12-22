import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInsumo } from '../insumo.model';
import { InsumoService } from '../service/insumo.service';

@Component({
  templateUrl: './insumo-delete-dialog.component.html',
})
export class InsumoDeleteDialogComponent {
  insumo?: IInsumo;

  constructor(protected insumoService: InsumoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.insumoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
