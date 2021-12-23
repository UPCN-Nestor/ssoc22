jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProvisionService } from '../service/provision.service';
import { IProvision, Provision } from '../provision.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

import { ProvisionUpdateComponent } from './provision-update.component';

describe('Provision Management Update Component', () => {
  let comp: ProvisionUpdateComponent;
  let fixture: ComponentFixture<ProvisionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let provisionService: ProvisionService;
  let prestacionService: PrestacionService;
  let planService: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProvisionUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ProvisionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProvisionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    provisionService = TestBed.inject(ProvisionService);
    prestacionService = TestBed.inject(PrestacionService);
    planService = TestBed.inject(PlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
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
      const prestacion: IPrestacion = { id: 77731 };
      provision.prestacion = prestacion;
      const plan: IPlan = { id: 4040 };
      provision.plan = plan;

      activatedRoute.data = of({ provision });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(provision));
      expect(comp.prestacionsSharedCollection).toContain(prestacion);
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
    describe('trackPrestacionById', () => {
      it('Should return tracked Prestacion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPrestacionById(0, entity);
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
});
