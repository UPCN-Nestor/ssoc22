import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovimientoStockDetailComponent } from './movimiento-stock-detail.component';

describe('MovimientoStock Management Detail Component', () => {
  let comp: MovimientoStockDetailComponent;
  let fixture: ComponentFixture<MovimientoStockDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoStockDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ movimientoStock: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MovimientoStockDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MovimientoStockDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load movimientoStock on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.movimientoStock).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
