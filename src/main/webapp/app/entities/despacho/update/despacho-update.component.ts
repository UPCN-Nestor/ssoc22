import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDespacho, Despacho } from '../despacho.model';
import { DespachoService } from '../service/despacho.service';

@Component({
  selector: 'jhi-despacho-update',
  templateUrl: './despacho-update.component.html',
})
export class DespachoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected despachoService: DespachoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despacho }) => {
      this.updateForm(despacho);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const despacho = this.createFromForm();
    if (despacho.id !== undefined) {
      this.subscribeToSaveResponse(this.despachoService.update(despacho));
    } else {
      this.subscribeToSaveResponse(this.despachoService.create(despacho));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDespacho>>): void {
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

  protected updateForm(despacho: IDespacho): void {
    this.editForm.patchValue({
      id: despacho.id,
    });
  }

  protected createFromForm(): IDespacho {
    return {
      ...new Despacho(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
