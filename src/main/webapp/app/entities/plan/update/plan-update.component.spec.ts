jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PlanService } from '../service/plan.service';
import { IPlan, Plan } from '../plan.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';

import { PlanUpdateComponent } from './plan-update.component';

describe('Plan Management Update Component', () => {
  let comp: PlanUpdateComponent;
  let fixture: ComponentFixture<PlanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planService: PlanService;
  let prestacionService: PrestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlanUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PlanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planService = TestBed.inject(PlanService);
    prestacionService = TestBed.inject(PrestacionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Prestacion query and add missing value', () => {
      const plan: IPlan = { id: 456 };
      const prestacions: IPrestacion[] = [{ id: 71910 }];
      plan.prestacions = prestacions;

      const prestacionCollection: IPrestacion[] = [{ id: 74891 }];
      jest.spyOn(prestacionService, 'query').mockReturnValue(of(new HttpResponse({ body: prestacionCollection })));
      const additionalPrestacions = [...prestacions];
      const expectedCollection: IPrestacion[] = [...additionalPrestacions, ...prestacionCollection];
      jest.spyOn(prestacionService, 'addPrestacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ plan });
      comp.ngOnInit();

      expect(prestacionService.query).toHaveBeenCalled();
      expect(prestacionService.addPrestacionToCollectionIfMissing).toHaveBeenCalledWith(prestacionCollection, ...additionalPrestacions);
      expect(comp.prestacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const plan: IPlan = { id: 456 };
      const prestacions: IPrestacion = { id: 78536 };
      plan.prestacions = [prestacions];

      activatedRoute.data = of({ plan });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(plan));
      expect(comp.prestacionsSharedCollection).toContain(prestacions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Plan>>();
      const plan = { id: 123 };
      jest.spyOn(planService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plan }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(planService.update).toHaveBeenCalledWith(plan);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Plan>>();
      const plan = new Plan();
      jest.spyOn(planService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plan }));
      saveSubject.complete();

      // THEN
      expect(planService.create).toHaveBeenCalledWith(plan);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Plan>>();
      const plan = { id: 123 };
      jest.spyOn(planService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planService.update).toHaveBeenCalledWith(plan);
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
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedPrestacion', () => {
      it('Should return option if no Prestacion is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPrestacion(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Prestacion for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPrestacion(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Prestacion is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPrestacion(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
