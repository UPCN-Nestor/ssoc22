import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContratoService } from '../service/contrato.service';
import { IContrato, Contrato } from '../contrato.model';
import { IPlan } from 'app/entities/plan/plan.model';
import { PlanService } from 'app/entities/plan/service/plan.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

import { ContratoUpdateComponent } from './contrato-update.component';

describe('Contrato Management Update Component', () => {
  let comp: ContratoUpdateComponent;
  let fixture: ComponentFixture<ContratoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contratoService: ContratoService;
  let planService: PlanService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContratoUpdateComponent],
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
      .overrideTemplate(ContratoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContratoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contratoService = TestBed.inject(ContratoService);
    planService = TestBed.inject(PlanService);
    clienteService = TestBed.inject(ClienteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Plan query and add missing value', () => {
      const contrato: IContrato = { id: 456 };
      const plan: IPlan = { id: 9470 };
      contrato.plan = plan;

      const planCollection: IPlan[] = [{ id: 81254 }];
      jest.spyOn(planService, 'query').mockReturnValue(of(new HttpResponse({ body: planCollection })));
      const additionalPlans = [plan];
      const expectedCollection: IPlan[] = [...additionalPlans, ...planCollection];
      jest.spyOn(planService, 'addPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      expect(planService.query).toHaveBeenCalled();
      expect(planService.addPlanToCollectionIfMissing).toHaveBeenCalledWith(planCollection, ...additionalPlans);
      expect(comp.plansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cliente query and add missing value', () => {
      const contrato: IContrato = { id: 456 };
      const cliente: ICliente = { id: 79003 };
      contrato.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 28091 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contrato: IContrato = { id: 456 };
      const plan: IPlan = { id: 65662 };
      contrato.plan = plan;
      const cliente: ICliente = { id: 27797 };
      contrato.cliente = cliente;

      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(contrato));
      expect(comp.plansSharedCollection).toContain(plan);
      expect(comp.clientesSharedCollection).toContain(cliente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contrato>>();
      const contrato = { id: 123 };
      jest.spyOn(contratoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contrato }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(contratoService.update).toHaveBeenCalledWith(contrato);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contrato>>();
      const contrato = new Contrato();
      jest.spyOn(contratoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contrato }));
      saveSubject.complete();

      // THEN
      expect(contratoService.create).toHaveBeenCalledWith(contrato);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Contrato>>();
      const contrato = { id: 123 };
      jest.spyOn(contratoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contrato });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contratoService.update).toHaveBeenCalledWith(contrato);
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
