jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SubscripcionService } from '../service/subscripcion.service';
import { ISubscripcion, Subscripcion } from '../subscripcion.model';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

import { SubscripcionUpdateComponent } from './subscripcion-update.component';

describe('Subscripcion Management Update Component', () => {
  let comp: SubscripcionUpdateComponent;
  let fixture: ComponentFixture<SubscripcionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subscripcionService: SubscripcionService;
  let planService: PlanService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubscripcionUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SubscripcionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubscripcionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subscripcionService = TestBed.inject(SubscripcionService);
    planService = TestBed.inject(PlanService);
    clienteService = TestBed.inject(ClienteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Plan query and add missing value', () => {
      const subscripcion: ISubscripcion = { id: 456 };
      const plan: IPlan = { id: 11111 };
      subscripcion.plan = plan;

      const planCollection: IPlan[] = [{ id: 90425 }];
      jest.spyOn(planService, 'query').mockReturnValue(of(new HttpResponse({ body: planCollection })));
      const additionalPlans = [plan];
      const expectedCollection: IPlan[] = [...additionalPlans, ...planCollection];
      jest.spyOn(planService, 'addPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      expect(planService.query).toHaveBeenCalled();
      expect(planService.addPlanToCollectionIfMissing).toHaveBeenCalledWith(planCollection, ...additionalPlans);
      expect(comp.plansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cliente query and add missing value', () => {
      const subscripcion: ISubscripcion = { id: 456 };
      const cliente: ICliente = { id: 53707 };
      subscripcion.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 67746 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const subscripcion: ISubscripcion = { id: 456 };
      const plan: IPlan = { id: 87610 };
      subscripcion.plan = plan;
      const cliente: ICliente = { id: 934 };
      subscripcion.cliente = cliente;

      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(subscripcion));
      expect(comp.plansSharedCollection).toContain(plan);
      expect(comp.clientesSharedCollection).toContain(cliente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Subscripcion>>();
      const subscripcion = { id: 123 };
      jest.spyOn(subscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subscripcion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(subscripcionService.update).toHaveBeenCalledWith(subscripcion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Subscripcion>>();
      const subscripcion = new Subscripcion();
      jest.spyOn(subscripcionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subscripcion }));
      saveSubject.complete();

      // THEN
      expect(subscripcionService.create).toHaveBeenCalledWith(subscripcion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Subscripcion>>();
      const subscripcion = { id: 123 };
      jest.spyOn(subscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subscripcionService.update).toHaveBeenCalledWith(subscripcion);
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

    describe('trackClienteById', () => {
      it('Should return tracked Cliente primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClienteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
