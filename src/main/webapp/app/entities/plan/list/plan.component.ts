import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlan } from '../plan.model';
import { PlanService } from '../service/plan.service';
import { PlanDeleteDialogComponent } from '../delete/plan-delete-dialog.component';

@Component({
  selector: 'jhi-plan',
  templateUrl: './plan.component.html',
})
export class PlanComponent implements OnInit {
  plans?: IPlan[];
  isLoading = false;

  constructor(protected planService: PlanService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.planService.query().subscribe({
      next: (res: HttpResponse<IPlan[]>) => {
        this.isLoading = false;
        this.plans = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPlan): number {
    return item.id!;
  }

  delete(plan: IPlan): void {
    const modalRef = this.modalService.open(PlanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.plan = plan;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
