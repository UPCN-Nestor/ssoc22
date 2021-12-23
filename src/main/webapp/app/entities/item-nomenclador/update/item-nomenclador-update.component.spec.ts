jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ItemNomencladorService } from '../service/item-nomenclador.service';
import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';

import { ItemNomencladorUpdateComponent } from './item-nomenclador-update.component';

describe('ItemNomenclador Management Update Component', () => {
  let comp: ItemNomencladorUpdateComponent;
  let fixture: ComponentFixture<ItemNomencladorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemNomencladorService: ItemNomencladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ItemNomencladorUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ItemNomencladorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemNomencladorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemNomencladorService = TestBed.inject(ItemNomencladorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const itemNomenclador: IItemNomenclador = { id: 456 };

      activatedRoute.data = of({ itemNomenclador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(itemNomenclador));
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
});
