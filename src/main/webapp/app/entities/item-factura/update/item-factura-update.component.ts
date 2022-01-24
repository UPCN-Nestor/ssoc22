import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IItemFactura, ItemFactura } from '../item-factura.model';
import { ItemFacturaService } from '../service/item-factura.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { IFactura } from 'app/entities/factura/factura.model';
import { FacturaService } from 'app/entities/factura/service/factura.service';

@Component({
  selector: 'jhi-item-factura-update',
  templateUrl: './item-factura-update.component.html',
})
export class ItemFacturaUpdateComponent implements OnInit {
  isSaving = false;

  clientesSharedCollection: ICliente[] = [];
  facturasSharedCollection: IFactura[] = [];

  editForm = this.fb.group({
    id: [],
    cliente: [],
    factura: [],
  });

  constructor(
    protected itemFacturaService: ItemFacturaService,
    protected clienteService: ClienteService,
    protected facturaService: FacturaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemFactura }) => {
      this.updateForm(itemFactura);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemFactura = this.createFromForm();
    if (itemFactura.id !== undefined) {
      this.subscribeToSaveResponse(this.itemFacturaService.update(itemFactura));
    } else {
      this.subscribeToSaveResponse(this.itemFacturaService.create(itemFactura));
    }
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  trackFacturaById(index: number, item: IFactura): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemFactura>>): void {
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

  protected updateForm(itemFactura: IItemFactura): void {
    this.editForm.patchValue({
      id: itemFactura.id,
      cliente: itemFactura.cliente,
      factura: itemFactura.factura,
    });

    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, itemFactura.cliente);
    this.facturasSharedCollection = this.facturaService.addFacturaToCollectionIfMissing(this.facturasSharedCollection, itemFactura.factura);
  }

  protected loadRelationshipsOptions(): void {
    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.facturaService
      .query()
      .pipe(map((res: HttpResponse<IFactura[]>) => res.body ?? []))
      .pipe(
        map((facturas: IFactura[]) => this.facturaService.addFacturaToCollectionIfMissing(facturas, this.editForm.get('factura')!.value))
      )
      .subscribe((facturas: IFactura[]) => (this.facturasSharedCollection = facturas));
  }

  protected createFromForm(): IItemFactura {
    return {
      ...new ItemFactura(),
      id: this.editForm.get(['id'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      factura: this.editForm.get(['factura'])!.value,
    };
  }
}
