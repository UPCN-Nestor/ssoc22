import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Despacho } from 'app/entities/despacho/despacho.model';
import { DespachoService } from 'app/entities/despacho/service/despacho.service';
import { IndividuoDetailComponent } from 'app/entities/individuo/detail/individuo-detail.component';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoPopupComponent } from 'app/entities/individuo/popup/individuo-popup.component';
import { SolicitudPrestacionService } from 'app/entities/solicitud-prestacion/service/solicitud-prestacion.service';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import dayjs, { Dayjs } from 'dayjs/esm';

@Component({
  selector: 'jhi-pantalla-telefonista',
  templateUrl: './pantalla-telefonista.component.html',
  styleUrls: ['./pantalla-telefonista.component.scss'],
})
export class PantallaTelefonistaComponent implements OnInit {
  solicitudAtencionMedica?: ISolicitudPrestacion[];
  solicitudEmergencia?: ISolicitudPrestacion[];
  isLoading = false;

  constructor(
    protected solicitudPrestacionService: SolicitudPrestacionService,
    protected despachoService: DespachoService,
    protected modalService: NgbModal
  ) {}

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

  mostrarBoton(s: ISolicitudPrestacion): string {
    if (!s.despacho) {
      return 'Salida';
    }
    if (s.despacho.horaLibre) {
      return '';
    }
    if (s.despacho.horaLlegada) {
      return 'Libre';
    }
    if (s.despacho.horaSalida) {
      return 'Llegada';
    }
    return '';
  }

  // Para actualizar entidades colgadas de otras, hay que traerlas por ID, no se actualizan en cadena.

  salida(s: ISolicitudPrestacion): void {
    const d = new Despacho();
    d.horaSalida = dayjs(dayjs(), DATE_TIME_FORMAT);
    this.despachoService.create(d).subscribe(res => {
      s.despacho = res.body;
      this.solicitudPrestacionService.update(s).subscribe(res2 => {
        res2.body;
      });
    });
  }

  llegada(s: ISolicitudPrestacion): void {
    this.despachoService.find(s.despacho!.id!).subscribe(d => {
      s.despacho!.horaLlegada = dayjs(dayjs(), DATE_TIME_FORMAT);

      const despacho = d.body;
      despacho!.horaLlegada = dayjs(dayjs(), DATE_TIME_FORMAT);

      this.despachoService.updateConResponsableLogueado(despacho!, 'Llegada').subscribe(res => {
        res.body;
      });
    });
  }

  libre(s: ISolicitudPrestacion): void {
    this.despachoService.find(s.despacho!.id!).subscribe(d => {
      s.despacho!.horaLibre = dayjs(dayjs(), DATE_TIME_FORMAT);

      const despacho = d.body;
      despacho!.horaLibre = dayjs(dayjs(), DATE_TIME_FORMAT);

      this.despachoService.updateConResponsableLogueado(despacho!, 'Libre').subscribe(res => {
        res.body;
      });
    });
  }

  popupPaciente(p: IIndividuo): void {
    const modalRef = this.modalService.open(IndividuoPopupComponent, { size: 'lg', backdrop: true });
    modalRef.componentInstance.individuo = p;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      alert('x');
    });
  }

  cancel(): void {
    alert('x');
  }

  formatShortDate(d: Dayjs | null | undefined): string {
    return d ? dayjs(d).format('HH:mm') : '';
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
