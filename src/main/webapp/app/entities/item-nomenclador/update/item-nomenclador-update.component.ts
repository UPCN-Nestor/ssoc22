import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';

@Component({
  selector: 'jhi-item-nomenclador-update',
  templateUrl: './item-nomenclador-update.component.html',
})
export class ItemNomencladorUpdateComponent implements OnInit {
  isSaving = false;

  prestacionsSharedCollection: IPrestacion[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    diasCarencia: [],
    codigo: [],
    prestacion: [],
  });

  constructor(
    protected itemNomencladorService: ItemNomencladorService,
    protected prestacionService: PrestacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemNomenclador }) => {
      this.updateForm(itemNomenclador);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemNomenclador = this.createFromForm();
    if (itemNomenclador.id !== undefined) {
      this.subscribeToSaveResponse(this.itemNomencladorService.update(itemNomenclador));
    } else {
      this.subscribeToSaveResponse(this.itemNomencladorService.create(itemNomenclador));
    }
  }

  trackPrestacionById(index: number, item: IPrestacion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemNomenclador>>): void {
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

  protected updateForm(itemNomenclador: IItemNomenclador): void {
    this.editForm.patchValue({
      id: itemNomenclador.id,
      nombre: itemNomenclador.nombre,
      diasCarencia: itemNomenclador.diasCarencia,
      codigo: itemNomenclador.codigo,
      prestacion: itemNomenclador.prestacion,
    });

    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      itemNomenclador.prestacion
    );
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
  }

  protected createFromForm(): IItemNomenclador {
    return {
      ...new ItemNomenclador(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      diasCarencia: this.editForm.get(['diasCarencia'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      prestacion: this.editForm.get(['prestacion'])!.value,
    };
  }
}
