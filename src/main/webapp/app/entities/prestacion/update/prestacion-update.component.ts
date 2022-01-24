import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPrestacion, Prestacion } from '../prestacion.model';
import { PrestacionService } from '../service/prestacion.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

@Component({
  selector: 'jhi-prestacion-update',
  templateUrl: './prestacion-update.component.html',
})
export class PrestacionUpdateComponent implements OnInit {
  isSaving = false;

  insumosSharedCollection: IInsumo[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    precio: [],
    carencia: [],
    insumos: [],
  });

  constructor(
    protected prestacionService: PrestacionService,
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

  protected updateForm(prestacion: IPrestacion): void {
    this.editForm.patchValue({
      id: prestacion.id,
      tipo: prestacion.tipo,
      precio: prestacion.precio,
      carencia: prestacion.carencia,
      insumos: prestacion.insumos,
    });

    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(
      this.insumosSharedCollection,
      ...(prestacion.insumos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
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
      precio: this.editForm.get(['precio'])!.value,
      carencia: this.editForm.get(['carencia'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
    };
  }
}
