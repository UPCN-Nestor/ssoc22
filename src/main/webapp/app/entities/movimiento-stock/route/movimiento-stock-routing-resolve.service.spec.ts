import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMovimientoStock, MovimientoStock } from '../movimiento-stock.model';
import { MovimientoStockService } from '../service/movimiento-stock.service';

import { MovimientoStockRoutingResolveService } from './movimiento-stock-routing-resolve.service';

describe('MovimientoStock routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MovimientoStockRoutingResolveService;
  let service: MovimientoStockService;
  let resultMovimientoStock: IMovimientoStock | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(MovimientoStockRoutingResolveService);
    service = TestBed.inject(MovimientoStockService);
    resultMovimientoStock = undefined;
  });

  describe('resolve', () => {
    it('should return IMovimientoStock returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMovimientoStock = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMovimientoStock).toEqual({ id: 123 });
    });

    it('should return new IMovimientoStock if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMovimientoStock = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMovimientoStock).toEqual(new MovimientoStock());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MovimientoStock })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMovimientoStock = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMovimientoStock).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
