import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDespacho, Despacho } from '../despacho.model';
import { DespachoService } from '../service/despacho.service';
import { IEquipo } from 'app/entities/equipo/equipo.model';
import { EquipoService } from 'app/entities/equipo/service/equipo.service';

@Component({
  selector: 'jhi-despacho-update',
  templateUrl: './despacho-update.component.html',
})
export class DespachoUpdateComponent implements OnInit {
  isSaving = false;

  equiposSharedCollection: IEquipo[] = [];

  editForm = this.fb.group({
    id: [],
    equipo: [],
  });

  constructor(
    protected despachoService: DespachoService,
    protected equipoService: EquipoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despacho }) => {
      this.updateForm(despacho);

      this.loadRelationshipsOptions();
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

  trackEquipoById(index: number, item: IEquipo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDespacho>>): void {
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

  protected updateForm(despacho: IDespacho): void {
    this.editForm.patchValue({
      id: despacho.id,
      equipo: despacho.equipo,
    });

    this.equiposSharedCollection = this.equipoService.addEquipoToCollectionIfMissing(this.equiposSharedCollection, despacho.equipo);
  }

  protected loadRelationshipsOptions(): void {
    this.equipoService
      .query()
      .pipe(map((res: HttpResponse<IEquipo[]>) => res.body ?? []))
      .pipe(map((equipos: IEquipo[]) => this.equipoService.addEquipoToCollectionIfMissing(equipos, this.editForm.get('equipo')!.value)))
      .subscribe((equipos: IEquipo[]) => (this.equiposSharedCollection = equipos));
  }

  protected createFromForm(): IDespacho {
    return {
      ...new Despacho(),
      id: this.editForm.get(['id'])!.value,
      equipo: this.editForm.get(['equipo'])!.value,
    };
  }
}
