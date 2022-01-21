import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITarifa } from '../tarifa.model';
import { TarifaService } from '../service/tarifa.service';
import { TarifaDeleteDialogComponent } from '../delete/tarifa-delete-dialog.component';

@Component({
  selector: 'jhi-tarifa',
  templateUrl: './tarifa.component.html',
})
export class TarifaComponent implements OnInit {
  tarifas?: ITarifa[];
  isLoading = false;

  constructor(protected tarifaService: TarifaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tarifaService.query().subscribe({
      next: (res: HttpResponse<ITarifa[]>) => {
        this.isLoading = false;
        this.tarifas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITarifa): number {
    return item.id!;
  }

  delete(tarifa: ITarifa): void {
    const modalRef = this.modalService.open(TarifaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tarifa = tarifa;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
