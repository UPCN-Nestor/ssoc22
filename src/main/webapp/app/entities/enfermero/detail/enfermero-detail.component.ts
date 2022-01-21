import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnfermero } from '../enfermero.model';

@Component({
  selector: 'jhi-enfermero-detail',
  templateUrl: './enfermero-detail.component.html',
})
export class EnfermeroDetailComponent implements OnInit {
  enfermero: IEnfermero | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enfermero }) => {
      this.enfermero = enfermero;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
