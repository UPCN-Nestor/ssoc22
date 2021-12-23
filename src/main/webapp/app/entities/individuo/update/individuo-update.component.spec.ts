jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IndividuoService } from '../service/individuo.service';
import { IIndividuo, Individuo } from '../individuo.model';

import { IndividuoUpdateComponent } from './individuo-update.component';

describe('Individuo Management Update Component', () => {
  let comp: IndividuoUpdateComponent;
  let fixture: ComponentFixture<IndividuoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let individuoService: IndividuoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IndividuoUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(IndividuoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IndividuoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    individuoService = TestBed.inject(IndividuoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const individuo: IIndividuo = { id: 456 };

      activatedRoute.data = of({ individuo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(individuo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Individuo>>();
      const individuo = { id: 123 };
      jest.spyOn(individuoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ individuo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: individuo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(individuoService.update).toHaveBeenCalledWith(individuo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Individuo>>();
      const individuo = new Individuo();
      jest.spyOn(individuoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ individuo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: individuo }));
      saveSubject.complete();

      // THEN
      expect(individuoService.create).toHaveBeenCalledWith(individuo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Individuo>>();
      const individuo = { id: 123 };
      jest.spyOn(individuoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ individuo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(individuoService.update).toHaveBeenCalledWith(individuo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
