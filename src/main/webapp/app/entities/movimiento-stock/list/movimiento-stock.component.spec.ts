import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovimientoStockService } from '../service/movimiento-stock.service';

import { MovimientoStockComponent } from './movimiento-stock.component';

describe('MovimientoStock Management Component', () => {
  let comp: MovimientoStockComponent;
  let fixture: ComponentFixture<MovimientoStockComponent>;
  let service: MovimientoStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovimientoStockComponent],
    })
      .overrideTemplate(MovimientoStockComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovimientoStockComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MovimientoStockService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.movimientoStocks?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
