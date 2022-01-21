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
import { IProvision } from 'app/entities/provision/provision.model';
import { ProvisionService } from 'app/entities/provision/service/provision.service';

@Component({
  selector: 'jhi-item-nomenclador-update',
  templateUrl: './item-nomenclador-update.component.html',
})
export class ItemNomencladorUpdateComponent implements OnInit {
  isSaving = false;

  prestacionsSharedCollection: IPrestacion[] = [];
  provisionsSharedCollection: IProvision[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    carencia: [],
    prestacion: [],
    provision: [],
  });

  constructor(
    protected itemNomencladorService: ItemNomencladorService,
    protected prestacionService: PrestacionService,
    protected provisionService: ProvisionService,
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

  trackProvisionById(index: number, item: IProvision): number {
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
      carencia: itemNomenclador.carencia,
      prestacion: itemNomenclador.prestacion,
      provision: itemNomenclador.provision,
    });

    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      itemNomenclador.prestacion
    );
    this.provisionsSharedCollection = this.provisionService.addProvisionToCollectionIfMissing(
      this.provisionsSharedCollection,
      itemNomenclador.provision
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

    this.provisionService
      .query()
      .pipe(map((res: HttpResponse<IProvision[]>) => res.body ?? []))
      .pipe(
        map((provisions: IProvision[]) =>
          this.provisionService.addProvisionToCollectionIfMissing(provisions, this.editForm.get('provision')!.value)
        )
      )
      .subscribe((provisions: IProvision[]) => (this.provisionsSharedCollection = provisions));
  }

  protected createFromForm(): IItemNomenclador {
    return {
      ...new ItemNomenclador(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      carencia: this.editForm.get(['carencia'])!.value,
      prestacion: this.editForm.get(['prestacion'])!.value,
      provision: this.editForm.get(['provision'])!.value,
    };
  }
}
