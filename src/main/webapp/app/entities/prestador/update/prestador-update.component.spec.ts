import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PrestadorService } from '../service/prestador.service';
import { IPrestador, Prestador } from '../prestador.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ItemNomencladorService } from 'app/entities/item-nomenclador/service/item-nomenclador.service';

import { PrestadorUpdateComponent } from './prestador-update.component';

describe('Prestador Management Update Component', () => {
  let comp: PrestadorUpdateComponent;
  let fixture: ComponentFixture<PrestadorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prestadorService: PrestadorService;
  let itemNomencladorService: ItemNomencladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrestadorUpdateComponent],
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
      .overrideTemplate(PrestadorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrestadorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prestadorService = TestBed.inject(PrestadorService);
    itemNomencladorService = TestBed.inject(ItemNomencladorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ItemNomenclador query and add missing value', () => {
      const prestador: IPrestador = { id: 456 };
      const itemNomencladors: IItemNomenclador[] = [{ id: 1567 }];
      prestador.itemNomencladors = itemNomencladors;

      const itemNomencladorCollection: IItemNomenclador[] = [{ id: 28306 }];
      jest.spyOn(itemNomencladorService, 'query').mockReturnValue(of(new HttpResponse({ body: itemNomencladorCollection })));
      const additionalItemNomencladors = [...itemNomencladors];
      const expectedCollection: IItemNomenclador[] = [...additionalItemNomencladors, ...itemNomencladorCollection];
      jest.spyOn(itemNomencladorService, 'addItemNomencladorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prestador });
      comp.ngOnInit();

      expect(itemNomencladorService.query).toHaveBeenCalled();
      expect(itemNomencladorService.addItemNomencladorToCollectionIfMissing).toHaveBeenCalledWith(
        itemNomencladorCollection,
        ...additionalItemNomencladors
      );
      expect(comp.itemNomencladorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prestador: IPrestador = { id: 456 };
      const itemNomencladors: IItemNomenclador = { id: 90101 };
      prestador.itemNomencladors = [itemNomencladors];

      activatedRoute.data = of({ prestador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(prestador));
      expect(comp.itemNomencladorsSharedCollection).toContain(itemNomencladors);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestador>>();
      const prestador = { id: 123 };
      jest.spyOn(prestadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prestador }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(prestadorService.update).toHaveBeenCalledWith(prestador);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestador>>();
      const prestador = new Prestador();
      jest.spyOn(prestadorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prestador }));
      saveSubject.complete();

      // THEN
      expect(prestadorService.create).toHaveBeenCalledWith(prestador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestador>>();
      const prestador = { id: 123 };
      jest.spyOn(prestadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prestadorService.update).toHaveBeenCalledWith(prestador);
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
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedItemNomenclador', () => {
      it('Should return option if no ItemNomenclador is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedItemNomenclador(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected ItemNomenclador for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedItemNomenclador(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this ItemNomenclador is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedItemNomenclador(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
