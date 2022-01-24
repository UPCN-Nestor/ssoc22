import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnfermeroDetailComponent } from './enfermero-detail.component';

describe('Enfermero Management Detail Component', () => {
  let comp: EnfermeroDetailComponent;
  let fixture: ComponentFixture<EnfermeroDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnfermeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ enfermero: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EnfermeroDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EnfermeroDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load enfermero on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.enfermero).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
