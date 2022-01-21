import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DespachoDetailComponent } from './despacho-detail.component';

describe('Despacho Management Detail Component', () => {
  let comp: DespachoDetailComponent;
  let fixture: ComponentFixture<DespachoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespachoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ despacho: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DespachoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DespachoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load despacho on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.despacho).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
