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
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
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
  let itemNomencladorService: ItemNomencladorService;
  let userService: UserService;
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
    itemNomencladorService = TestBed.inject(ItemNomencladorService);
    userService = TestBed.inject(UserService);
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

    it('Should call ItemNomenclador query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const itemNomenclador: IItemNomenclador = { id: 62866 };
      solicitudPrestacion.itemNomenclador = itemNomenclador;

      const itemNomencladorCollection: IItemNomenclador[] = [{ id: 49387 }];
      jest.spyOn(itemNomencladorService, 'query').mockReturnValue(of(new HttpResponse({ body: itemNomencladorCollection })));
      const additionalItemNomencladors = [itemNomenclador];
      const expectedCollection: IItemNomenclador[] = [...additionalItemNomencladors, ...itemNomencladorCollection];
      jest.spyOn(itemNomencladorService, 'addItemNomencladorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(itemNomencladorService.query).toHaveBeenCalled();
      expect(itemNomencladorService.addItemNomencladorToCollectionIfMissing).toHaveBeenCalledWith(
        itemNomencladorCollection,
        ...additionalItemNomencladors
      );
      expect(comp.itemNomencladorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };
      const usuarioSolicitud: IUser = { id: 17862 };
      solicitudPrestacion.usuarioSolicitud = usuarioSolicitud;

      const userCollection: IUser[] = [{ id: 50621 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [usuarioSolicitud];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
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
      const itemNomenclador: IItemNomenclador = { id: 22519 };
      solicitudPrestacion.itemNomenclador = itemNomenclador;
      const usuarioSolicitud: IUser = { id: 38818 };
      solicitudPrestacion.usuarioSolicitud = usuarioSolicitud;
      const insumos: IInsumo = { id: 7828 };
      solicitudPrestacion.insumos = [insumos];
      const individuo: IIndividuo = { id: 56995 };
      solicitudPrestacion.individuo = individuo;

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(solicitudPrestacion));
      expect(comp.despachosCollection).toContain(despacho);
      expect(comp.itemNomencladorsSharedCollection).toContain(itemNomenclador);
      expect(comp.usersSharedCollection).toContain(usuarioSolicitud);
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

    describe('trackItemNomencladorById', () => {
      it('Should return tracked ItemNomenclador primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackItemNomencladorById(0, entity);
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
