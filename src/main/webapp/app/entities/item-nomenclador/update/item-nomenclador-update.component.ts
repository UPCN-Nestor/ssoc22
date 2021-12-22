import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';

@Component({
  selector: 'jhi-item-nomenclador-update',
  templateUrl: './item-nomenclador-update.component.html',
})
export class ItemNomencladorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected itemNomencladorService: ItemNomencladorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemNomenclador }) => {
      this.updateForm(itemNomenclador);
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemNomenclador>>): void {
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

  protected updateForm(itemNomenclador: IItemNomenclador): void {
    this.editForm.patchValue({
      id: itemNomenclador.id,
    });
  }

  protected createFromForm(): IItemNomenclador {
    return {
      ...new ItemNomenclador(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
