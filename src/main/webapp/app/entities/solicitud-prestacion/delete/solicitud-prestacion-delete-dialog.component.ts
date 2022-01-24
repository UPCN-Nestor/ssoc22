import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';

@Component({
  templateUrl: './solicitud-prestacion-delete-dialog.component.html',
})
export class SolicitudPrestacionDeleteDialogComponent {
  solicitudPrestacion?: ISolicitudPrestacion;

  constructor(protected solicitudPrestacionService: SolicitudPrestacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.solicitudPrestacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
