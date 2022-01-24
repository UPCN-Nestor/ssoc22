import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';

@Component({
  templateUrl: './regla-prestacion-delete-dialog.component.html',
})
export class ReglaPrestacionDeleteDialogComponent {
  reglaPrestacion?: IReglaPrestacion;

  constructor(protected reglaPrestacionService: ReglaPrestacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reglaPrestacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
