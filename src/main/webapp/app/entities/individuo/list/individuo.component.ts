import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIndividuo } from '../individuo.model';
import { IndividuoService } from '../service/individuo.service';
import { IndividuoDeleteDialogComponent } from '../delete/individuo-delete-dialog.component';

@Component({
  selector: 'jhi-individuo',
  templateUrl: './individuo.component.html',
})
export class IndividuoComponent implements OnInit {
  individuos?: IIndividuo[];
  isLoading = false;

  constructor(protected individuoService: IndividuoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.individuoService.query().subscribe({
      next: (res: HttpResponse<IIndividuo[]>) => {
        this.isLoading = false;
        this.individuos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IIndividuo): number {
    return item.id!;
  }

  delete(individuo: IIndividuo): void {
    const modalRef = this.modalService.open(IndividuoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.individuo = individuo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
