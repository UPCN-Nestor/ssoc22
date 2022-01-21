import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsumoDetailComponent } from './insumo-detail.component';

describe('Insumo Management Detail Component', () => {
  let comp: InsumoDetailComponent;
  let fixture: ComponentFixture<InsumoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsumoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ insumo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InsumoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InsumoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load insumo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.insumo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
