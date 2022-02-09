import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIndividuo } from '../individuo.model';

@Component({
  selector: 'jhi-individuo-popup',
  templateUrl: './individuo-popup.component.html',
})
export class IndividuoPopupComponent implements OnInit {
  individuo: IIndividuo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ individuo }) => {
      // this.individuo = individuo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
