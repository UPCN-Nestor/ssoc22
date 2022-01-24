import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MovilService } from '../service/movil.service';
import { IMovil, Movil } from '../movil.model';

import { MovilUpdateComponent } from './movil-update.component';

describe('Movil Management Update Component', () => {
  let comp: MovilUpdateComponent;
  let fixture: ComponentFixture<MovilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let movilService: MovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MovilUpdateComponent],
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
      .overrideTemplate(MovilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    movilService = TestBed.inject(MovilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const movil: IMovil = { id: 456 };

      activatedRoute.data = of({ movil });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(movil));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movil>>();
      const movil = { id: 123 };
      jest.spyOn(movilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movil }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(movilService.update).toHaveBeenCalledWith(movil);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movil>>();
      const movil = new Movil();
      jest.spyOn(movilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movil }));
      saveSubject.complete();

      // THEN
      expect(movilService.create).toHaveBeenCalledWith(movil);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movil>>();
      const movil = { id: 123 };
      jest.spyOn(movilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(movilService.update).toHaveBeenCalledWith(movil);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
