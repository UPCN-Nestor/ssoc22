import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnfermero } from '../enfermero.model';
import { EnfermeroService } from '../service/enfermero.service';

@Component({
  templateUrl: './enfermero-delete-dialog.component.html',
})
export class EnfermeroDeleteDialogComponent {
  enfermero?: IEnfermero;

  constructor(protected enfermeroService: EnfermeroService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enfermeroService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
