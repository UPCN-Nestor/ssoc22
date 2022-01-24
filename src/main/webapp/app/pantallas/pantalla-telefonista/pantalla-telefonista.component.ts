import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudPrestacionService } from 'app/entities/solicitud-prestacion/service/solicitud-prestacion.service';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

@Component({
  selector: 'jhi-pantalla-telefonista',
  templateUrl: './pantalla-telefonista.component.html',
  styleUrls: ['./pantalla-telefonista.component.scss'],
})
export class PantallaTelefonistaComponent implements OnInit {
  solicitudAtencionMedica?: ISolicitudPrestacion[];
  solicitudEmergencia?: ISolicitudPrestacion[];
  isLoading = false;

  constructor(protected solicitudPrestacionService: SolicitudPrestacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.solicitudPrestacionService.queryPorTipo('AtencionMedica').subscribe({
      next: (res: HttpResponse<ISolicitudPrestacion[]>) => {
        this.isLoading = false;
        this.solicitudAtencionMedica = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });

    this.solicitudPrestacionService.queryPorTipo('Emergencia').subscribe({
      next: (res: HttpResponse<ISolicitudPrestacion[]>) => {
        this.isLoading = false;
        this.solicitudEmergencia = res.body ?? [];
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
  /*
  delete(solicitudPrestacion: ISolicitudPrestacion): void {
    const modalRef = this.modalService.open(SolicitudPrestacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solicitudPrestacion = solicitudPrestacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }*/
}
