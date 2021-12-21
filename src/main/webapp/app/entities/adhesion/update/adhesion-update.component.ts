import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAdhesion, Adhesion } from '../adhesion.model';
import { AdhesionService } from '../service/adhesion.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

@Component({
  selector: 'jhi-adhesion-update',
  templateUrl: './adhesion-update.component.html',
})
export class AdhesionUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];
  individuosSharedCollection: IIndividuo[] = [];
  plansSharedCollection: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    particularidades: [],
    cliente: [],
    individuo: [],
    plan: [],
  });

  constructor(
    protected adhesionService: AdhesionService,
    protected clienteService: ClienteService,
    protected individuoService: IndividuoService,
    protected planService: PlanService,
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

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  trackIndividuoById(index: number, item: IIndividuo): number {
    return item.id!;
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdhesion>>): void {
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

  protected updateForm(adhesion: IAdhesion): void {
    this.editForm.patchValue({
      id: adhesion.id,
      fecha: adhesion.fecha,
      particularidades: adhesion.particularidades,
      cliente: adhesion.cliente,
      individuo: adhesion.individuo,
      plan: adhesion.plan,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, adhesion.cliente);
    this.individuosSharedCollection = this.individuoService.addIndividuoToCollectionIfMissing(
      this.individuosSharedCollection,
      adhesion.individuo
    );
    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, adhesion.plan);
  }

  protected loadRelationshipsOptions(): void {
    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.individuoService
      .query()
      .pipe(map((res: HttpResponse<IIndividuo[]>) => res.body ?? []))
      .pipe(
        map((individuos: IIndividuo[]) =>
          this.individuoService.addIndividuoToCollectionIfMissing(individuos, this.editForm.get('individuo')!.value)
        )
      )
      .subscribe((individuos: IIndividuo[]) => (this.individuosSharedCollection = individuos));

    this.planService
      .query()
      .pipe(map((res: HttpResponse<IPlan[]>) => res.body ?? []))
      .pipe(map((plans: IPlan[]) => this.planService.addPlanToCollectionIfMissing(plans, this.editForm.get('plan')!.value)))
      .subscribe((plans: IPlan[]) => (this.plansSharedCollection = plans));
  }

  protected createFromForm(): IAdhesion {
    return {
      ...new Adhesion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      particularidades: this.editForm.get(['particularidades'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      individuo: this.editForm.get(['individuo'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }
}
