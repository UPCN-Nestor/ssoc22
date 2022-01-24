import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChofer } from '../chofer.model';
import { ChoferService } from '../service/chofer.service';
import { ChoferDeleteDialogComponent } from '../delete/chofer-delete-dialog.component';

@Component({
  selector: 'jhi-chofer',
  templateUrl: './chofer.component.html',
})
export class ChoferComponent implements OnInit {
  chofers?: IChofer[];
  isLoading = false;

  constructor(protected choferService: ChoferService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.choferService.query().subscribe({
      next: (res: HttpResponse<IChofer[]>) => {
        this.isLoading = false;
        this.chofers = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IChofer): number {
    return item.id!;
  }

  delete(chofer: IChofer): void {
    const modalRef = this.modalService.open(ChoferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chofer = chofer;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
