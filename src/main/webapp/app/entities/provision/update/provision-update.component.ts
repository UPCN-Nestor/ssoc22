import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProvision, Provision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

@Component({
  selector: 'jhi-provision-update',
  templateUrl: './provision-update.component.html',
})
export class ProvisionUpdateComponent implements OnInit {
  isSaving = false;

  itemNomencladorsSharedCollection: IItemNomenclador[] = [];
  insumosSharedCollection: IInsumo[] = [];
  plansSharedCollection: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    itemNomenclador: [],
    insumos: [],
    plan: [],
  });

  constructor(
    protected provisionService: ProvisionService,
    protected itemNomencladorService: ItemNomencladorService,
    protected insumoService: InsumoService,
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

  trackItemNomencladorById(index: number, item: IItemNomenclador): number {
    return item.id!;
  }

  trackInsumoById(index: number, item: IInsumo): number {
    return item.id!;
  }

  trackPlanById(index: number, item: IPlan): number {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvision>>): void {
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

  protected updateForm(provision: IProvision): void {
    this.editForm.patchValue({
      id: provision.id,
      itemNomenclador: provision.itemNomenclador,
      insumos: provision.insumos,
      plan: provision.plan,
    });

    this.itemNomencladorsSharedCollection = this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
      this.itemNomencladorsSharedCollection,
      provision.itemNomenclador
    );
    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(
      this.insumosSharedCollection,
      ...(provision.insumos ?? [])
    );
    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, provision.plan);
  }

  protected loadRelationshipsOptions(): void {
    this.itemNomencladorService
      .query()
      .pipe(map((res: HttpResponse<IItemNomenclador[]>) => res.body ?? []))
      .pipe(
        map((itemNomencladors: IItemNomenclador[]) =>
          this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(itemNomencladors, this.editForm.get('itemNomenclador')!.value)
        )
      )
      .subscribe((itemNomencladors: IItemNomenclador[]) => (this.itemNomencladorsSharedCollection = itemNomencladors));

    this.insumoService
      .query()
      .pipe(map((res: HttpResponse<IInsumo[]>) => res.body ?? []))
      .pipe(
        map((insumos: IInsumo[]) =>
          this.insumoService.addInsumoToCollectionIfMissing(insumos, ...(this.editForm.get('insumos')!.value ?? []))
        )
      )
      .subscribe((insumos: IInsumo[]) => (this.insumosSharedCollection = insumos));

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
      itemNomenclador: this.editForm.get(['itemNomenclador'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }
}
