import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoStock } from '../movimiento-stock.model';
import { MovimientoStockService } from '../service/movimiento-stock.service';
import { MovimientoStockDeleteDialogComponent } from '../delete/movimiento-stock-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento-stock',
  templateUrl: './movimiento-stock.component.html',
})
export class MovimientoStockComponent implements OnInit {
  movimientoStocks?: IMovimientoStock[];
  isLoading = false;

  constructor(protected movimientoStockService: MovimientoStockService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movimientoStockService.query().subscribe({
      next: (res: HttpResponse<IMovimientoStock[]>) => {
        this.isLoading = false;
        this.movimientoStocks = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMovimientoStock): number {
    return item.id!;
  }

  delete(movimientoStock: IMovimientoStock): void {
    const modalRef = this.modalService.open(MovimientoStockDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientoStock = movimientoStock;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
