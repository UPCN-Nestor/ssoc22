import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemFactura } from '../item-factura.model';

@Component({
  selector: 'jhi-item-factura-detail',
  templateUrl: './item-factura-detail.component.html',
})
export class ItemFacturaDetailComponent implements OnInit {
  itemFactura: IItemFactura | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemFactura }) => {
      this.itemFactura = itemFactura;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
