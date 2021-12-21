jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';
import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';

import { SolicitudPrestacionUpdateComponent } from './solicitud-prestacion-update.component';

describe('SolicitudPrestacion Management Update Component', () => {
  let comp: SolicitudPrestacionUpdateComponent;
  let fixture: ComponentFixture<SolicitudPrestacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let solicitudPrestacionService: SolicitudPrestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SolicitudPrestacionUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SolicitudPrestacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SolicitudPrestacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    solicitudPrestacionService = TestBed.inject(SolicitudPrestacionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const solicitudPrestacion: ISolicitudPrestacion = { id: 456 };

      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(solicitudPrestacion));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = { id: 123 };
      jest.spyOn(solicitudPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: solicitudPrestacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(solicitudPrestacionService.update).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = new SolicitudPrestacion();
      jest.spyOn(solicitudPrestacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: solicitudPrestacion }));
      saveSubject.complete();

      // THEN
      expect(solicitudPrestacionService.create).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SolicitudPrestacion>>();
      const solicitudPrestacion = { id: 123 };
      jest.spyOn(solicitudPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ solicitudPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(solicitudPrestacionService.update).toHaveBeenCalledWith(solicitudPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
