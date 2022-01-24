import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnfermero } from '../enfermero.model';
import { EnfermeroService } from '../service/enfermero.service';
import { EnfermeroDeleteDialogComponent } from '../delete/enfermero-delete-dialog.component';

@Component({
  selector: 'jhi-enfermero',
  templateUrl: './enfermero.component.html',
})
export class EnfermeroComponent implements OnInit {
  enfermeros?: IEnfermero[];
  isLoading = false;

  constructor(protected enfermeroService: EnfermeroService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.enfermeroService.query().subscribe({
      next: (res: HttpResponse<IEnfermero[]>) => {
        this.isLoading = false;
        this.enfermeros = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEnfermero): number {
    return item.id!;
  }

  delete(enfermero: IEnfermero): void {
    const modalRef = this.modalService.open(EnfermeroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.enfermero = enfermero;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
