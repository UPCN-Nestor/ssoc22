import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscripcion } from '../subscripcion.model';
import { SubscripcionService } from '../service/subscripcion.service';

@Component({
  templateUrl: './subscripcion-delete-dialog.component.html',
})
export class SubscripcionDeleteDialogComponent {
  subscripcion?: ISubscripcion;

  constructor(protected subscripcionService: SubscripcionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscripcionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
