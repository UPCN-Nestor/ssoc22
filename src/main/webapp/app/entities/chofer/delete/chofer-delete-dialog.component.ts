import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChofer } from '../chofer.model';
import { ChoferService } from '../service/chofer.service';

@Component({
  templateUrl: './chofer-delete-dialog.component.html',
})
export class ChoferDeleteDialogComponent {
  chofer?: IChofer;

  constructor(protected choferService: ChoferService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.choferService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
