import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdhesion } from '../adhesion.model';

@Component({
  selector: 'jhi-adhesion-detail',
  templateUrl: './adhesion-detail.component.html',
})
export class AdhesionDetailComponent implements OnInit {
  adhesion: IAdhesion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adhesion }) => {
      this.adhesion = adhesion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
