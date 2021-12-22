import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPlan, Plan } from '../plan.model';
import { PlanService } from '../service/plan.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

@Component({
  selector: 'jhi-plan-update',
  templateUrl: './plan-update.component.html',
})
export class PlanUpdateComponent implements OnInit {
  isSaving = false;

  insumosSharedCollection: IInsumo[] = [];

  editForm = this.fb.group({
    id: [],
    tarifa: [],
    habilitaciones: [],
    descuentos: [],
    restricciones: [],
    excepcionInsumos: [],
  });

  constructor(
    protected planService: PlanService,
    protected insumoService: InsumoService,
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

  trackInsumoById(index: number, item: IInsumo): number {
    return item.id!;
  }

  getSelectedInsumo(option: IInsumo, selectedVals?: IInsumo[]): IInsumo {
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
      excepcionInsumos: plan.excepcionInsumos,
    });

    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(
      this.insumosSharedCollection,
      ...(plan.excepcionInsumos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.insumoService
      .query()
      .pipe(map((res: HttpResponse<IInsumo[]>) => res.body ?? []))
      .pipe(
        map((insumos: IInsumo[]) =>
          this.insumoService.addInsumoToCollectionIfMissing(insumos, ...(this.editForm.get('excepcionInsumos')!.value ?? []))
        )
      )
      .subscribe((insumos: IInsumo[]) => (this.insumosSharedCollection = insumos));
  }

  protected createFromForm(): IPlan {
    return {
      ...new Plan(),
      id: this.editForm.get(['id'])!.value,
      tarifa: this.editForm.get(['tarifa'])!.value,
      habilitaciones: this.editForm.get(['habilitaciones'])!.value,
      descuentos: this.editForm.get(['descuentos'])!.value,
      restricciones: this.editForm.get(['restricciones'])!.value,
      excepcionInsumos: this.editForm.get(['excepcionInsumos'])!.value,
    };
  }
}
