import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';
import { ReglaPrestacionDeleteDialogComponent } from '../delete/regla-prestacion-delete-dialog.component';

@Component({
  selector: 'jhi-regla-prestacion',
  templateUrl: './regla-prestacion.component.html',
})
export class ReglaPrestacionComponent implements OnInit {
  reglaPrestacions?: IReglaPrestacion[];
  isLoading = false;

  constructor(protected reglaPrestacionService: ReglaPrestacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.reglaPrestacionService.query().subscribe(
      (res: HttpResponse<IReglaPrestacion[]>) => {
        this.isLoading = false;
        this.reglaPrestacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IReglaPrestacion): number {
    return item.id!;
  }

  delete(reglaPrestacion: IReglaPrestacion): void {
    const modalRef = this.modalService.open(ReglaPrestacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reglaPrestacion = reglaPrestacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
