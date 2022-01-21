import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChoferDetailComponent } from './chofer-detail.component';

describe('Chofer Management Detail Component', () => {
  let comp: ChoferDetailComponent;
  let fixture: ComponentFixture<ChoferDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoferDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ chofer: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChoferDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChoferDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chofer on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.chofer).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
