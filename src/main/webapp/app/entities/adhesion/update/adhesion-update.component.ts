import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAdhesion, Adhesion } from '../adhesion.model';
import { AdhesionService } from '../service/adhesion.service';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-adhesion-update',
  templateUrl: './adhesion-update.component.html',
})
export class AdhesionUpdateComponent implements OnInit {
  isSaving = false;

  individuosSharedCollection: IIndividuo[] = [];
  clientesSharedCollection: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    fechaAlta: [],
    estado: [],
    condicion: [],
    individuo: [],
    cliente: [],
  });

  constructor(
    protected adhesionService: AdhesionService,
    protected individuoService: IndividuoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adhesion }) => {
      this.updateForm(adhesion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adhesion = this.createFromForm();
    if (adhesion.id !== undefined) {
      this.subscribeToSaveResponse(this.adhesionService.update(adhesion));
    } else {
      this.subscribeToSaveResponse(this.adhesionService.create(adhesion));
    }
  }

  trackIndividuoById(index: number, item: IIndividuo): number {
    return item.id!;
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdhesion>>): void {
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

  protected updateForm(adhesion: IAdhesion): void {
    this.editForm.patchValue({
      id: adhesion.id,
      fechaAlta: adhesion.fechaAlta,
      estado: adhesion.estado,
      condicion: adhesion.condicion,
      individuo: adhesion.individuo,
      cliente: adhesion.cliente,
    });

    this.individuosSharedCollection = this.individuoService.addIndividuoToCollectionIfMissing(
      this.individuosSharedCollection,
      adhesion.individuo
    );
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, adhesion.cliente);
  }

  protected loadRelationshipsOptions(): void {
    this.individuoService
      .query()
      .pipe(map((res: HttpResponse<IIndividuo[]>) => res.body ?? []))
      .pipe(
        map((individuos: IIndividuo[]) =>
          this.individuoService.addIndividuoToCollectionIfMissing(individuos, this.editForm.get('individuo')!.value)
        )
      )
      .subscribe((individuos: IIndividuo[]) => (this.individuosSharedCollection = individuos));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));
  }

  protected createFromForm(): IAdhesion {
    return {
      ...new Adhesion(),
      id: this.editForm.get(['id'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      condicion: this.editForm.get(['condicion'])!.value,
      individuo: this.editForm.get(['individuo'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }
}
