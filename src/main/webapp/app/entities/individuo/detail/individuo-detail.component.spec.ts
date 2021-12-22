import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IndividuoDetailComponent } from './individuo-detail.component';

describe('Individuo Management Detail Component', () => {
  let comp: IndividuoDetailComponent;
  let fixture: ComponentFixture<IndividuoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividuoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ individuo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(IndividuoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(IndividuoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load individuo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.individuo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
