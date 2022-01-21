import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDespacho } from '../despacho.model';

@Component({
  selector: 'jhi-despacho-detail',
  templateUrl: './despacho-detail.component.html',
})
export class DespachoDetailComponent implements OnInit {
  despacho: IDespacho | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despacho }) => {
      this.despacho = despacho;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
