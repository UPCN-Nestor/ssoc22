import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInsumo } from '../insumo.model';
import { InsumoService } from '../service/insumo.service';
import { InsumoDeleteDialogComponent } from '../delete/insumo-delete-dialog.component';

@Component({
  selector: 'jhi-insumo',
  templateUrl: './insumo.component.html',
})
export class InsumoComponent implements OnInit {
  insumos?: IInsumo[];
  isLoading = false;

  constructor(protected insumoService: InsumoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.insumoService.query().subscribe({
      next: (res: HttpResponse<IInsumo[]>) => {
        this.isLoading = false;
        this.insumos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IInsumo): number {
    return item.id!;
  }

  delete(insumo: IInsumo): void {
    const modalRef = this.modalService.open(InsumoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.insumo = insumo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
