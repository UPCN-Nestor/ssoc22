jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MovimientoStockService } from '../service/movimiento-stock.service';
import { IMovimientoStock, MovimientoStock } from '../movimiento-stock.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { InsumoService } from 'app/entities/insumo/service/insumo.service';

import { MovimientoStockUpdateComponent } from './movimiento-stock-update.component';

describe('MovimientoStock Management Update Component', () => {
  let comp: MovimientoStockUpdateComponent;
  let fixture: ComponentFixture<MovimientoStockUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let movimientoStockService: MovimientoStockService;
  let insumoService: InsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovimientoStockUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(MovimientoStockUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovimientoStockUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    movimientoStockService = TestBed.inject(MovimientoStockService);
    insumoService = TestBed.inject(InsumoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Insumo query and add missing value', () => {
      const movimientoStock: IMovimientoStock = { id: 456 };
      const insumo: IInsumo = { id: 78000 };
      movimientoStock.insumo = insumo;

      const insumoCollection: IInsumo[] = [{ id: 69270 }];
      jest.spyOn(insumoService, 'query').mockReturnValue(of(new HttpResponse({ body: insumoCollection })));
      const additionalInsumos = [insumo];
      const expectedCollection: IInsumo[] = [...additionalInsumos, ...insumoCollection];
      jest.spyOn(insumoService, 'addInsumoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ movimientoStock });
      comp.ngOnInit();

      expect(insumoService.query).toHaveBeenCalled();
      expect(insumoService.addInsumoToCollectionIfMissing).toHaveBeenCalledWith(insumoCollection, ...additionalInsumos);
      expect(comp.insumosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const movimientoStock: IMovimientoStock = { id: 456 };
      const insumo: IInsumo = { id: 68450 };
      movimientoStock.insumo = insumo;

      activatedRoute.data = of({ movimientoStock });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(movimientoStock));
      expect(comp.insumosSharedCollection).toContain(insumo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MovimientoStock>>();
      const movimientoStock = { id: 123 };
      jest.spyOn(movimientoStockService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientoStock });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movimientoStock }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(movimientoStockService.update).toHaveBeenCalledWith(movimientoStock);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MovimientoStock>>();
      const movimientoStock = new MovimientoStock();
      jest.spyOn(movimientoStockService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientoStock });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movimientoStock }));
      saveSubject.complete();

      // THEN
      expect(movimientoStockService.create).toHaveBeenCalledWith(movimientoStock);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MovimientoStock>>();
      const movimientoStock = { id: 123 };
      jest.spyOn(movimientoStockService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientoStock });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(movimientoStockService.update).toHaveBeenCalledWith(movimientoStock);
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
});
