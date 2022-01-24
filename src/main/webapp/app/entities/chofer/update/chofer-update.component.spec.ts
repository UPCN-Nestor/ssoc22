import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChoferService } from '../service/chofer.service';
import { IChofer, Chofer } from '../chofer.model';

import { ChoferUpdateComponent } from './chofer-update.component';

describe('Chofer Management Update Component', () => {
  let comp: ChoferUpdateComponent;
  let fixture: ComponentFixture<ChoferUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let choferService: ChoferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChoferUpdateComponent],
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
      .overrideTemplate(ChoferUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoferUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    choferService = TestBed.inject(ChoferService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const chofer: IChofer = { id: 456 };

      activatedRoute.data = of({ chofer });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(chofer));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Chofer>>();
      const chofer = { id: 123 };
      jest.spyOn(choferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chofer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chofer }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(choferService.update).toHaveBeenCalledWith(chofer);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Chofer>>();
      const chofer = new Chofer();
      jest.spyOn(choferService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chofer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chofer }));
      saveSubject.complete();

      // THEN
      expect(choferService.create).toHaveBeenCalledWith(chofer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Chofer>>();
      const chofer = { id: 123 };
      jest.spyOn(choferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chofer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(choferService.update).toHaveBeenCalledWith(chofer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
