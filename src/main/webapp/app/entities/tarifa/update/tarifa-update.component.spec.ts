import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TarifaService } from '../service/tarifa.service';
import { ITarifa, Tarifa } from '../tarifa.model';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';

import { TarifaUpdateComponent } from './tarifa-update.component';

describe('Tarifa Management Update Component', () => {
  let comp: TarifaUpdateComponent;
  let fixture: ComponentFixture<TarifaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tarifaService: TarifaService;
  let planService: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TarifaUpdateComponent],
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
      .overrideTemplate(TarifaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tarifaService = TestBed.inject(TarifaService);
    planService = TestBed.inject(PlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Plan query and add missing value', () => {
      const tarifa: ITarifa = { id: 456 };
      const plan: IPlan = { id: 99963 };
      tarifa.plan = plan;

      const planCollection: IPlan[] = [{ id: 98891 }];
      jest.spyOn(planService, 'query').mockReturnValue(of(new HttpResponse({ body: planCollection })));
      const additionalPlans = [plan];
      const expectedCollection: IPlan[] = [...additionalPlans, ...planCollection];
      jest.spyOn(planService, 'addPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tarifa });
      comp.ngOnInit();

      expect(planService.query).toHaveBeenCalled();
      expect(planService.addPlanToCollectionIfMissing).toHaveBeenCalledWith(planCollection, ...additionalPlans);
      expect(comp.plansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tarifa: ITarifa = { id: 456 };
      const plan: IPlan = { id: 65540 };
      tarifa.plan = plan;

      activatedRoute.data = of({ tarifa });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tarifa));
      expect(comp.plansSharedCollection).toContain(plan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tarifa>>();
      const tarifa = { id: 123 };
      jest.spyOn(tarifaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifa }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tarifaService.update).toHaveBeenCalledWith(tarifa);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tarifa>>();
      const tarifa = new Tarifa();
      jest.spyOn(tarifaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifa }));
      saveSubject.complete();

      // THEN
      expect(tarifaService.create).toHaveBeenCalledWith(tarifa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tarifa>>();
      const tarifa = { id: 123 };
      jest.spyOn(tarifaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tarifaService.update).toHaveBeenCalledWith(tarifa);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPlanById', () => {
      it('Should return tracked Plan primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlanById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
