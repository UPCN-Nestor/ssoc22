import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChofer } from '../chofer.model';

@Component({
  selector: 'jhi-chofer-detail',
  templateUrl: './chofer-detail.component.html',
})
export class ChoferDetailComponent implements OnInit {
  chofer: IChofer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chofer }) => {
      this.chofer = chofer;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
