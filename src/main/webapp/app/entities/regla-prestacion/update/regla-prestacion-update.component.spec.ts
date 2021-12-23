jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ReglaPrestacionService } from '../service/regla-prestacion.service';
import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { IProvision } from 'app/entities/provision/provision.model';
import { ProvisionService } from 'app/entities/provision/service/provision.service';

import { ReglaPrestacionUpdateComponent } from './regla-prestacion-update.component';

describe('ReglaPrestacion Management Update Component', () => {
  let comp: ReglaPrestacionUpdateComponent;
  let fixture: ComponentFixture<ReglaPrestacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reglaPrestacionService: ReglaPrestacionService;
  let provisionService: ProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReglaPrestacionUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ReglaPrestacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReglaPrestacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reglaPrestacionService = TestBed.inject(ReglaPrestacionService);
    provisionService = TestBed.inject(ProvisionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Provision query and add missing value', () => {
      const reglaPrestacion: IReglaPrestacion = { id: 456 };
      const provision: IProvision = { id: 28428 };
      reglaPrestacion.provision = provision;

      const provisionCollection: IProvision[] = [{ id: 32178 }];
      jest.spyOn(provisionService, 'query').mockReturnValue(of(new HttpResponse({ body: provisionCollection })));
      const additionalProvisions = [provision];
      const expectedCollection: IProvision[] = [...additionalProvisions, ...provisionCollection];
      jest.spyOn(provisionService, 'addProvisionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      expect(provisionService.query).toHaveBeenCalled();
      expect(provisionService.addProvisionToCollectionIfMissing).toHaveBeenCalledWith(provisionCollection, ...additionalProvisions);
      expect(comp.provisionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reglaPrestacion: IReglaPrestacion = { id: 456 };
      const provision: IProvision = { id: 16538 };
      reglaPrestacion.provision = provision;

      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reglaPrestacion));
      expect(comp.provisionsSharedCollection).toContain(provision);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = { id: 123 };
      jest.spyOn(reglaPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reglaPrestacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reglaPrestacionService.update).toHaveBeenCalledWith(reglaPrestacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = new ReglaPrestacion();
      jest.spyOn(reglaPrestacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reglaPrestacion }));
      saveSubject.complete();

      // THEN
      expect(reglaPrestacionService.create).toHaveBeenCalledWith(reglaPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReglaPrestacion>>();
      const reglaPrestacion = { id: 123 };
      jest.spyOn(reglaPrestacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reglaPrestacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reglaPrestacionService.update).toHaveBeenCalledWith(reglaPrestacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProvisionById', () => {
      it('Should return tracked Provision primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProvisionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
