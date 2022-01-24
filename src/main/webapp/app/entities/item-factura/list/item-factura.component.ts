import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemFactura } from '../item-factura.model';
import { ItemFacturaService } from '../service/item-factura.service';
import { ItemFacturaDeleteDialogComponent } from '../delete/item-factura-delete-dialog.component';

@Component({
  selector: 'jhi-item-factura',
  templateUrl: './item-factura.component.html',
})
export class ItemFacturaComponent implements OnInit {
  itemFacturas?: IItemFactura[];
  isLoading = false;

  constructor(protected itemFacturaService: ItemFacturaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.itemFacturaService.query().subscribe({
      next: (res: HttpResponse<IItemFactura[]>) => {
        this.isLoading = false;
        this.itemFacturas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IItemFactura): number {
    return item.id!;
  }

  delete(itemFactura: IItemFactura): void {
    const modalRef = this.modalService.open(ItemFacturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemFactura = itemFactura;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
