import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IIndividuo, Individuo } from '../individuo.model';
import { IndividuoService } from '../service/individuo.service';

@Component({
  selector: 'jhi-individuo-update',
  templateUrl: './individuo-update.component.html',
})
export class IndividuoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    dni: [],
  });

  constructor(protected individuoService: IndividuoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ individuo }) => {
      this.updateForm(individuo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const individuo = this.createFromForm();
    if (individuo.id !== undefined) {
      this.subscribeToSaveResponse(this.individuoService.update(individuo));
    } else {
      this.subscribeToSaveResponse(this.individuoService.create(individuo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIndividuo>>): void {
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

  protected updateForm(individuo: IIndividuo): void {
    this.editForm.patchValue({
      id: individuo.id,
      nombre: individuo.nombre,
      dni: individuo.dni,
    });
  }

  protected createFromForm(): IIndividuo {
    return {
      ...new Individuo(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      dni: this.editForm.get(['dni'])!.value,
    };
  }
}
