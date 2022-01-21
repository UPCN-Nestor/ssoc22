import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvision } from '../provision.model';

@Component({
  selector: 'jhi-provision-detail',
  templateUrl: './provision-detail.component.html',
})
export class ProvisionDetailComponent implements OnInit {
  provision: IProvision | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provision }) => {
      this.provision = provision;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
