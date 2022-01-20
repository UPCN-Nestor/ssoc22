import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';

@Component({
  templateUrl: './provision-delete-dialog.component.html',
})
export class ProvisionDeleteDialogComponent {
  provision?: IProvision;

  constructor(protected provisionService: ProvisionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provisionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
