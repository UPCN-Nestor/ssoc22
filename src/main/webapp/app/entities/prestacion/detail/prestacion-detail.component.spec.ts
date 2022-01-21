import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestacionDetailComponent } from './prestacion-detail.component';

describe('Prestacion Management Detail Component', () => {
  let comp: PrestacionDetailComponent;
  let fixture: ComponentFixture<PrestacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ prestacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PrestacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PrestacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load prestacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.prestacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
