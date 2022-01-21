import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrestacion } from '../prestacion.model';
import { PrestacionService } from '../service/prestacion.service';

@Component({
  templateUrl: './prestacion-delete-dialog.component.html',
})
export class PrestacionDeleteDialogComponent {
  prestacion?: IPrestacion;

  constructor(protected prestacionService: PrestacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prestacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
