import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IContrato, Contrato } from '../contrato.model';
import { ContratoService } from '../service/contrato.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-contrato-update',
  templateUrl: './contrato-update.component.html',
})
export class ContratoUpdateComponent implements OnInit {
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
    protected contratoService: ContratoService,
    protected planService: PlanService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contrato }) => {
      this.updateForm(contrato);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contrato = this.createFromForm();
    if (contrato.id !== undefined) {
      this.subscribeToSaveResponse(this.contratoService.update(contrato));
    } else {
      this.subscribeToSaveResponse(this.contratoService.create(contrato));
    }
  }

  trackPlanById(index: number, item: IPlan): number {
    return item.id!;
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContrato>>): void {
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

  protected updateForm(contrato: IContrato): void {
    this.editForm.patchValue({
      id: contrato.id,
      fechaAlta: contrato.fechaAlta,
      particularidades: contrato.particularidades,
      plan: contrato.plan,
      cliente: contrato.cliente,
    });

    this.plansSharedCollection = this.planService.addPlanToCollectionIfMissing(this.plansSharedCollection, contrato.plan);
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, contrato.cliente);
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

  protected createFromForm(): IContrato {
    return {
      ...new Contrato(),
      id: this.editForm.get(['id'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value,
      particularidades: this.editForm.get(['particularidades'])!.value,
      plan: this.editForm.get(['plan'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }
}
