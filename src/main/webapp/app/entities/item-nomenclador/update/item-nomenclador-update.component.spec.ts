import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ItemNomencladorService } from '../service/item-nomenclador.service';
import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { PrestacionService } from 'app/entities/prestacion/service/prestacion.service';
import { IProvision } from 'app/entities/provision/provision.model';
import { ProvisionService } from 'app/entities/provision/service/provision.service';

import { ItemNomencladorUpdateComponent } from './item-nomenclador-update.component';

describe('ItemNomenclador Management Update Component', () => {
  let comp: ItemNomencladorUpdateComponent;
  let fixture: ComponentFixture<ItemNomencladorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemNomencladorService: ItemNomencladorService;
  let prestacionService: PrestacionService;
  let provisionService: ProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ItemNomencladorUpdateComponent],
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
      .overrideTemplate(ItemNomencladorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemNomencladorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemNomencladorService = TestBed.inject(ItemNomencladorService);
    prestacionService = TestBed.inject(PrestacionService);
    provisionService = TestBed.inject(ProvisionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Prestacion query and add missing value', () => {
      const itemNomenclador: IItemNomenclador = { id: 456 };
      const prestacion: IPrestacion = { id: 52504 };
      itemNomenclador.prestacion = prestacion;

      const prestacionCollection: IPrestacion[] = [{ id: 66142 }];
      jest.spyOn(prestacionService, 'query').mockReturnValue(of(new HttpResponse({ body: prestacionCollection })));
      const additionalPrestacions = [prestacion];
      const expectedCollection: IPrestacion[] = [...additionalPrestacions, ...prestacionCollection];
      jest.spyOn(prestacionService, 'addPrestacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      expect(prestacionService.query).toHaveBeenCalled();
      expect(prestacionService.addPrestacionToCollectionIfMissing).toHaveBeenCalledWith(prestacionCollection, ...additionalPrestacions);
      expect(comp.prestacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Provision query and add missing value', () => {
      const itemNomenclador: IItemNomenclador = { id: 456 };
      const provision: IProvision = { id: 51955 };
      itemNomenclador.provision = provision;

      const provisionCollection: IProvision[] = [{ id: 88621 }];
      jest.spyOn(provisionService, 'query').mockReturnValue(of(new HttpResponse({ body: provisionCollection })));
      const additionalProvisions = [provision];
      const expectedCollection: IProvision[] = [...additionalProvisions, ...provisionCollection];
      jest.spyOn(provisionService, 'addProvisionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      expect(provisionService.query).toHaveBeenCalled();
      expect(provisionService.addProvisionToCollectionIfMissing).toHaveBeenCalledWith(provisionCollection, ...additionalProvisions);
      expect(comp.provisionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemNomenclador: IItemNomenclador = { id: 456 };
      const prestacion: IPrestacion = { id: 52104 };
      itemNomenclador.prestacion = prestacion;
      const provision: IProvision = { id: 68656 };
      itemNomenclador.provision = provision;

      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(itemNomenclador));
      expect(comp.prestacionsSharedCollection).toContain(prestacion);
      expect(comp.provisionsSharedCollection).toContain(provision);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemNomenclador>>();
      const itemNomenclador = { id: 123 };
      jest.spyOn(itemNomencladorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemNomenclador }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemNomencladorService.update).toHaveBeenCalledWith(itemNomenclador);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemNomenclador>>();
      const itemNomenclador = new ItemNomenclador();
      jest.spyOn(itemNomencladorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemNomenclador }));
      saveSubject.complete();

      // THEN
      expect(itemNomencladorService.create).toHaveBeenCalledWith(itemNomenclador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ItemNomenclador>>();
      const itemNomenclador = { id: 123 };
      jest.spyOn(itemNomencladorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemNomencladorService.update).toHaveBeenCalledWith(itemNomenclador);
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

    describe('trackProvisionById', () => {
      it('Should return tracked Provision primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProvisionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
