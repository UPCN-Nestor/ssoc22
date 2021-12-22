import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrestacion } from '../prestacion.model';
import { PrestacionService } from '../service/prestacion.service';
import { PrestacionDeleteDialogComponent } from '../delete/prestacion-delete-dialog.component';

@Component({
  selector: 'jhi-prestacion',
  templateUrl: './prestacion.component.html',
})
export class PrestacionComponent implements OnInit {
  prestacions?: IPrestacion[];
  isLoading = false;

  constructor(protected prestacionService: PrestacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.prestacionService.query().subscribe(
      (res: HttpResponse<IPrestacion[]>) => {
        this.isLoading = false;
        this.prestacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPrestacion): number {
    return item.id!;
  }

  delete(prestacion: IPrestacion): void {
    const modalRef = this.modalService.open(PrestacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.prestacion = prestacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
