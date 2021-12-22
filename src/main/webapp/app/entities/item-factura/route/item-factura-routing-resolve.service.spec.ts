jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IItemFactura, ItemFactura } from '../item-factura.model';
import { ItemFacturaService } from '../service/item-factura.service';

import { ItemFacturaRoutingResolveService } from './item-factura-routing-resolve.service';

describe('ItemFactura routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ItemFacturaRoutingResolveService;
  let service: ItemFacturaService;
  let resultItemFactura: IItemFactura | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ItemFacturaRoutingResolveService);
    service = TestBed.inject(ItemFacturaService);
    resultItemFactura = undefined;
  });

  describe('resolve', () => {
    it('should return IItemFactura returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemFactura = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultItemFactura).toEqual({ id: 123 });
    });

    it('should return new IItemFactura if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemFactura = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultItemFactura).toEqual(new ItemFactura());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ItemFactura })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemFactura = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultItemFactura).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
