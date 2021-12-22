import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISubscripcion, Subscripcion } from '../subscripcion.model';
import { SubscripcionService } from '../service/subscripcion.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-subscripcion-update',
  templateUrl: './subscripcion-update.component.html',
})
export class SubscripcionUpdateComponent implements OnInit {
  isSaving = false;

  plansSharedCollection: IPlan[] = [];
  clientesSharedCollection: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    fechaAlta: [],
    particularidades: [],
    plan: [],
    cliente: [],
  });

  constructor(
    protected subscripcionService: SubscripcionService,
    protected planService: PlanService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscripcion }) => {
      this.updateForm(subscripcion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscripcion = this.createFromForm();
    if (subscripcion.id !== undefined) {
      this.subscribeToSaveResponse(this.subscripcionService.update(subscripcion));
    } else {
      this.subscribeToSaveResponse(this.subscripcionService.create(subscripcion));
    }
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscripcion>>): void {
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

  protected updateForm(subscripcion: ISubscripcion): void {
    this.editForm.patchValue({
      id: subscripcion.id,
      fechaAlta: subscripcion.fechaAlta,
      particularidades: subscripcion.particularidades,
      plan: subscripcion.plan,
      cliente: subscripcion.cliente,
    });

    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, subscripcion.plan);
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(
      this.clientesSharedCollection,
      subscripcion.cliente
    );
  }

  protected loadRelationshipsOptions(): void {
    this.planService
      .query()
      .pipe(map((res: HttpResponse<IPlan[]>) => res.body ?? []))
      .pipe(map((plans: IPlan[]) => this.planService.addPlanToCollectionIfMissing(plans, this.editForm.get('plan')!.value)))
      .subscribe((plans: IPlan[]) => (this.plansSharedCollection = plans));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));
  }

  protected createFromForm(): ISubscripcion {
    return {
      ...new Subscripcion(),
      id: this.editForm.get(['id'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value,
      particularidades: this.editForm.get(['particularidades'])!.value,
      plan: this.editForm.get(['plan'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }
}
