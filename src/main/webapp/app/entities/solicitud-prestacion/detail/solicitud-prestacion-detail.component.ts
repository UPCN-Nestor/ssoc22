import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISolicitudPrestacion } from '../solicitud-prestacion.model';

@Component({
  selector: 'jhi-solicitud-prestacion-detail',
  templateUrl: './solicitud-prestacion-detail.component.html',
})
export class SolicitudPrestacionDetailComponent implements OnInit {
  solicitudPrestacion: ISolicitudPrestacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitudPrestacion }) => {
      this.solicitudPrestacion = solicitudPrestacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
