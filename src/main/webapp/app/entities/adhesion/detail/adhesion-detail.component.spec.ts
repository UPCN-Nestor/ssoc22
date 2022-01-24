import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdhesionDetailComponent } from './adhesion-detail.component';

describe('Adhesion Management Detail Component', () => {
  let comp: AdhesionDetailComponent;
  let fixture: ComponentFixture<AdhesionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhesionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ adhesion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AdhesionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AdhesionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load adhesion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.adhesion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
