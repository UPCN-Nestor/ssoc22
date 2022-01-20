import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEquipo } from '../equipo.model';
import { EquipoService } from '../service/equipo.service';

@Component({
  templateUrl: './equipo-delete-dialog.component.html',
})
export class EquipoDeleteDialogComponent {
  equipo?: IEquipo;

  constructor(protected equipoService: EquipoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.equipoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
