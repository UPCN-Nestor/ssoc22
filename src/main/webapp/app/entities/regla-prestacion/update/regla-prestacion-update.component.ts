import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

@Component({
  selector: 'jhi-regla-prestacion-update',
  templateUrl: './regla-prestacion-update.component.html',
})
export class ReglaPrestacionUpdateComponent implements OnInit {
  isSaving = false;

  prestacionsSharedCollection: IPrestacion[] = [];
  plansSharedCollection: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    prestacion: [],
    plan: [],
  });

  constructor(
    protected reglaPrestacionService: ReglaPrestacionService,
    protected prestacionService: PrestacionService,
    protected planService: PlanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reglaPrestacion }) => {
      this.updateForm(reglaPrestacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reglaPrestacion = this.createFromForm();
    if (reglaPrestacion.id !== undefined) {
      this.subscribeToSaveResponse(this.reglaPrestacionService.update(reglaPrestacion));
    } else {
      this.subscribeToSaveResponse(this.reglaPrestacionService.create(reglaPrestacion));
    }
  }

  trackPrestacionById(index: number, item: IPrestacion): number {
    return item.id!;
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReglaPrestacion>>): void {
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

  protected updateForm(reglaPrestacion: IReglaPrestacion): void {
    this.editForm.patchValue({
      id: reglaPrestacion.id,
      prestacion: reglaPrestacion.prestacion,
      plan: reglaPrestacion.plan,
    });

    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      reglaPrestacion.prestacion
    );
    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, reglaPrestacion.plan);
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

  protected createFromForm(): IReglaPrestacion {
    return {
      ...new ReglaPrestacion(),
      id: this.editForm.get(['id'])!.value,
      prestacion: this.editForm.get(['prestacion'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }
}
