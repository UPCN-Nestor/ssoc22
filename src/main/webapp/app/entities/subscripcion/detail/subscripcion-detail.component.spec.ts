import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubscripcionDetailComponent } from './subscripcion-detail.component';

describe('Subscripcion Management Detail Component', () => {
  let comp: SubscripcionDetailComponent;
  let fixture: ComponentFixture<SubscripcionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscripcionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subscripcion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SubscripcionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubscripcionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subscripcion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subscripcion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
