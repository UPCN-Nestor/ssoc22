import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DespachoService } from '../service/despacho.service';
import { IDespacho, Despacho } from '../despacho.model';
import { IEquipo } from 'app/entities/equipo/equipo.model';
import { EquipoService } from 'app/entities/equipo/service/equipo.service';

import { DespachoUpdateComponent } from './despacho-update.component';

describe('Despacho Management Update Component', () => {
  let comp: DespachoUpdateComponent;
  let fixture: ComponentFixture<DespachoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let despachoService: DespachoService;
  let equipoService: EquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DespachoUpdateComponent],
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
      .overrideTemplate(DespachoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DespachoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    despachoService = TestBed.inject(DespachoService);
    equipoService = TestBed.inject(EquipoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Equipo query and add missing value', () => {
      const despacho: IDespacho = { id: 456 };
      const equipo: IEquipo = { id: 24976 };
      despacho.equipo = equipo;

      const equipoCollection: IEquipo[] = [{ id: 79804 }];
      jest.spyOn(equipoService, 'query').mockReturnValue(of(new HttpResponse({ body: equipoCollection })));
      const additionalEquipos = [equipo];
      const expectedCollection: IEquipo[] = [...additionalEquipos, ...equipoCollection];
      jest.spyOn(equipoService, 'addEquipoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(equipoService.query).toHaveBeenCalled();
      expect(equipoService.addEquipoToCollectionIfMissing).toHaveBeenCalledWith(equipoCollection, ...additionalEquipos);
      expect(comp.equiposSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const despacho: IDespacho = { id: 456 };
      const equipo: IEquipo = { id: 91888 };
      despacho.equipo = equipo;

      activatedRoute.data = of({ despacho });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(despacho));
      expect(comp.equiposSharedCollection).toContain(equipo);
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

  describe('Tracking relationships identifiers', () => {
    describe('trackEquipoById', () => {
      it('Should return tracked Equipo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEquipoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
