import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdhesion } from '../adhesion.model';
import { AdhesionService } from '../service/adhesion.service';

@Component({
  templateUrl: './adhesion-delete-dialog.component.html',
})
export class AdhesionDeleteDialogComponent {
  adhesion?: IAdhesion;

  constructor(protected adhesionService: AdhesionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adhesionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
