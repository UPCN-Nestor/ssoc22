import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SolicitudPrestacionDetailComponent } from './solicitud-prestacion-detail.component';

describe('SolicitudPrestacion Management Detail Component', () => {
  let comp: SolicitudPrestacionDetailComponent;
  let fixture: ComponentFixture<SolicitudPrestacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudPrestacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ solicitudPrestacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SolicitudPrestacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SolicitudPrestacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load solicitudPrestacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.solicitudPrestacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
