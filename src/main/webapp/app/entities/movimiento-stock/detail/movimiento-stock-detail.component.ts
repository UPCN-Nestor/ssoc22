import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoStock } from '../movimiento-stock.model';

@Component({
  selector: 'jhi-movimiento-stock-detail',
  templateUrl: './movimiento-stock-detail.component.html',
})
export class MovimientoStockDetailComponent implements OnInit {
  movimientoStock: IMovimientoStock | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoStock }) => {
      this.movimientoStock = movimientoStock;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
