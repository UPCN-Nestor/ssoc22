import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoStock } from '../movimiento-stock.model';
import { MovimientoStockService } from '../service/movimiento-stock.service';

@Component({
  templateUrl: './movimiento-stock-delete-dialog.component.html',
})
export class MovimientoStockDeleteDialogComponent {
  movimientoStock?: IMovimientoStock;

  constructor(protected movimientoStockService: MovimientoStockService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoStockService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
