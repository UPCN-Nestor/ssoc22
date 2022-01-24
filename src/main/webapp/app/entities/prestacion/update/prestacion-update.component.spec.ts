import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PrestacionService } from '../service/prestacion.service';
import { IPrestacion, Prestacion } from '../prestacion.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

import { PrestacionUpdateComponent } from './prestacion-update.component';

describe('Prestacion Management Update Component', () => {
  let comp: PrestacionUpdateComponent;
  let fixture: ComponentFixture<PrestacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prestacionService: PrestacionService;
  let insumoService: InsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrestacionUpdateComponent],
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
      .overrideTemplate(PrestacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrestacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prestacionService = TestBed.inject(PrestacionService);
    insumoService = TestBed.inject(InsumoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Insumo query and add missing value', () => {
      const prestacion: IPrestacion = { id: 456 };
      const insumos: IInsumo[] = [{ id: 71112 }];
      prestacion.insumos = insumos;

      const insumoCollection: IInsumo[] = [{ id: 86853 }];
      jest.spyOn(insumoService, 'query').mockReturnValue(of(new HttpResponse({ body: insumoCollection })));
      const additionalInsumos = [...insumos];
      const expectedCollection: IInsumo[] = [...additionalInsumos, ...insumoCollection];
      jest.spyOn(insumoService, 'addInsumoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prestacion });
      comp.ngOnInit();

      expect(insumoService.query).toHaveBeenCalled();
      expect(insumoService.addInsumoToCollectionIfMissing).toHaveBeenCalledWith(insumoCollection, ...additionalInsumos);
      expect(comp.insumosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prestacion: IPrestacion = { id: 456 };
      const insumos: IInsumo = { id: 98771 };
      prestacion.insumos = [insumos];

      activatedRoute.data = of({ prestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(prestacion));
      expect(comp.insumosSharedCollection).toContain(insumos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestacion>>();
      const prestacion = { id: 123 };
      jest.spyOn(prestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prestacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(prestacionService.update).toHaveBeenCalledWith(prestacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestacion>>();
      const prestacion = new Prestacion();
      jest.spyOn(prestacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prestacion }));
      saveSubject.complete();

      // THEN
      expect(prestacionService.create).toHaveBeenCalledWith(prestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Prestacion>>();
      const prestacion = { id: 123 };
      jest.spyOn(prestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prestacionService.update).toHaveBeenCalledWith(prestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackInsumoById', () => {
      it('Should return tracked Insumo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInsumoById(0, entity);
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
