import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsumo } from '../insumo.model';

@Component({
  selector: 'jhi-insumo-detail',
  templateUrl: './insumo-detail.component.html',
})
export class InsumoDetailComponent implements OnInit {
  insumo: IInsumo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insumo }) => {
      this.insumo = insumo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
