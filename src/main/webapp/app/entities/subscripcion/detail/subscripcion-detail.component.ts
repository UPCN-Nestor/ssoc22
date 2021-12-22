import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscripcion } from '../subscripcion.model';

@Component({
  selector: 'jhi-subscripcion-detail',
  templateUrl: './subscripcion-detail.component.html',
})
export class SubscripcionDetailComponent implements OnInit {
  subscripcion: ISubscripcion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscripcion }) => {
      this.subscripcion = subscripcion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
