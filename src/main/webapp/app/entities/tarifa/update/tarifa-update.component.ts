import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ITarifa, Tarifa } from '../tarifa.model';
import { TarifaService } from '../service/tarifa.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

@Component({
  selector: 'jhi-tarifa-update',
  templateUrl: './tarifa-update.component.html',
})
export class TarifaUpdateComponent implements OnInit {
  isSaving = false;

  plansSharedCollection: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    datos: [],
    vigenciaHasta: [],
    plan: [],
  });

  constructor(
    protected tarifaService: TarifaService,
    protected planService: PlanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarifa }) => {
      if (tarifa.id === undefined) {
        const today = dayjs().startOf('day');
        tarifa.vigenciaHasta = today;
      }

      this.updateForm(tarifa);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarifa = this.createFromForm();
    if (tarifa.id !== undefined) {
      this.subscribeToSaveResponse(this.tarifaService.update(tarifa));
    } else {
      this.subscribeToSaveResponse(this.tarifaService.create(tarifa));
    }
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifa>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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

  protected updateForm(tarifa: ITarifa): void {
    this.editForm.patchValue({
      id: tarifa.id,
      tipo: tarifa.tipo,
      datos: tarifa.datos,
      vigenciaHasta: tarifa.vigenciaHasta ? tarifa.vigenciaHasta.format(DATE_TIME_FORMAT) : null,
      plan: tarifa.plan,
    });

    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, tarifa.plan);
  }

  protected loadRelationshipsOptions(): void {
    this.planService
      .query()
      .pipe(map((res: HttpResponse<IPlan[]>) => res.body ?? []))
      .pipe(map((plans: IPlan[]) => this.planService.addPlanToCollectionIfMissing(plans, this.editForm.get('plan')!.value)))
      .subscribe((plans: IPlan[]) => (this.plansSharedCollection = plans));
  }

  protected createFromForm(): ITarifa {
    return {
      ...new Tarifa(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      datos: this.editForm.get(['datos'])!.value,
      vigenciaHasta: this.editForm.get(['vigenciaHasta'])!.value
        ? dayjs(this.editForm.get(['vigenciaHasta'])!.value, DATE_TIME_FORMAT)
        : undefined,
      plan: this.editForm.get(['plan'])!.value,
    };
  }
}
