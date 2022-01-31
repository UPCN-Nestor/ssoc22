import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, first, map, switchMap, tap } from 'rxjs/operators';

import dayjs, { Dayjs } from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISolicitudPrestacion, SolicitudPrestacion } from '../../entities/solicitud-prestacion/solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../../entities/solicitud-prestacion/service/solicitud-prestacion.service';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { DespachoService, EntityArrayResponseType } from 'app/entities/despacho/service/despacho.service';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';
import { NgbModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { PrestadorService } from 'app/entities/prestador/service/prestador.service';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { Adhesion, IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { AdhesionService } from 'app/entities/adhesion/service/adhesion.service';

@Component({
  selector: 'jhi-solicitud-prestacion-bono',
  templateUrl: './solicitud-prestacion-bono.component.html',
})
export class SolicitudPrestacionBonoComponent implements OnInit {
  isSaving = false;
  tipo = '';

  // *** Socio
  tipoCliente = 'Socio';
  deshabilitarNumeroSocio = false;
  deshabilitarNombreSocio = false;
  errorCliente = '';

  searchFailed = false;
  numeroSocioSeleccionado: number | null = null;
  clienteSeleccionado: ICliente | null = null;
  searching = false;
  // *** End socio

  adhesionesDeCliente: IAdhesion[] | null = [];
  practicasHabilitadas: IItemNomenclador[] | null = [];

  adhesionSeleccionada: IAdhesion | null = null;

  despachosCollection: IDespacho[] = [];
  itemNomencladorsSharedCollection: IItemNomenclador[] = [];
  usersSharedCollection: IUser[] = [];
  insumosSharedCollection: IInsumo[] = [];
  individuosSharedCollection: IIndividuo[] = [];
  prestadorsSharedCollection: IPrestador[] = [];

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
    despacho: [],
    itemNomenclador: [],
    usuarioSolicitud: [],
    insumos: [],
    individuo: [],
  });

  constructor(
    protected solicitudPrestacionService: SolicitudPrestacionService,
    protected despachoService: DespachoService,
    protected itemNomencladorService: ItemNomencladorService,
    protected userService: UserService,
    protected insumoService: InsumoService,
    protected clienteService: ClienteService,
    protected individuoService: IndividuoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected modalService: NgbModal,
    protected prestadorService: PrestadorService,
    protected adhesionService: AdhesionService
  ) {}

  ngOnInit(): void {
    const solicitudPrestacion = new SolicitudPrestacion();
    const ahora = dayjs(dayjs(), DATE_TIME_FORMAT);
    solicitudPrestacion.horaSolicitud = ahora;
    // Número: autogenerado en servidor.
    // Ítem nomenclador: asignado unívocamente en el servidor a partir del tipo de solicitud.
    // Usuario solicitud: asignado en el servidor.
    solicitudPrestacion.seEfectuo = false;
    solicitudPrestacion.internacion = false;
    solicitudPrestacion.tipo = this.tipo;

    this.updateForm(solicitudPrestacion);
  }

  formatShortTime(d: Dayjs | null | undefined): string {
    return d ? dayjs(d).format('HH:mm') : '';
  }

  previousState(): void {
    this.modalService.dismissAll();
    //window.history.back();
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

  trackAdhesionById(index: number, item: IAdhesion): number {
    return item.id!;
  }

  trackPrestadorById(index: number, item: IPrestador): number {
    return item.id!;
  }

  trackItemNomencladorById(index: number, item: IItemNomenclador): number {
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

  // *** Prueba typeahead
  search: OperatorFunction<string, readonly ICliente[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        term.length < 3
          ? []
          : this.clienteService.queryPorNombreParcial(term).pipe(
              map(res => res.body!) // Extrae array de Httpresponse
            )
      ),
      tap(() => (this.searching = false))
    );

  // eslint-disable-next-line
  resultFormatter: (item: any) => string = i => i.nombre || '';
  // eslint-disable-next-line
  inputFormatter: (item: any) => string = i => i.nombre || '';

  selectNombreSocio(event: NgbTypeaheadSelectItemEvent<ICliente>): void {
    this.limpiarCampos();
    this.clienteSeleccionado = event.item;
    this.numeroSocioSeleccionado = this.clienteSeleccionado.socio!;

    this.adhesionService.queryPorCliente(this.clienteSeleccionado.id!).subscribe(as => {
      this.adhesionesDeCliente = as.body;
    });
  }
  // *** Fin typeahead

  selectNumeroSocio(ev: any): void {
    this.clienteService.findPorNroSocio(ev.target.value as number).subscribe(
      cliente => {
        this.limpiarCampos();
        this.clienteSeleccionado = cliente.body;

        if (this.clienteSeleccionado) {
          this.adhesionService.queryPorCliente(this.clienteSeleccionado.id!).subscribe(as => {
            this.adhesionesDeCliente = as.body;
          });
        }
      },
      err => {
        this.errorCliente = 'No se encontró un cliente con ese número de socio';
        this.adhesionesDeCliente = null;
        this.clienteSeleccionado = null;
      }
    );
  }

  selectIndividuo(adhesion: any): void {
    this.editForm.patchValue({ individuo: adhesion.individuo, itemNomenclador: null });
    this.itemNomencladorService.queryPorAdhesion(adhesion.id).subscribe(res => {
      this.itemNomencladorsSharedCollection = res.body ? res.body : [];
    });
  }

  limpiarCampos(): void {
    this.errorCliente = '';
    this.adhesionesDeCliente = null;
    this.practicasHabilitadas = null;
    this.editForm.patchValue({ itemNomenclador: null });
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
      despacho: solicitudPrestacion.despacho,
      itemNomenclador: solicitudPrestacion.itemNomenclador,
      usuarioSolicitud: solicitudPrestacion.usuarioSolicitud,
      insumos: solicitudPrestacion.insumos,
      individuo: solicitudPrestacion.individuo,
    });

    this.despachosCollection = this.despachoService.addDespachoToCollectionIfMissing(
      this.despachosCollection,
      solicitudPrestacion.despacho
    );
    this.itemNomencladorsSharedCollection = this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(
      this.itemNomencladorsSharedCollection,
      solicitudPrestacion.itemNomenclador
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
    /*
    this.itemNomencladorService
      .query()
      .pipe(map((res: HttpResponse<IItemNomenclador[]>) => res.body ?? []))
      .pipe(
        map((itemNomencladors: IItemNomenclador[]) =>
          this.itemNomencladorService.addItemNomencladorToCollectionIfMissing(itemNomencladors, this.editForm.get('itemNomenclador')!.value)
        )
      )
      .subscribe((itemNomencladors: IItemNomenclador[]) => (this.itemNomencladorsSharedCollection = itemNomencladors));
*/
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

    this.prestadorService
      .query()
      .pipe(map((res: HttpResponse<IPrestador[]>) => res.body ?? []))
      .pipe(
        map((prestadors: IPrestador[]) =>
          this.prestadorService.addPrestadorToCollectionIfMissing(prestadors, this.editForm.get('prestador')!.value)
        )
      )
      .subscribe((prestadors: IPrestador[]) => (this.prestadorsSharedCollection = prestadors));
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
      despacho: this.editForm.get(['despacho'])!.value,
      itemNomenclador: this.editForm.get(['itemNomenclador'])!.value,
      usuarioSolicitud: this.editForm.get(['usuarioSolicitud'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
      individuo: this.editForm.get(['individuo'])!.value,
    };
  }
}