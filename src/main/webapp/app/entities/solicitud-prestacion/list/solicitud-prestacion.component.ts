import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';
import { SolicitudPrestacionDeleteDialogComponent } from '../delete/solicitud-prestacion-delete-dialog.component';

@Component({
  selector: 'jhi-solicitud-prestacion',
  templateUrl: './solicitud-prestacion.component.html',
})
export class SolicitudPrestacionComponent implements OnInit {
  solicitudPrestacions?: ISolicitudPrestacion[];
  isLoading = false;

  constructor(protected solicitudPrestacionService: SolicitudPrestacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.solicitudPrestacionService.query().subscribe({
      next: (res: HttpResponse<ISolicitudPrestacion[]>) => {
        this.isLoading = false;
        this.solicitudPrestacions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISolicitudPrestacion): number {
    return item.id!;
  }

  delete(solicitudPrestacion: ISolicitudPrestacion): void {
    const modalRef = this.modalService.open(SolicitudPrestacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solicitudPrestacion = solicitudPrestacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
