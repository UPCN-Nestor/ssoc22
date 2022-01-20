import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EquipoService } from '../service/equipo.service';
import { IEquipo, Equipo } from '../equipo.model';

import { EquipoUpdateComponent } from './equipo-update.component';

describe('Equipo Management Update Component', () => {
  let comp: EquipoUpdateComponent;
  let fixture: ComponentFixture<EquipoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let equipoService: EquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EquipoUpdateComponent],
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
      .overrideTemplate(EquipoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EquipoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    equipoService = TestBed.inject(EquipoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const equipo: IEquipo = { id: 456 };

      activatedRoute.data = of({ equipo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(equipo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Equipo>>();
      const equipo = { id: 123 };
      jest.spyOn(equipoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ equipo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: equipo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(equipoService.update).toHaveBeenCalledWith(equipo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Equipo>>();
      const equipo = new Equipo();
      jest.spyOn(equipoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ equipo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: equipo }));
      saveSubject.complete();

      // THEN
      expect(equipoService.create).toHaveBeenCalledWith(equipo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Equipo>>();
      const equipo = { id: 123 };
      jest.spyOn(equipoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ equipo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(equipoService.update).toHaveBeenCalledWith(equipo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
