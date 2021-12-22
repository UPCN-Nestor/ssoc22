import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReglaPrestacion } from '../regla-prestacion.model';

@Component({
  selector: 'jhi-regla-prestacion-detail',
  templateUrl: './regla-prestacion-detail.component.html',
})
export class ReglaPrestacionDetailComponent implements OnInit {
  reglaPrestacion: IReglaPrestacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reglaPrestacion }) => {
      this.reglaPrestacion = reglaPrestacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
