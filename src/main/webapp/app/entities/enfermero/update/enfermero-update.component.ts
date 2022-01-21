import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEnfermero, Enfermero } from '../enfermero.model';
import { EnfermeroService } from '../service/enfermero.service';

@Component({
  selector: 'jhi-enfermero-update',
  templateUrl: './enfermero-update.component.html',
})
export class EnfermeroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
  });

  constructor(protected enfermeroService: EnfermeroService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enfermero }) => {
      this.updateForm(enfermero);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enfermero = this.createFromForm();
    if (enfermero.id !== undefined) {
      this.subscribeToSaveResponse(this.enfermeroService.update(enfermero));
    } else {
      this.subscribeToSaveResponse(this.enfermeroService.create(enfermero));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnfermero>>): void {
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

  protected updateForm(enfermero: IEnfermero): void {
    this.editForm.patchValue({
      id: enfermero.id,
      nombre: enfermero.nombre,
    });
  }

  protected createFromForm(): IEnfermero {
    return {
      ...new Enfermero(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }
}
