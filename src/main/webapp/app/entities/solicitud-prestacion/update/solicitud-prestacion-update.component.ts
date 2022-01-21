import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { DespachoService } from 'app/entities/despacho/service/despacho.service';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { PrestadorService } from 'app/entities/prestador/service/prestador.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';

@Component({
  selector: 'jhi-solicitud-prestacion-update',
  templateUrl: './solicitud-prestacion-update.component.html',
})
export class SolicitudPrestacionUpdateComponent implements OnInit {
  isSaving = false;

  despachosCollection: IDespacho[] = [];
  prestadorsCollection: IPrestador[] = [];
  prestacionsSharedCollection: IPrestacion[] = [];
  insumosSharedCollection: IInsumo[] = [];
  individuosSharedCollection: IIndividuo[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    numero: [],
    horaSolicitud: [],
    domicilio: [],
    telefono: [],
    edad: [],
    observaciones: [],
    despacho: [],
    prestador: [],
    prestacion: [],
    insumos: [],
    individuo: [],
  });

  constructor(
    protected solicitudPrestacionService: SolicitudPrestacionService,
    protected despachoService: DespachoService,
    protected prestadorService: PrestadorService,
    protected prestacionService: PrestacionService,
    protected insumoService: InsumoService,
    protected individuoService: IndividuoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitudPrestacion }) => {
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

  trackPrestadorById(index: number, item: IPrestador): number {
    return item.id!;
  }

  trackPrestacionById(index: number, item: IPrestacion): number {
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
      fecha: solicitudPrestacion.fecha,
      numero: solicitudPrestacion.numero,
      horaSolicitud: solicitudPrestacion.horaSolicitud,
      domicilio: solicitudPrestacion.domicilio,
      telefono: solicitudPrestacion.telefono,
      edad: solicitudPrestacion.edad,
      observaciones: solicitudPrestacion.observaciones,
      despacho: solicitudPrestacion.despacho,
      prestador: solicitudPrestacion.prestador,
      prestacion: solicitudPrestacion.prestacion,
      insumos: solicitudPrestacion.insumos,
      individuo: solicitudPrestacion.individuo,
    });

    this.despachosCollection = this.despachoService.addDespachoToCollectionIfMissing(
      this.despachosCollection,
      solicitudPrestacion.despacho
    );
    this.prestadorsCollection = this.prestadorService.addPrestadorToCollectionIfMissing(
      this.prestadorsCollection,
      solicitudPrestacion.prestador
    );
    this.prestacionsSharedCollection = this.prestacionService.addPrestacionToCollectionIfMissing(
      this.prestacionsSharedCollection,
      solicitudPrestacion.prestacion
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

    this.prestadorService
      .query({ filter: 'solicitudprestacion-is-null' })
      .pipe(map((res: HttpResponse<IPrestador[]>) => res.body ?? []))
      .pipe(
        map((prestadors: IPrestador[]) =>
          this.prestadorService.addPrestadorToCollectionIfMissing(prestadors, this.editForm.get('prestador')!.value)
        )
      )
      .subscribe((prestadors: IPrestador[]) => (this.prestadorsCollection = prestadors));

    this.prestacionService
      .query()
      .pipe(map((res: HttpResponse<IPrestacion[]>) => res.body ?? []))
      .pipe(
        map((prestacions: IPrestacion[]) =>
          this.prestacionService.addPrestacionToCollectionIfMissing(prestacions, this.editForm.get('prestacion')!.value)
        )
      )
      .subscribe((prestacions: IPrestacion[]) => (this.prestacionsSharedCollection = prestacions));

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
  }

  protected createFromForm(): ISolicitudPrestacion {
    return {
      ...new SolicitudPrestacion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      horaSolicitud: this.editForm.get(['horaSolicitud'])!.value,
      domicilio: this.editForm.get(['domicilio'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      edad: this.editForm.get(['edad'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      despacho: this.editForm.get(['despacho'])!.value,
      prestador: this.editForm.get(['prestador'])!.value,
      prestacion: this.editForm.get(['prestacion'])!.value,
      insumos: this.editForm.get(['insumos'])!.value,
      individuo: this.editForm.get(['individuo'])!.value,
    };
  }
}
