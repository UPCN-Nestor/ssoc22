jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';

import { ItemNomencladorRoutingResolveService } from './item-nomenclador-routing-resolve.service';

describe('ItemNomenclador routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ItemNomencladorRoutingResolveService;
  let service: ItemNomencladorService;
  let resultItemNomenclador: IItemNomenclador | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ItemNomencladorRoutingResolveService);
    service = TestBed.inject(ItemNomencladorService);
    resultItemNomenclador = undefined;
  });

  describe('resolve', () => {
    it('should return IItemNomenclador returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemNomenclador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultItemNomenclador).toEqual({ id: 123 });
    });

    it('should return new IItemNomenclador if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemNomenclador = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultItemNomenclador).toEqual(new ItemNomenclador());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ItemNomenclador })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultItemNomenclador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultItemNomenclador).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
