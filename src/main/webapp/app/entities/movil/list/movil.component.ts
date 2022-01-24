import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovil } from '../movil.model';
import { MovilService } from '../service/movil.service';
import { MovilDeleteDialogComponent } from '../delete/movil-delete-dialog.component';

@Component({
  selector: 'jhi-movil',
  templateUrl: './movil.component.html',
})
export class MovilComponent implements OnInit {
  movils?: IMovil[];
  isLoading = false;

  constructor(protected movilService: MovilService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movilService.query().subscribe({
      next: (res: HttpResponse<IMovil[]>) => {
        this.isLoading = false;
        this.movils = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMovil): number {
    return item.id!;
  }

  delete(movil: IMovil): void {
    const modalRef = this.modalService.open(MovilDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movil = movil;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
