import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPrestador, Prestador } from '../prestador.model';
import { PrestadorService } from '../service/prestador.service';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';

@Component({
  selector: 'jhi-prestador-update',
  templateUrl: './prestador-update.component.html',
})
export class PrestadorUpdateComponent implements OnInit {
  isSaving = false;

  itemNomencladorsSharedCollection: IItemNomenclador[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    condicion: [],
    itemNomencladors: [],
  });

  constructor(
    protected prestadorService: PrestadorService,
    protected itemNomencladorService: ItemNomencladorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prestador }) => {
      this.updateForm(prestador);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prestador = this.createFromForm();
    if (prestador.id !== undefined) {
      this.subscribeToSaveResponse(this.prestadorService.update(prestador));
    } else {
      this.subscribeToSaveResponse(this.prestadorService.create(prestador));
    }
  }

  trackItemNomencladorById(index: number, item: IItemNomenclador): number {
    return item.id!;
  }

  getSelectedItemNomenclador(option: IItemNomenclador, selectedVals?: IItemNomenclador[]): IItemNomenclador {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrestador>>): void {
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

  protected updateForm(prestador: IPrestador): void {
    this.editForm.patchValue({
      id: prestador.id,
      nombre: prestador.nombre,
      condicion: prestador.condicion,
      itemNomencladors: prestador.itemNomencladors,
    });

    this.itemNomencladorsSharedCollection = this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
      this.itemNomencladorsSharedCollection,
      ...(prestador.itemNomencladors ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.itemNomencladorService
      .query()
      .pipe(map((res: HttpResponse<IItemNomenclador[]>) => res.body ?? []))
      .pipe(
        map((itemNomencladors: IItemNomenclador[]) =>
          this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
            itemNomencladors,
            ...(this.editForm.get('itemNomencladors')!.value ?? [])
          )
        )
      )
      .subscribe((itemNomencladors: IItemNomenclador[]) => (this.itemNomencladorsSharedCollection = itemNomencladors));
  }

  protected createFromForm(): IPrestador {
    return {
      ...new Prestador(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      condicion: this.editForm.get(['condicion'])!.value,
      itemNomencladors: this.editForm.get(['itemNomencladors'])!.value,
    };
  }
}
