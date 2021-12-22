jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { InsumoService } from '../service/insumo.service';
import { IInsumo, Insumo } from '../insumo.model';

import { InsumoUpdateComponent } from './insumo-update.component';

describe('Insumo Management Update Component', () => {
  let comp: InsumoUpdateComponent;
  let fixture: ComponentFixture<InsumoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let insumoService: InsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InsumoUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(InsumoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InsumoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    insumoService = TestBed.inject(InsumoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const insumo: IInsumo = { id: 456 };

      activatedRoute.data = of({ insumo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(insumo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Insumo>>();
      const insumo = { id: 123 };
      jest.spyOn(insumoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insumo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: insumo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(insumoService.update).toHaveBeenCalledWith(insumo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Insumo>>();
      const insumo = new Insumo();
      jest.spyOn(insumoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insumo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: insumo }));
      saveSubject.complete();

      // THEN
      expect(insumoService.create).toHaveBeenCalledWith(insumo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Insumo>>();
      const insumo = { id: 123 };
      jest.spyOn(insumoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ insumo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(insumoService.update).toHaveBeenCalledWith(insumo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
