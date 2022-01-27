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
import { IChofer } from 'app/entities/chofer/chofer.model';
import { ChoferService } from 'app/entities/chofer/service/chofer.service';
import { IMedico } from 'app/entities/medico/medico.model';
import { MedicoService } from 'app/entities/medico/service/medico.service';
import { IEnfermero } from 'app/entities/enfermero/enfermero.model';
import { EnfermeroService } from 'app/entities/enfermero/service/enfermero.service';
import { IMovil } from 'app/entities/movil/movil.model';
import { MovilService } from 'app/entities/movil/service/movil.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-despacho-update',
  templateUrl: './despacho-update.component.html',
})
export class DespachoUpdateComponent implements OnInit {
  isSaving = false;

  chofersSharedCollection: IChofer[] = [];
  medicosSharedCollection: IMedico[] = [];
  enfermerosSharedCollection: IEnfermero[] = [];
  movilsSharedCollection: IMovil[] = [];
  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    horaSalida: [],
    horaLlegada: [],
    horaLibre: [],
    chofer: [],
    medico: [],
    enfermero: [],
    movil: [],
    usuarioSalida: [],
    usuarioLlegada: [],
    usuarioLibre: [],
  });

  constructor(
    protected despachoService: DespachoService,
    protected choferService: ChoferService,
    protected medicoService: MedicoService,
    protected enfermeroService: EnfermeroService,
    protected movilService: MovilService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despacho }) => {
      if (despacho.id === undefined) {
        const today = dayjs().startOf('day');
        despacho.horaSalida = today;
        despacho.horaLlegada = today;
        despacho.horaLibre = today;
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

  trackUserById(index: number, item: IUser): number {
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
      horaLibre: despacho.horaLibre ? despacho.horaLibre.format(DATE_TIME_FORMAT) : null,
      chofer: despacho.chofer,
      medico: despacho.medico,
      enfermero: despacho.enfermero,
      movil: despacho.movil,
      usuarioSalida: despacho.usuarioSalida,
      usuarioLlegada: despacho.usuarioLlegada,
      usuarioLibre: despacho.usuarioLibre,
    });

    this.chofersSharedCollection = this.choferService.addChoferToCollectionIfMissing(this.chofersSharedCollection, despacho.chofer);
    this.medicosSharedCollection = this.medicoService.addMedicoToCollectionIfMissing(this.medicosSharedCollection, despacho.medico);
    this.enfermerosSharedCollection = this.enfermeroService.addEnfermeroToCollectionIfMissing(
      this.enfermerosSharedCollection,
      despacho.enfermero
    );
    this.movilsSharedCollection = this.movilService.addMovilToCollectionIfMissing(this.movilsSharedCollection, despacho.movil);
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(
      this.usersSharedCollection,
      despacho.usuarioSalida,
      despacho.usuarioLlegada,
      despacho.usuarioLibre
    );
  }

  protected loadRelationshipsOptions(): void {
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

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(
        map((users: IUser[]) =>
          this.userService.addUserToCollectionIfMissing(
            users,
            this.editForm.get('usuarioSalida')!.value,
            this.editForm.get('usuarioLlegada')!.value,
            this.editForm.get('usuarioLibre')!.value
          )
        )
      )
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IDespacho {
    return {
      ...new Despacho(),
      id: this.editForm.get(['id'])!.value,
      horaSalida: this.editForm.get(['horaSalida'])!.value ? dayjs(this.editForm.get(['horaSalida'])!.value, DATE_TIME_FORMAT) : undefined,
      horaLlegada: this.editForm.get(['horaLlegada'])!.value
        ? dayjs(this.editForm.get(['horaLlegada'])!.value, DATE_TIME_FORMAT)
        : undefined,
      horaLibre: this.editForm.get(['horaLibre'])!.value ? dayjs(this.editForm.get(['horaLibre'])!.value, DATE_TIME_FORMAT) : undefined,
      chofer: this.editForm.get(['chofer'])!.value,
      medico: this.editForm.get(['medico'])!.value,
      enfermero: this.editForm.get(['enfermero'])!.value,
      movil: this.editForm.get(['movil'])!.value,
      usuarioSalida: this.editForm.get(['usuarioSalida'])!.value,
      usuarioLlegada: this.editForm.get(['usuarioLlegada'])!.value,
      usuarioLibre: this.editForm.get(['usuarioLibre'])!.value,
    };
  }
}
