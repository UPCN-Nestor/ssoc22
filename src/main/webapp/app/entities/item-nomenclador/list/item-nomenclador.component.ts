import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';
import { ItemNomencladorDeleteDialogComponent } from '../delete/item-nomenclador-delete-dialog.component';

@Component({
  selector: 'jhi-item-nomenclador',
  templateUrl: './item-nomenclador.component.html',
})
export class ItemNomencladorComponent implements OnInit {
  itemNomencladors?: IItemNomenclador[];
  isLoading = false;

  constructor(protected itemNomencladorService: ItemNomencladorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.itemNomencladorService.query().subscribe({
      next: (res: HttpResponse<IItemNomenclador[]>) => {
        this.isLoading = false;
        this.itemNomencladors = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IItemNomenclador): number {
    return item.id!;
  }

  delete(itemNomenclador: IItemNomenclador): void {
    const modalRef = this.modalService.open(ItemNomencladorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemNomenclador = itemNomenclador;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
