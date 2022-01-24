import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMovil, Movil } from '../movil.model';
import { MovilService } from '../service/movil.service';

@Component({
  selector: 'jhi-movil-update',
  templateUrl: './movil-update.component.html',
})
export class MovilUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    numero: [],
  });

  constructor(protected movilService: MovilService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movil }) => {
      this.updateForm(movil);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movil = this.createFromForm();
    if (movil.id !== undefined) {
      this.subscribeToSaveResponse(this.movilService.update(movil));
    } else {
      this.subscribeToSaveResponse(this.movilService.create(movil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovil>>): void {
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

  protected updateForm(movil: IMovil): void {
    this.editForm.patchValue({
      id: movil.id,
      numero: movil.numero,
    });
  }

  protected createFromForm(): IMovil {
    return {
      ...new Movil(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
    };
  }
}
