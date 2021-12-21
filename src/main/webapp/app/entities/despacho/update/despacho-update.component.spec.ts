jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DespachoService } from '../service/despacho.service';
import { IDespacho, Despacho } from '../despacho.model';

import { DespachoUpdateComponent } from './despacho-update.component';

describe('Despacho Management Update Component', () => {
  let comp: DespachoUpdateComponent;
  let fixture: ComponentFixture<DespachoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let despachoService: DespachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DespachoUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(DespachoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DespachoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    despachoService = TestBed.inject(DespachoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const despacho: IDespacho = { id: 456 };

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(despacho));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = { id: 123 };
      jest.spyOn(despachoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despacho }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(despachoService.update).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = new Despacho();
      jest.spyOn(despachoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despacho }));
      saveSubject.complete();

      // THEN
      expect(despachoService.create).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Despacho>>();
      const despacho = { id: 123 };
      jest.spyOn(despachoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(despachoService.update).toHaveBeenCalledWith(despacho);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
