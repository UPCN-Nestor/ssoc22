import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovil } from '../movil.model';

@Component({
  selector: 'jhi-movil-detail',
  templateUrl: './movil-detail.component.html',
})
export class MovilDetailComponent implements OnInit {
  movil: IMovil | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movil }) => {
      this.movil = movil;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
