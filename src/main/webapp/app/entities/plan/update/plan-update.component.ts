import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPlan, Plan } from '../plan.model';
import { PlanService } from '../service/plan.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';

@Component({
  selector: 'jhi-plan-update',
  templateUrl: './plan-update.component.html',
})
export class PlanUpdateComponent implements OnInit {
  isSaving = false;

  prestacionsSharedCollection: IPrestacion[] = [];

  editForm = this.fb.group({
    id: [],
    tarifa: [],
    habilitaciones: [],
    descuentos: [],
    restricciones: [],
    prestacions: [],
  });

  constructor(
    protected planService: PlanService,
    protected prestacionService: PrestacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plan }) => {
      this.updateForm(plan);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plan = this.createFromForm();
    if (plan.id !== undefined) {
      this.subscribeToSaveResponse(this.planService.update(plan));
    } else {
      this.subscribeToSaveResponse(this.planService.create(plan));
    }
  }

  trackPrestacionById(index: number, item: IPrestacion): number {
    return item.id!;
  }

  getSelectedPrestacion(option: IPrestacion, selectedVals?: IPrestacion[]): IPrestacion {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlan>>): void {
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

  protected updateForm(plan: IPlan): void {
    this.editForm.patchValue({
      id: plan.id,
      tarifa: plan.tarifa,
      habilitaciones: plan.habilitaciones,
      descuentos: plan.descuentos,
      restricciones: plan.restricciones,
      prestacions: plan.prestacions,
    });

    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      ...(plan.prestacions ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.prestacionService
      .query()
      .pipe(map((res: HttpResponse<IPrestacion[]>) => res.body ?? []))
      .pipe(
        map((prestacions: IPrestacion[]) =>
          this.prestacionService.addPrestacionToCollectionIfMissing(prestacions, ...(this.editForm.get('prestacions')!.value ?? []))
        )
      )
      .subscribe((prestacions: IPrestacion[]) => (this.prestacionsSharedCollection = prestacions));
  }

  protected createFromForm(): IPlan {
    return {
      ...new Plan(),
      id: this.editForm.get(['id'])!.value,
      tarifa: this.editForm.get(['tarifa'])!.value,
      habilitaciones: this.editForm.get(['habilitaciones'])!.value,
      descuentos: this.editForm.get(['descuentos'])!.value,
      restricciones: this.editForm.get(['restricciones'])!.value,
      prestacions: this.editForm.get(['prestacions'])!.value,
    };
  }
}
