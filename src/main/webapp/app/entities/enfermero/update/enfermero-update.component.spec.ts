import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EnfermeroService } from '../service/enfermero.service';
import { IEnfermero, Enfermero } from '../enfermero.model';

import { EnfermeroUpdateComponent } from './enfermero-update.component';

describe('Enfermero Management Update Component', () => {
  let comp: EnfermeroUpdateComponent;
  let fixture: ComponentFixture<EnfermeroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let enfermeroService: EnfermeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EnfermeroUpdateComponent],
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
      .overrideTemplate(EnfermeroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EnfermeroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    enfermeroService = TestBed.inject(EnfermeroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const enfermero: IEnfermero = { id: 456 };

      activatedRoute.data = of({ enfermero });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(enfermero));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enfermero>>();
      const enfermero = { id: 123 };
      jest.spyOn(enfermeroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enfermero });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: enfermero }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(enfermeroService.update).toHaveBeenCalledWith(enfermero);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enfermero>>();
      const enfermero = new Enfermero();
      jest.spyOn(enfermeroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enfermero });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: enfermero }));
      saveSubject.complete();

      // THEN
      expect(enfermeroService.create).toHaveBeenCalledWith(enfermero);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enfermero>>();
      const enfermero = { id: 123 };
      jest.spyOn(enfermeroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enfermero });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(enfermeroService.update).toHaveBeenCalledWith(enfermero);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
