import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovil } from '../movil.model';
import { MovilService } from '../service/movil.service';

@Component({
  templateUrl: './movil-delete-dialog.component.html',
})
export class MovilDeleteDialogComponent {
  movil?: IMovil;

  constructor(protected movilService: MovilService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movilService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
