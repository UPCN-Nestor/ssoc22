import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReglaPrestacionDetailComponent } from './regla-prestacion-detail.component';

describe('ReglaPrestacion Management Detail Component', () => {
  let comp: ReglaPrestacionDetailComponent;
  let fixture: ComponentFixture<ReglaPrestacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReglaPrestacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ reglaPrestacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ReglaPrestacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ReglaPrestacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load reglaPrestacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.reglaPrestacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
