import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDespacho } from '../despacho.model';
import { DespachoService } from '../service/despacho.service';

@Component({
  templateUrl: './despacho-delete-dialog.component.html',
})
export class DespachoDeleteDialogComponent {
  despacho?: IDespacho;

  constructor(protected despachoService: DespachoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.despachoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
