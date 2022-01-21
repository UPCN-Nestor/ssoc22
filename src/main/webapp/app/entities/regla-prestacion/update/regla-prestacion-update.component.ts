import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';
import { IProvision } from 'app/entities/provision/provision.model';
import { ProvisionService } from 'app/entities/provision/service/provision.service';

@Component({
  selector: 'jhi-regla-prestacion-update',
  templateUrl: './regla-prestacion-update.component.html',
})
export class ReglaPrestacionUpdateComponent implements OnInit {
  isSaving = false;

  provisionsSharedCollection: IProvision[] = [];

  editForm = this.fb.group({
    id: [],
    provision: [],
  });

  constructor(
    protected reglaPrestacionService: ReglaPrestacionService,
    protected provisionService: ProvisionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reglaPrestacion }) => {
      this.updateForm(reglaPrestacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reglaPrestacion = this.createFromForm();
    if (reglaPrestacion.id !== undefined) {
      this.subscribeToSaveResponse(this.reglaPrestacionService.update(reglaPrestacion));
    } else {
      this.subscribeToSaveResponse(this.reglaPrestacionService.create(reglaPrestacion));
    }
  }

  trackProvisionById(index: number, item: IProvision): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReglaPrestacion>>): void {
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

  protected updateForm(reglaPrestacion: IReglaPrestacion): void {
    this.editForm.patchValue({
      id: reglaPrestacion.id,
      provision: reglaPrestacion.provision,
    });

    this.provisionsSharedCollection = this.provisionService.addProvisionToCollectionIfMissing(
      this.provisionsSharedCollection,
      reglaPrestacion.provision
    );
  }

  protected loadRelationshipsOptions(): void {
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

  protected createFromForm(): IReglaPrestacion {
    return {
      ...new ReglaPrestacion(),
      id: this.editForm.get(['id'])!.value,
      provision: this.editForm.get(['provision'])!.value,
    };
  }
}
