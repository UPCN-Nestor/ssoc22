jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ReglaPrestacionService } from '../service/regla-prestacion.service';
import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

import { ReglaPrestacionUpdateComponent } from './regla-prestacion-update.component';

describe('ReglaPrestacion Management Update Component', () => {
  let comp: ReglaPrestacionUpdateComponent;
  let fixture: ComponentFixture<ReglaPrestacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reglaPrestacionService: ReglaPrestacionService;
  let prestacionService: PrestacionService;
  let planService: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReglaPrestacionUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ReglaPrestacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReglaPrestacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reglaPrestacionService = TestBed.inject(ReglaPrestacionService);
    prestacionService = TestBed.inject(PrestacionService);
    planService = TestBed.inject(PlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Prestacion query and add missing value', () => {
      const reglaPrestacion: IReglaPrestacion = { id: 456 };
      const prestacion: IPrestacion = { id: 27639 };
      reglaPrestacion.prestacion = prestacion;

      const prestacionCollection: IPrestacion[] = [{ id: 65890 }];
      jest.spyOn(prestacionService, 'query').mockReturnValue(of(new HttpResponse({ body: prestacionCollection })));
      const additionalPrestacions = [prestacion];
      const expectedCollection: IPrestacion[] = [...additionalPrestacions, ...prestacionCollection];
      jest.spyOn(prestacionService, 'addPrestacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      expect(prestacionService.query).toHaveBeenCalled();
      expect(prestacionService.addPrestacionToCollectionIfMissing).toHaveBeenCalledWith(prestacionCollection, ...additionalPrestacions);
      expect(comp.prestacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Plan query and add missing value', () => {
      const reglaPrestacion: IReglaPrestacion = { id: 456 };
      const plan: IPlan = { id: 52981 };
      reglaPrestacion.plan = plan;

      const planCollection: IPlan[] = [{ id: 3761 }];
      jest.spyOn(planService, 'query').mockReturnValue(of(new HttpResponse({ body: planCollection })));
      const additionalPlans = [plan];
      const expectedCollection: IPlan[] = [...additionalPlans, ...planCollection];
      jest.spyOn(planService, 'addPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      expect(planService.query).toHaveBeenCalled();
      expect(planService.addPlanToCollectionIfMissing).toHaveBeenCalledWith(planCollection, ...additionalPlans);
      expect(comp.plansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reglaPrestacion: IReglaPrestacion = { id: 456 };
      const prestacion: IPrestacion = { id: 37870 };
      reglaPrestacion.prestacion = prestacion;
      const plan: IPlan = { id: 20035 };
      reglaPrestacion.plan = plan;

      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reglaPrestacion));
      expect(comp.prestacionsSharedCollection).toContain(prestacion);
      expect(comp.plansSharedCollection).toContain(plan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = { id: 123 };
      jest.spyOn(reglaPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reglaPrestacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reglaPrestacionService.update).toHaveBeenCalledWith(reglaPrestacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = new ReglaPrestacion();
      jest.spyOn(reglaPrestacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reglaPrestacion }));
      saveSubject.complete();

      // THEN
      expect(reglaPrestacionService.create).toHaveBeenCalledWith(reglaPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = { id: 123 };
      jest.spyOn(reglaPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reglaPrestacionService.update).toHaveBeenCalledWith(reglaPrestacion);
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
