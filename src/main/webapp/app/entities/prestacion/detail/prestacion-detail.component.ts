import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestacion } from '../prestacion.model';

@Component({
  selector: 'jhi-prestacion-detail',
  templateUrl: './prestacion-detail.component.html',
})
export class PrestacionDetailComponent implements OnInit {
  prestacion: IPrestacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prestacion }) => {
      this.prestacion = prestacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
