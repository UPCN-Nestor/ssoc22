jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IInsumo, Insumo } from '../insumo.model';
import { InsumoService } from '../service/insumo.service';

import { InsumoRoutingResolveService } from './insumo-routing-resolve.service';

describe('Insumo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InsumoRoutingResolveService;
  let service: InsumoService;
  let resultInsumo: IInsumo | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(InsumoRoutingResolveService);
    service = TestBed.inject(InsumoService);
    resultInsumo = undefined;
  });

  describe('resolve', () => {
    it('should return IInsumo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInsumo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInsumo).toEqual({ id: 123 });
    });

    it('should return new IInsumo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInsumo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInsumo).toEqual(new Insumo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Insumo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInsumo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInsumo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
