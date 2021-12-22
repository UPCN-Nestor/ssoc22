import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscripcion } from '../subscripcion.model';
import { SubscripcionService } from '../service/subscripcion.service';
import { SubscripcionDeleteDialogComponent } from '../delete/subscripcion-delete-dialog.component';

@Component({
  selector: 'jhi-subscripcion',
  templateUrl: './subscripcion.component.html',
})
export class SubscripcionComponent implements OnInit {
  subscripcions?: ISubscripcion[];
  isLoading = false;

  constructor(protected subscripcionService: SubscripcionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.subscripcionService.query().subscribe(
      (res: HttpResponse<ISubscripcion[]>) => {
        this.isLoading = false;
        this.subscripcions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISubscripcion): number {
    return item.id!;
  }

  delete(subscripcion: ISubscripcion): void {
    const modalRef = this.modalService.open(SubscripcionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscripcion = subscripcion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
