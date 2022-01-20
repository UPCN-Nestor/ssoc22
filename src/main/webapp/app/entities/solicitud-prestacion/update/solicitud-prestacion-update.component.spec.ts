import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';
import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';
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

import { SolicitudPrestacionUpdateComponent } from './solicitud-prestacion-update.component';

describe('SolicitudPrestacion Management Update Component', () => {
  let comp: SolicitudPrestacionUpdateComponent;
  let fixture: ComponentFixture<SolicitudPrestacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let solicitudPrestacionService: SolicitudPrestacionService;
  let despachoService: DespachoService;
  let prestadorService: PrestadorService;
  let prestacionService: PrestacionService;
  let insumoService: InsumoService;
  let individuoService: IndividuoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SolicitudPrestacionUpdateComponent],
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
      .overrideTemplate(SolicitudPrestacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SolicitudPrestacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    solicitudPrestacionService = TestBed.inject(SolicitudPrestacionService);
    despachoService = TestBed.inject(DespachoService);
    prestadorService = TestBed.inject(PrestadorService);
    prestacionService = TestBed.inject(PrestacionService);
    insumoService = TestBed.inject(InsumoService);
    individuoService = TestBed.inject(IndividuoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call despacho query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const despacho: IDespacho = { id: 41293 };
      solicitudPrestacion.despacho = despacho;

      const despachoCollection: IDespacho[] = [{ id: 83776 }];
      jest.spyOn(despachoService, 'query').mockReturnValue(of(new HttpResponse({ body: despachoCollection })));
      const expectedCollection: IDespacho[] = [despacho, ...despachoCollection];
      jest.spyOn(despachoService, 'addDespachoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(despachoService.query).toHaveBeenCalled();
      expect(despachoService.addDespachoToCollectionIfMissing).toHaveBeenCalledWith(despachoCollection, despacho);
      expect(comp.despachosCollection).toEqual(expectedCollection);
    });

    it('Should call prestador query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const prestador: IPrestador = { id: 65158 };
      solicitudPrestacion.prestador = prestador;

      const prestadorCollection: IPrestador[] = [{ id: 93502 }];
      jest.spyOn(prestadorService, 'query').mockReturnValue(of(new HttpResponse({ body: prestadorCollection })));
      const expectedCollection: IPrestador[] = [prestador, ...prestadorCollection];
      jest.spyOn(prestadorService, 'addPrestadorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(prestadorService.query).toHaveBeenCalled();
      expect(prestadorService.addPrestadorToCollectionIfMissing).toHaveBeenCalledWith(prestadorCollection, prestador);
      expect(comp.prestadorsCollection).toEqual(expectedCollection);
    });

    it('Should call Prestacion query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const prestacion: IPrestacion = { id: 41394 };
      solicitudPrestacion.prestacion = prestacion;

      const prestacionCollection: IPrestacion[] = [{ id: 63300 }];
      jest.spyOn(prestacionService, 'query').mockReturnValue(of(new HttpResponse({ body: prestacionCollection })));
      const additionalPrestacions = [prestacion];
      const expectedCollection: IPrestacion[] = [...additionalPrestacions, ...prestacionCollection];
      jest.spyOn(prestacionService, 'addPrestacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(prestacionService.query).toHaveBeenCalled();
      expect(prestacionService.addPrestacionToCollectionIfMissing).toHaveBeenCalledWith(prestacionCollection, ...additionalPrestacions);
      expect(comp.prestacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Insumo query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const insumos: IInsumo[] = [{ id: 99946 }];
      solicitudPrestacion.insumos = insumos;

      const insumoCollection: IInsumo[] = [{ id: 38263 }];
      jest.spyOn(insumoService, 'query').mockReturnValue(of(new HttpResponse({ body: insumoCollection })));
      const additionalInsumos = [...insumos];
      const expectedCollection: IInsumo[] = [...additionalInsumos, ...insumoCollection];
      jest.spyOn(insumoService, 'addInsumoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(insumoService.query).toHaveBeenCalled();
      expect(insumoService.addInsumoToCollectionIfMissing).toHaveBeenCalledWith(insumoCollection, ...additionalInsumos);
      expect(comp.insumosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Individuo query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const individuo: IIndividuo = { id: 57196 };
      solicitudPrestacion.individuo = individuo;

      const individuoCollection: IIndividuo[] = [{ id: 97198 }];
      jest.spyOn(individuoService, 'query').mockReturnValue(of(new HttpResponse({ body: individuoCollection })));
      const additionalIndividuos = [individuo];
      const expectedCollection: IIndividuo[] = [...additionalIndividuos, ...individuoCollection];
      jest.spyOn(individuoService, 'addIndividuoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(individuoService.query).toHaveBeenCalled();
      expect(individuoService.addIndividuoToCollectionIfMissing).toHaveBeenCalledWith(individuoCollection, ...additionalIndividuos);
      expect(comp.individuosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const despacho: IDespacho = { id: 14419 };
      solicitudPrestacion.despacho = despacho;
      const prestador: IPrestador = { id: 89506 };
      solicitudPrestacion.prestador = prestador;
      const prestacion: IPrestacion = { id: 58048 };
      solicitudPrestacion.prestacion = prestacion;
      const insumos: IInsumo = { id: 7828 };
      solicitudPrestacion.insumos = [insumos];
      const individuo: IIndividuo = { id: 56995 };
      solicitudPrestacion.individuo = individuo;

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(solicitudPrestacion));
      expect(comp.despachosCollection).toContain(despacho);
      expect(comp.prestadorsCollection).toContain(prestador);
      expect(comp.prestacionsSharedCollection).toContain(prestacion);
      expect(comp.insumosSharedCollection).toContain(insumos);
      expect(comp.individuosSharedCollection).toContain(individuo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = { id: 123 };
      jest.spyOn(solicitudPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: solicitudPrestacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(solicitudPrestacionService.update).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = new SolicitudPrestacion();
      jest.spyOn(solicitudPrestacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: solicitudPrestacion }));
      saveSubject.complete();

      // THEN
      expect(solicitudPrestacionService.create).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = { id: 123 };
      jest.spyOn(solicitudPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(solicitudPrestacionService.update).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDespachoById', () => {
      it('Should return tracked Despacho primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDespachoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPrestadorById', () => {
      it('Should return tracked Prestador primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPrestadorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPrestacionById', () => {
      it('Should return tracked Prestacion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPrestacionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackInsumoById', () => {
      it('Should return tracked Insumo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInsumoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackIndividuoById', () => {
      it('Should return tracked Individuo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackIndividuoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedInsumo', () => {
      it('Should return option if no Insumo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedInsumo(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Insumo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedInsumo(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Insumo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedInsumo(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
