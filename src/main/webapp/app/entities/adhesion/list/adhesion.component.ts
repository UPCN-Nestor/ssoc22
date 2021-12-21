import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdhesion } from '../adhesion.model';
import { AdhesionService } from '../service/adhesion.service';
import { AdhesionDeleteDialogComponent } from '../delete/adhesion-delete-dialog.component';

@Component({
  selector: 'jhi-adhesion',
  templateUrl: './adhesion.component.html',
})
export class AdhesionComponent implements OnInit {
  adhesions?: IAdhesion[];
  isLoading = false;

  constructor(protected adhesionService: AdhesionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.adhesionService.query().subscribe(
      (res: HttpResponse<IAdhesion[]>) => {
        this.isLoading = false;
        this.adhesions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAdhesion): number {
    return item.id!;
  }

  delete(adhesion: IAdhesion): void {
    const modalRef = this.modalService.open(AdhesionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.adhesion = adhesion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
