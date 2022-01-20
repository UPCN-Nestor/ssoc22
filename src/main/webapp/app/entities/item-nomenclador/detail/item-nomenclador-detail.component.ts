import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemNomenclador } from '../item-nomenclador.model';

@Component({
  selector: 'jhi-item-nomenclador-detail',
  templateUrl: './item-nomenclador-detail.component.html',
})
export class ItemNomencladorDetailComponent implements OnInit {
  itemNomenclador: IItemNomenclador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemNomenclador }) => {
      this.itemNomenclador = itemNomenclador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
