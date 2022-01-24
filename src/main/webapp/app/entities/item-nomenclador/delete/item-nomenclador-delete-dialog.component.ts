import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';

@Component({
  templateUrl: './item-nomenclador-delete-dialog.component.html',
})
export class ItemNomencladorDeleteDialogComponent {
  itemNomenclador?: IItemNomenclador;

  constructor(protected itemNomencladorService: ItemNomencladorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemNomencladorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
