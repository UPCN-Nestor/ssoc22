import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DespachoService } from '../service/despacho.service';
import { IDespacho, Despacho } from '../despacho.model';
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

import { DespachoUpdateComponent } from './despacho-update.component';

describe('Despacho Management Update Component', () => {
  let comp: DespachoUpdateComponent;
  let fixture: ComponentFixture<DespachoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let despachoService: DespachoService;
  let choferService: ChoferService;
  let medicoService: MedicoService;
  let enfermeroService: EnfermeroService;
  let movilService: MovilService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DespachoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DespachoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DespachoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    despachoService = TestBed.inject(DespachoService);
    choferService = TestBed.inject(ChoferService);
    medicoService = TestBed.inject(MedicoService);
    enfermeroService = TestBed.inject(EnfermeroService);
    movilService = TestBed.inject(MovilService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Chofer query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const chofer: IChofer = { id: 36245 };
      despacho.chofer = chofer;

      const choferCollection: IChofer[] = [{ id: 90798 }];
      jest.spyOn(choferService, 'query').mockReturnValue(of(new HttpResponse({ body: choferCollection })));
      const additionalChofers = [chofer];
      const expectedCollection: IChofer[] = [...additionalChofers, ...choferCollection];
      jest.spyOn(choferService, 'addChoferToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(choferService.query).toHaveBeenCalled();
      expect(choferService.addChoferToCollectionIfMissing).toHaveBeenCalledWith(choferCollection, ...additionalChofers);
      expect(comp.chofersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Medico query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const medico: IMedico = { id: 36584 };
      despacho.medico = medico;

      const medicoCollection: IMedico[] = [{ id: 62954 }];
      jest.spyOn(medicoService, 'query').mockReturnValue(of(new HttpResponse({ body: medicoCollection })));
      const additionalMedicos = [medico];
      const expectedCollection: IMedico[] = [...additionalMedicos, ...medicoCollection];
      jest.spyOn(medicoService, 'addMedicoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(medicoService.query).toHaveBeenCalled();
      expect(medicoService.addMedicoToCollectionIfMissing).toHaveBeenCalledWith(medicoCollection, ...additionalMedicos);
      expect(comp.medicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Enfermero query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const enfermero: IEnfermero = { id: 89706 };
      despacho.enfermero = enfermero;

      const enfermeroCollection: IEnfermero[] = [{ id: 79411 }];
      jest.spyOn(enfermeroService, 'query').mockReturnValue(of(new HttpResponse({ body: enfermeroCollection })));
      const additionalEnfermeros = [enfermero];
      const expectedCollection: IEnfermero[] = [...additionalEnfermeros, ...enfermeroCollection];
      jest.spyOn(enfermeroService, 'addEnfermeroToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(enfermeroService.query).toHaveBeenCalled();
      expect(enfermeroService.addEnfermeroToCollectionIfMissing).toHaveBeenCalledWith(enfermeroCollection, ...additionalEnfermeros);
      expect(comp.enfermerosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Movil query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const movil: IMovil = { id: 40484 };
      despacho.movil = movil;

      const movilCollection: IMovil[] = [{ id: 92199 }];
      jest.spyOn(movilService, 'query').mockReturnValue(of(new HttpResponse({ body: movilCollection })));
      const additionalMovils = [movil];
      const expectedCollection: IMovil[] = [...additionalMovils, ...movilCollection];
      jest.spyOn(movilService, 'addMovilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(movilService.query).toHaveBeenCalled();
      expect(movilService.addMovilToCollectionIfMissing).toHaveBeenCalledWith(movilCollection, ...additionalMovils);
      expect(comp.movilsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const usuarioSalida: IUser = { id: 37626 };
      despacho.usuarioSalida = usuarioSalida;
      const usuarioLlegada: IUser = { id: 1468 };
      despacho.usuarioLlegada = usuarioLlegada;
      const usuarioLibre: IUser = { id: 91963 };
      despacho.usuarioLibre = usuarioLibre;

      const userCollection: IUser[] = [{ id: 61958 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [usuarioSalida, usuarioLlegada, usuarioLibre];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const despacho: IDespacho = { id: 456 };
      const chofer: IChofer = { id: 8395 };
      despacho.chofer = chofer;
      const medico: IMedico = { id: 70617 };
      despacho.medico = medico;
      const enfermero: IEnfermero = { id: 64845 };
      despacho.enfermero = enfermero;
      const movil: IMovil = { id: 12845 };
      despacho.movil = movil;
      const usuarioSalida: IUser = { id: 98911 };
      despacho.usuarioSalida = usuarioSalida;
      const usuarioLlegada: IUser = { id: 67106 };
      despacho.usuarioLlegada = usuarioLlegada;
      const usuarioLibre: IUser = { id: 37533 };
      despacho.usuarioLibre = usuarioLibre;

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(despacho));
      expect(comp.chofersSharedCollection).toContain(chofer);
      expect(comp.medicosSharedCollection).toContain(medico);
      expect(comp.enfermerosSharedCollection).toContain(enfermero);
      expect(comp.movilsSharedCollection).toContain(movil);
      expect(comp.usersSharedCollection).toContain(usuarioSalida);
      expect(comp.usersSharedCollection).toContain(usuarioLlegada);
      expect(comp.usersSharedCollection).toContain(usuarioLibre);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = { id: 123 };
      jest.spyOn(despachoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despacho }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(despachoService.update).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = new Despacho();
      jest.spyOn(despachoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despacho }));
      saveSubject.complete();

      // THEN
      expect(despachoService.create).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = { id: 123 };
      jest.spyOn(despachoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(despachoService.update).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackChoferById', () => {
      it('Should return tracked Chofer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackChoferById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackMedicoById', () => {
      it('Should return tracked Medico primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMedicoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEnfermeroById', () => {
      it('Should return tracked Enfermero primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEnfermeroById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackMovilById', () => {
      it('Should return tracked Movil primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMovilById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
