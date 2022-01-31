import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { DespachoService } from 'app/entities/despacho/service/despacho.service';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { PrestadorService } from 'app/entities/prestador/service/prestador.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

@Component({
  selector: 'jhi-solicitud-prestacion-update',
  templateUrl: './solicitud-prestacion-update.component.html',
})
export class SolicitudPrestacionUpdateComponent implements OnInit {
  isSaving = false;

  despachosCollection: IDespacho[] = [];
  itemNomencladorsSharedCollection: IItemNomenclador[] = [];
  prestadorsSharedCollection: IPrestador[] = [];
  usersSharedCollection: IUser[] = [];
  insumosSharedCollection: IInsumo[] = [];
  individuosSharedCollection: IIndividuo[] = [];
  clientesSharedCollection: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    numero: [],
    horaSolicitud: [],
    domicilio: [],
    telefono: [],
    edad: [],
    motivoLlamado: [],
    seEfectuo: [],
    internacion: [],
    observaciones: [],
    individuoAdhoc: [],
    precioReal: [],
    despacho: [],
    itemNomenclador: [],
    prestador: [],
    usuarioSolicitud: [],
    insumos: [],
    individuo: [],
    cliente: [],
  });

  constructor(
    protected solicitudPrestacionService: SolicitudPrestacionService,
    protected despachoService: DespachoService,
    protected itemNomencladorService: ItemNomencladorService,
    protected prestadorService: PrestadorService,
    protected userService: UserService,
    protected insumoService: InsumoService,
    protected individuoService: IndividuoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitudPrestacion }) => {
      if (solicitudPrestacion.id === undefined) {
        const today = dayjs().startOf('day');
        solicitudPrestacion.horaSolicitud = today;
      }

      this.updateForm(solicitudPrestacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const solicitudPrestacion = this.createFromForm();
    if (solicitudPrestacion.id !== undefined) {
      this.subscribeToSaveResponse(this.solicitudPrestacionService.update(solicitudPrestacion));
    } else {
      this.subscribeToSaveResponse(this.solicitudPrestacionService.create(solicitudPrestacion));
    }
  }

  trackDespachoById(index: number, item: IDespacho): number {
    return item.id!;
  }

  trackItemNomencladorById(index: number, item: IItemNomenclador): number {
    return item.id!;
  }

  trackPrestadorById(index: number, item: IPrestador): number {
    return item.id!;
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackInsumoById(index: number, item: IInsumo): number {
    return item.id!;
  }

  trackIndividuoById(index: number, item: IIndividuo): number {
    return item.id!;
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  getSelectedInsumo(option: IInsumo, selectedVals?: IInsumo[]): IInsumo {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitudPrestacion>>): void {
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

  protected updateForm(solicitudPrestacion: ISolicitudPrestacion): void {
    this.editForm.patchValue({
      id: solicitudPrestacion.id,
      tipo: solicitudPrestacion.tipo,
      numero: solicitudPrestacion.numero,
      horaSolicitud: solicitudPrestacion.horaSolicitud ? solicitudPrestacion.horaSolicitud.format(DATE_TIME_FORMAT) : null,
      domicilio: solicitudPrestacion.domicilio,
      telefono: solicitudPrestacion.telefono,
      edad: solicitudPrestacion.edad,
      motivoLlamado: solicitudPrestacion.motivoLlamado,
      seEfectuo: solicitudPrestacion.seEfectuo,
      internacion: solicitudPrestacion.internacion,
      observaciones: solicitudPrestacion.observaciones,
      individuoAdhoc: solicitudPrestacion.individuoAdhoc,
      precioReal: solicitudPrestacion.precioReal,
      despacho: solicitudPrestacion.despacho,
      itemNomenclador: solicitudPrestacion.itemNomenclador,
      prestador: solicitudPrestacion.prestador,
      usuarioSolicitud: solicitudPrestacion.usuarioSolicitud,
      insumos: solicitudPrestacion.insumos,
      individuo: solicitudPrestacion.individuo,
      cliente: solicitudPrestacion.cliente,
    });

    this.despachosCollection = this.despachoService.addDespachoToCollectionIfMissing(
      this.despachosCollection,
      solicitudPrestacion.despacho
    );
    this.itemNomencladorsSharedCollection = this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
      this.itemNomencladorsSharedCollection,
      solicitudPrestacion.itemNomenclador
    );
    this.prestadorsSharedCollection = this.prestadorService.addPrestadorToCollectionIfMissing(
      this.prestadorsSharedCollection,
      solicitudPrestacion.prestador
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(
      this.usersSharedCollection,
      solicitudPrestacion.usuarioSolicitud
    );
    this.insumosSharedCollection = this.insumoService.addInsumoToCollectionIfMissing(
      this.insumosSharedCollection,
      ...(solicitudPrestacion.insumos ?? [])
    );
    this.individuosSharedCollection = this.individuoService.addIndividuoToCollectionIfMissing(
      this.individuosSharedCollection,
      solicitudPrestacion.individuo
    );
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(
      this.clientesSharedCollection,
      solicitudPrestacion.cliente
    );
  }

  protected loadRelationshipsOptions(): void {
    this.despachoService
      .query({ filter: 'solicitudprestacion-is-null' })
      .pipe(map((res: HttpResponse<IDespacho[]>) => res.body ?? []))
      .pipe(
        map((despachos: IDespacho[]) =>
          this.despachoService.addDespachoToCollectionIfMissing(despachos, this.editForm.get('despacho')!.value)
        )
      )
      .subscribe((despachos: IDespacho[]) => (this.despachosCollection = despachos));

    this.itemNomencladorService
      .query()
      .pipe(map((res: HttpResponse<IItemNomenclador[]>) => res.body ?? []))
      .pipe(
        map((itemNomencladors: IItemNomenclador[]) =>
          this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(itemNomencladors, this.editForm.get('itemNomenclador')!.value)
        )
      )
      .subscribe((itemNomencladors: IItemNomenclador[]) => (this.itemNomencladorsSharedCollection = itemNomencladors));

    this.prestadorService
      .query()
      .pipe(map((res: HttpResponse<IPrestador[]>) => res.body ?? []))
      .pipe(
        map((prestadors: IPrestador[]) =>
          this.prestadorService.addPrestadorToCollectionIfMissing(prestadors, this.editForm.get('prestador')!.value)
        )
      )
      .subscribe((prestadors: IPrestador[]) => (this.prestadorsSharedCollection = prestadors));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('usuarioSolicitud')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.insumoService
      .query()
      .pipe(map((res: HttpResponse<IInsumo[]>) => res.body ?? []))
      .pipe(
        map((insumos: IInsumo[]) =>
          this.insumoService.addInsumoToCollectionIfMissing(insumos, ...(this.editForm.get('insumos')!.value ?? []))
        )
      )
      .subscribe((insumos: IInsumo[]) => (this.insumosSharedCollection = insumos));

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

  protected createFromForm(): ISolicitudPrestacion {
    return {
      ...new SolicitudPrestacion(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      horaSolicitud: this.editForm.get(['horaSolicitud'])!.value
        ? dayjs(this.editForm.get(['horaSolicitud'])!.value, DATE_TIME_FORMAT)
        : undefined,
      domicilio: this.editForm.get(['domicilio'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      edad: this.editForm.get(['edad'])!.value,
      motivoLlamado: this.editForm.get(['motivoLlamado'])!.value,
      seEfectuo: this.editForm.get(['seEfectuo'])!.value,
      internacion: this.editForm.get(['internacion'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      individuoAdhoc: this.editForm.get(['individuoAdhoc'])!.value,
      precioReal: this.editForm.get(['precioReal'])!.value,
      despacho: this.editForm.get(['despacho'])!.value,
      itemNomenclador: this.editForm.get(['itemNomenclador'])!.value,
      prestador: this.editForm.get(['prestador'])!.value,
      usuarioSolicitud: this.editForm.get(['usuarioSolicitud'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
      individuo: this.editForm.get(['individuo'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }
}
