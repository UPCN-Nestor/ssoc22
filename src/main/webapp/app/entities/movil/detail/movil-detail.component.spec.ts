import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovilDetailComponent } from './movil-detail.component';

describe('Movil Management Detail Component', () => {
  let comp: MovilDetailComponent;
  let fixture: ComponentFixture<MovilDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovilDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ movil: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MovilDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MovilDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load movil on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.movil).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
