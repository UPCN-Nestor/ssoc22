import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPrestacion, Prestacion } from '../prestacion.model';
import { PrestacionService } from '../service/prestacion.service';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

@Component({
  selector: 'jhi-prestacion-update',
  templateUrl: './prestacion-update.component.html',
})
export class PrestacionUpdateComponent implements OnInit {
  isSaving = false;

  itemNomencladorsCollection: IItemNomenclador[] = [];
  insumosSharedCollection: IInsumo[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    carencias: [],
    itemNomenclador: [],
    insumos: [],
  });

  constructor(
    protected prestacionService: PrestacionService,
    protected itemNomencladorService: ItemNomencladorService,
    protected insumoService: InsumoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prestacion }) => {
      this.updateForm(prestacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prestacion = this.createFromForm();
    if (prestacion.id !== undefined) {
      this.subscribeToSaveResponse(this.prestacionService.update(prestacion));
    } else {
      this.subscribeToSaveResponse(this.prestacionService.create(prestacion));
    }
  }

  trackItemNomencladorById(index: number, item: IItemNomenclador): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrestacion>>): void {
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

  protected updateForm(prestacion: IPrestacion): void {
    this.editForm.patchValue({
      id: prestacion.id,
      tipo: prestacion.tipo,
      carencias: prestacion.carencias,
      itemNomenclador: prestacion.itemNomenclador,
      insumos: prestacion.insumos,
    });

    this.itemNomencladorsCollection = this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
      this.itemNomencladorsCollection,
      prestacion.itemNomenclador
    );
    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(
      this.insumosSharedCollection,
      ...(prestacion.insumos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.itemNomencladorService
      .query({ filter: 'prestacion-is-null' })
      .pipe(map((res: HttpResponse<IItemNomenclador[]>) => res.body ?? []))
      .pipe(
        map((itemNomencladors: IItemNomenclador[]) =>
          this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(itemNomencladors, this.editForm.get('itemNomenclador')!.value)
        )
      )
      .subscribe((itemNomencladors: IItemNomenclador[]) => (this.itemNomencladorsCollection = itemNomencladors));

    this.insumoService
      .query()
      .pipe(map((res: HttpResponse<IInsumo[]>) => res.body ?? []))
      .pipe(
        map((insumos: IInsumo[]) =>
          this.insumoService.addInsumoToCollectionIfMissing(insumos, ...(this.editForm.get('insumos')!.value ?? []))
        )
      )
      .subscribe((insumos: IInsumo[]) => (this.insumosSharedCollection = insumos));
  }

  protected createFromForm(): IPrestacion {
    return {
      ...new Prestacion(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      carencias: this.editForm.get(['carencias'])!.value,
      itemNomenclador: this.editForm.get(['itemNomenclador'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
    };
  }
}
