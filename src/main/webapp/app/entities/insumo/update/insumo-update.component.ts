import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IInsumo, Insumo } from '../insumo.model';
import { InsumoService } from '../service/insumo.service';

@Component({
  selector: 'jhi-insumo-update',
  templateUrl: './insumo-update.component.html',
})
export class InsumoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipo: [],
    precioVenta: [],
    esModificable: [],
  });

  constructor(protected insumoService: InsumoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insumo }) => {
      this.updateForm(insumo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const insumo = this.createFromForm();
    if (insumo.id !== undefined) {
      this.subscribeToSaveResponse(this.insumoService.update(insumo));
    } else {
      this.subscribeToSaveResponse(this.insumoService.create(insumo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsumo>>): void {
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

  protected updateForm(insumo: IInsumo): void {
    this.editForm.patchValue({
      id: insumo.id,
      tipo: insumo.tipo,
      precioVenta: insumo.precioVenta,
      esModificable: insumo.esModificable,
    });
  }

  protected createFromForm(): IInsumo {
    return {
      ...new Insumo(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      precioVenta: this.editForm.get(['precioVenta'])!.value,
      esModificable: this.editForm.get(['esModificable'])!.value,
    };
  }
}
