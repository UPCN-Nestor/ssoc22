import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDespacho } from '../despacho.model';
import { DespachoService } from '../service/despacho.service';
import { DespachoDeleteDialogComponent } from '../delete/despacho-delete-dialog.component';

@Component({
  selector: 'jhi-despacho',
  templateUrl: './despacho.component.html',
})
export class DespachoComponent implements OnInit {
  despachos?: IDespacho[];
  isLoading = false;

  constructor(protected despachoService: DespachoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.despachoService.query().subscribe(
      (res: HttpResponse<IDespacho[]>) => {
        this.isLoading = false;
        this.despachos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDespacho): number {
    return item.id!;
  }

  delete(despacho: IDespacho): void {
    const modalRef = this.modalService.open(DespachoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.despacho = despacho;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
