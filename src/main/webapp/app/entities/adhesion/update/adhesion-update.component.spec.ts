import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdhesionService } from '../service/adhesion.service';
import { IAdhesion, Adhesion } from '../adhesion.model';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IndividuoService } from 'app/entities/individuo/service/individuo.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';

import { AdhesionUpdateComponent } from './adhesion-update.component';

describe('Adhesion Management Update Component', () => {
  let comp: AdhesionUpdateComponent;
  let fixture: ComponentFixture<AdhesionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adhesionService: AdhesionService;
  let individuoService: IndividuoService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AdhesionUpdateComponent],
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
      .overrideTemplate(AdhesionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdhesionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    adhesionService = TestBed.inject(AdhesionService);
    individuoService = TestBed.inject(IndividuoService);
    clienteService = TestBed.inject(ClienteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Individuo query and add missing value', () => {
      const adhesion: IAdhesion = { id: 456 };
      const individuo: IIndividuo = { id: 75860 };
      adhesion.individuo = individuo;

      const individuoCollection: IIndividuo[] = [{ id: 62045 }];
      jest.spyOn(individuoService, 'query').mockReturnValue(of(new HttpResponse({ body: individuoCollection })));
      const additionalIndividuos = [individuo];
      const expectedCollection: IIndividuo[] = [...additionalIndividuos, ...individuoCollection];
      jest.spyOn(individuoService, 'addIndividuoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      expect(individuoService.query).toHaveBeenCalled();
      expect(individuoService.addIndividuoToCollectionIfMissing).toHaveBeenCalledWith(individuoCollection, ...additionalIndividuos);
      expect(comp.individuosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cliente query and add missing value', () => {
      const adhesion: IAdhesion = { id: 456 };
      const cliente: ICliente = { id: 80663 };
      adhesion.cliente = cliente;

      const clienteCollection: ICliente[] = [{ id: 9233 }];
      jest.spyOn(clienteService, 'query').mockReturnValue(of(new HttpResponse({ body: clienteCollection })));
      const additionalClientes = [cliente];
      const expectedCollection: ICliente[] = [...additionalClientes, ...clienteCollection];
      jest.spyOn(clienteService, 'addClienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      expect(clienteService.query).toHaveBeenCalled();
      expect(clienteService.addClienteToCollectionIfMissing).toHaveBeenCalledWith(clienteCollection, ...additionalClientes);
      expect(comp.clientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const adhesion: IAdhesion = { id: 456 };
      const individuo: IIndividuo = { id: 14041 };
      adhesion.individuo = individuo;
      const cliente: ICliente = { id: 75535 };
      adhesion.cliente = cliente;

      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(adhesion));
      expect(comp.individuosSharedCollection).toContain(individuo);
      expect(comp.clientesSharedCollection).toContain(cliente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Adhesion>>();
      const adhesion = { id: 123 };
      jest.spyOn(adhesionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adhesion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(adhesionService.update).toHaveBeenCalledWith(adhesion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Adhesion>>();
      const adhesion = new Adhesion();
      jest.spyOn(adhesionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adhesion }));
      saveSubject.complete();

      // THEN
      expect(adhesionService.create).toHaveBeenCalledWith(adhesion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Adhesion>>();
      const adhesion = { id: 123 };
      jest.spyOn(adhesionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adhesion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(adhesionService.update).toHaveBeenCalledWith(adhesion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackIndividuoById', () => {
      it('Should return tracked Individuo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackIndividuoById(0, entity);
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
