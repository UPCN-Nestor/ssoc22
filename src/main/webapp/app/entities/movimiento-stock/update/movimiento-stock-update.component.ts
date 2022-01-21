import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IMovimientoStock, MovimientoStock } from '../movimiento-stock.model';
import { MovimientoStockService } from '../service/movimiento-stock.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

@Component({
  selector: 'jhi-movimiento-stock-update',
  templateUrl: './movimiento-stock-update.component.html',
})
export class MovimientoStockUpdateComponent implements OnInit {
  isSaving = false;

  insumosSharedCollection: IInsumo[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    cantidad: [],
    insumo: [],
  });

  constructor(
    protected movimientoStockService: MovimientoStockService,
    protected insumoService: InsumoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoStock }) => {
      if (movimientoStock.id === undefined) {
        const today = dayjs().startOf('day');
        movimientoStock.fecha = today;
      }

      this.updateForm(movimientoStock);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientoStock = this.createFromForm();
    if (movimientoStock.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoStockService.update(movimientoStock));
    } else {
      this.subscribeToSaveResponse(this.movimientoStockService.create(movimientoStock));
    }
  }

  trackInsumoById(index: number, item: IInsumo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoStock>>): void {
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

  protected updateForm(movimientoStock: IMovimientoStock): void {
    this.editForm.patchValue({
      id: movimientoStock.id,
      fecha: movimientoStock.fecha ? movimientoStock.fecha.format(DATE_TIME_FORMAT) : null,
      cantidad: movimientoStock.cantidad,
      insumo: movimientoStock.insumo,
    });

    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(this.insumosSharedCollection, movimientoStock.insumo);
  }

  protected loadRelationshipsOptions(): void {
    this.insumoService
      .query()
      .pipe(map((res: HttpResponse<IInsumo[]>) => res.body ?? []))
      .pipe(map((insumos: IInsumo[]) => this.insumoService.addInsumoToCollectionIfMissing(insumos, this.editForm.get('insumo')!.value)))
      .subscribe((insumos: IInsumo[]) => (this.insumosSharedCollection = insumos));
  }

  protected createFromForm(): IMovimientoStock {
    return {
      ...new MovimientoStock(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      cantidad: this.editForm.get(['cantidad'])!.value,
      insumo: this.editForm.get(['insumo'])!.value,
    };
  }
}
