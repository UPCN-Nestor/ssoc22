import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProvision, Provision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

@Component({
  selector: 'jhi-provision-update',
  templateUrl: './provision-update.component.html',
})
export class ProvisionUpdateComponent implements OnInit {
  isSaving = false;

  prestacionsSharedCollection: IPrestacion[] = [];
  plansSharedCollection: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    prestacion: [],
    plan: [],
  });

  constructor(
    protected provisionService: ProvisionService,
    protected prestacionService: PrestacionService,
    protected planService: PlanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provision }) => {
      this.updateForm(provision);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provision = this.createFromForm();
    if (provision.id !== undefined) {
      this.subscribeToSaveResponse(this.provisionService.update(provision));
    } else {
      this.subscribeToSaveResponse(this.provisionService.create(provision));
    }
  }

  trackPrestacionById(index: number, item: IPrestacion): number {
    return item.id!;
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvision>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(provision: IProvision): void {
    this.editForm.patchValue({
      id: provision.id,
      prestacion: provision.prestacion,
      plan: provision.plan,
    });

    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      provision.prestacion
    );
    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, provision.plan);
  }

  protected loadRelationshipsOptions(): void {
    this.prestacionService
      .query()
      .pipe(map((res: HttpResponse<IPrestacion[]>) => res.body ?? []))
      .pipe(
        map((prestacions: IPrestacion[]) =>
          this.prestacionService.addPrestacionToCollectionIfMissing(prestacions, this.editForm.get('prestacion')!.value)
        )
      )
      .subscribe((prestacions: IPrestacion[]) => (this.prestacionsSharedCollection = prestacions));

    this.planService
      .query()
      .pipe(map((res: HttpResponse<IPlan[]>) => res.body ?? []))
      .pipe(map((plans: IPlan[]) => this.planService.addPlanToCollectionIfMissing(plans, this.editForm.get('plan')!.value)))
      .subscribe((plans: IPlan[]) => (this.plansSharedCollection = plans));
  }

  protected createFromForm(): IProvision {
    return {
      ...new Provision(),
      id: this.editForm.get(['id'])!.value,
      prestacion: this.editForm.get(['prestacion'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }
}
