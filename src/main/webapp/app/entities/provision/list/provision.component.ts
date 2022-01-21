import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';
import { ProvisionDeleteDialogComponent } from '../delete/provision-delete-dialog.component';

@Component({
  selector: 'jhi-provision',
  templateUrl: './provision.component.html',
})
export class ProvisionComponent implements OnInit {
  provisions?: IProvision[];
  isLoading = false;

  constructor(protected provisionService: ProvisionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.provisionService.query().subscribe({
      next: (res: HttpResponse<IProvision[]>) => {
        this.isLoading = false;
        this.provisions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProvision): number {
    return item.id!;
  }

  delete(provision: IProvision): void {
    const modalRef = this.modalService.open(ProvisionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.provision = provision;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
