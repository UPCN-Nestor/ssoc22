import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProvisionService } from '../service/provision.service';
import { IProvision, Provision } from '../provision.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

import { ProvisionUpdateComponent } from './provision-update.component';

describe('Provision Management Update Component', () => {
  let comp: ProvisionUpdateComponent;
  let fixture: ComponentFixture<ProvisionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let provisionService: ProvisionService;
  let itemNomencladorService: ItemNomencladorService;
  let prestacionService: PrestacionService;
  let insumoService: InsumoService;
  let planService: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProvisionUpdateComponent],
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
      .overrideTemplate(ProvisionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProvisionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    provisionService = TestBed.inject(ProvisionService);
    itemNomencladorService = TestBed.inject(ItemNomencladorService);
    prestacionService = TestBed.inject(PrestacionService);
    insumoService = TestBed.inject(InsumoService);
    planService = TestBed.inject(PlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ItemNomenclador query and add missing value', () => {
      const provision: IProvision = { id: 456 };
      const itemNomenclador: IItemNomenclador = { id: 51940 };
      provision.itemNomenclador = itemNomenclador;

      const itemNomencladorCollection: IItemNomenclador[] = [{ id: 46820 }];
      jest.spyOn(itemNomencladorService, 'query').mockReturnValue(of(new HttpResponse({ body: itemNomencladorCollection })));
      const additionalItemNomencladors = [itemNomenclador];
      const expectedCollection: IItemNomenclador[] = [...additionalItemNomencladors, ...itemNomencladorCollection];
      jest.spyOn(itemNomencladorService, 'addItemNomencladorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(itemNomencladorService.query).toHaveBeenCalled();
      expect(itemNomencladorService.addItemNomencladorToCollectionIfMissing).toHaveBeenCalledWith(
        itemNomencladorCollection,
        ...additionalItemNomencladors
      );
      expect(comp.itemNomencladorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Prestacion query and add missing value', () => {
      const provision: IProvision = { id: 456 };
      const prestacion: IPrestacion = { id: 82313 };
      provision.prestacion = prestacion;

      const prestacionCollection: IPrestacion[] = [{ id: 36093 }];
      jest.spyOn(prestacionService, 'query').mockReturnValue(of(new HttpResponse({ body: prestacionCollection })));
      const additionalPrestacions = [prestacion];
      const expectedCollection: IPrestacion[] = [...additionalPrestacions, ...prestacionCollection];
      jest.spyOn(prestacionService, 'addPrestacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(prestacionService.query).toHaveBeenCalled();
      expect(prestacionService.addPrestacionToCollectionIfMissing).toHaveBeenCalledWith(prestacionCollection, ...additionalPrestacions);
      expect(comp.prestacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Insumo query and add missing value', () => {
      const provision: IProvision = { id: 456 };
      const insumos: IInsumo[] = [{ id: 20960 }];
      provision.insumos = insumos;

      const insumoCollection: IInsumo[] = [{ id: 18297 }];
      jest.spyOn(insumoService, 'query').mockReturnValue(of(new HttpResponse({ body: insumoCollection })));
      const additionalInsumos = [...insumos];
      const expectedCollection: IInsumo[] = [...additionalInsumos, ...insumoCollection];
      jest.spyOn(insumoService, 'addInsumoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(insumoService.query).toHaveBeenCalled();
      expect(insumoService.addInsumoToCollectionIfMissing).toHaveBeenCalledWith(insumoCollection, ...additionalInsumos);
      expect(comp.insumosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Plan query and add missing value', () => {
      const provision: IProvision = { id: 456 };
      const plan: IPlan = { id: 66226 };
      provision.plan = plan;

      const planCollection: IPlan[] = [{ id: 85092 }];
      jest.spyOn(planService, 'query').mockReturnValue(of(new HttpResponse({ body: planCollection })));
      const additionalPlans = [plan];
      const expectedCollection: IPlan[] = [...additionalPlans, ...planCollection];
      jest.spyOn(planService, 'addPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(planService.query).toHaveBeenCalled();
      expect(planService.addPlanToCollectionIfMissing).toHaveBeenCalledWith(planCollection, ...additionalPlans);
      expect(comp.plansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const provision: IProvision = { id: 456 };
      const itemNomenclador: IItemNomenclador = { id: 86640 };
      provision.itemNomenclador = itemNomenclador;
      const prestacion: IPrestacion = { id: 77731 };
      provision.prestacion = prestacion;
      const insumos: IInsumo = { id: 98107 };
      provision.insumos = [insumos];
      const plan: IPlan = { id: 4040 };
      provision.plan = plan;

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(provision));
      expect(comp.itemNomencladorsSharedCollection).toContain(itemNomenclador);
      expect(comp.prestacionsSharedCollection).toContain(prestacion);
      expect(comp.insumosSharedCollection).toContain(insumos);
      expect(comp.plansSharedCollection).toContain(plan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Provision>>();
      const provision = { id: 123 };
      jest.spyOn(provisionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provision }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(provisionService.update).toHaveBeenCalledWith(provision);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Provision>>();
      const provision = new Provision();
      jest.spyOn(provisionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: provision }));
      saveSubject.complete();

      // THEN
      expect(provisionService.create).toHaveBeenCalledWith(provision);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Provision>>();
      const provision = { id: 123 };
      jest.spyOn(provisionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(provisionService.update).toHaveBeenCalledWith(provision);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackItemNomencladorById', () => {
      it('Should return tracked ItemNomenclador primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackItemNomencladorById(0, entity);
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

    describe('trackPlanById', () => {
      it('Should return tracked Plan primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlanById(0, entity);
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
