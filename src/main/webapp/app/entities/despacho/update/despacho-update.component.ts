import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDespacho, Despacho } from '../despacho.model';
import { DespachoService } from '../service/despacho.service';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { PrestadorService } from 'app/entities/prestador/service/prestador.service';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';
import { IMedico } from 'app/entities/medico/medico.model';
import { MedicoService } from 'app/entities/medico/service/medico.service';
import { IEnfermero } from 'app/entities/enfermero/enfermero.model';
import { EnfermeroService } from 'app/entities/enfermero/service/enfermero.service';
import { IMovil } from 'app/entities/movil/movil.model';
import { MovilService } from 'app/entities/movil/service/movil.service';

@Component({
  selector: 'jhi-despacho-update',
  templateUrl: './despacho-update.component.html',
})
export class DespachoUpdateComponent implements OnInit {
  isSaving = false;

  prestadorsSharedCollection: IPrestador[] = [];
  chofersSharedCollection: IChofer[] = [];
  medicosSharedCollection: IMedico[] = [];
  enfermerosSharedCollection: IEnfermero[] = [];
  movilsSharedCollection: IMovil[] = [];

  editForm = this.fb.group({
    id: [],
    horaSalida: [],
    horaLlegada: [],
    prestador: [],
    chofer: [],
    medico: [],
    enfermero: [],
    movil: [],
  });

  constructor(
    protected despachoService: DespachoService,
    protected prestadorService: PrestadorService,
    protected choferService: ChoferService,
    protected medicoService: MedicoService,
    protected enfermeroService: EnfermeroService,
    protected movilService: MovilService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despacho }) => {
      if (despacho.id === undefined) {
        const today = dayjs().startOf('day');
        despacho.horaSalida = today;
        despacho.horaLlegada = today;
      }

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

  trackPrestadorById(index: number, item: IPrestador): number {
    return item.id!;
  }

  trackChoferById(index: number, item: IChofer): number {
    return item.id!;
  }

  trackMedicoById(index: number, item: IMedico): number {
    return item.id!;
  }

  trackEnfermeroById(index: number, item: IEnfermero): number {
    return item.id!;
  }

  trackMovilById(index: number, item: IMovil): number {
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
      horaSalida: despacho.horaSalida ? despacho.horaSalida.format(DATE_TIME_FORMAT) : null,
      horaLlegada: despacho.horaLlegada ? despacho.horaLlegada.format(DATE_TIME_FORMAT) : null,
      prestador: despacho.prestador,
      chofer: despacho.chofer,
      medico: despacho.medico,
      enfermero: despacho.enfermero,
      movil: despacho.movil,
    });

    this.prestadorsSharedCollection = this.prestadorService.addPrestadorToCollectionIfMissing(
      this.prestadorsSharedCollection,
      despacho.prestador
    );
    this.chofersSharedCollection = this.choferService.addChoferToCollectionIfMissing(this.chofersSharedCollection, despacho.chofer);
    this.medicosSharedCollection = this.medicoService.addMedicoToCollectionIfMissing(this.medicosSharedCollection, despacho.medico);
    this.enfermerosSharedCollection = this.enfermeroService.addEnfermeroToCollectionIfMissing(
      this.enfermerosSharedCollection,
      despacho.enfermero
    );
    this.movilsSharedCollection = this.movilService.addMovilToCollectionIfMissing(this.movilsSharedCollection, despacho.movil);
  }

  protected loadRelationshipsOptions(): void {
    this.prestadorService
      .query()
      .pipe(map((res: HttpResponse<IPrestador[]>) => res.body ?? []))
      .pipe(
        map((prestadors: IPrestador[]) =>
          this.prestadorService.addPrestadorToCollectionIfMissing(prestadors, this.editForm.get('prestador')!.value)
        )
      )
      .subscribe((prestadors: IPrestador[]) => (this.prestadorsSharedCollection = prestadors));

    this.choferService
      .query()
      .pipe(map((res: HttpResponse<IChofer[]>) => res.body ?? []))
      .pipe(map((chofers: IChofer[]) => this.choferService.addChoferToCollectionIfMissing(chofers, this.editForm.get('chofer')!.value)))
      .subscribe((chofers: IChofer[]) => (this.chofersSharedCollection = chofers));

    this.medicoService
      .query()
      .pipe(map((res: HttpResponse<IMedico[]>) => res.body ?? []))
      .pipe(map((medicos: IMedico[]) => this.medicoService.addMedicoToCollectionIfMissing(medicos, this.editForm.get('medico')!.value)))
      .subscribe((medicos: IMedico[]) => (this.medicosSharedCollection = medicos));

    this.enfermeroService
      .query()
      .pipe(map((res: HttpResponse<IEnfermero[]>) => res.body ?? []))
      .pipe(
        map((enfermeros: IEnfermero[]) =>
          this.enfermeroService.addEnfermeroToCollectionIfMissing(enfermeros, this.editForm.get('enfermero')!.value)
        )
      )
      .subscribe((enfermeros: IEnfermero[]) => (this.enfermerosSharedCollection = enfermeros));

    this.movilService
      .query()
      .pipe(map((res: HttpResponse<IMovil[]>) => res.body ?? []))
      .pipe(map((movils: IMovil[]) => this.movilService.addMovilToCollectionIfMissing(movils, this.editForm.get('movil')!.value)))
      .subscribe((movils: IMovil[]) => (this.movilsSharedCollection = movils));
  }

  protected createFromForm(): IDespacho {
    return {
      ...new Despacho(),
      id: this.editForm.get(['id'])!.value,
      horaSalida: this.editForm.get(['horaSalida'])!.value ? dayjs(this.editForm.get(['horaSalida'])!.value, DATE_TIME_FORMAT) : undefined,
      horaLlegada: this.editForm.get(['horaLlegada'])!.value
        ? dayjs(this.editForm.get(['horaLlegada'])!.value, DATE_TIME_FORMAT)
        : undefined,
      prestador: this.editForm.get(['prestador'])!.value,
      chofer: this.editForm.get(['chofer'])!.value,
      medico: this.editForm.get(['medico'])!.value,
      enfermero: this.editForm.get(['enfermero'])!.value,
      movil: this.editForm.get(['movil'])!.value,
    };
  }
}
