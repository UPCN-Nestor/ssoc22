import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIndividuo } from '../individuo.model';
import { IndividuoService } from '../service/individuo.service';

@Component({
  templateUrl: './individuo-delete-dialog.component.html',
})
export class IndividuoDeleteDialogComponent {
  individuo?: IIndividuo;

  constructor(protected individuoService: IndividuoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.individuoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
