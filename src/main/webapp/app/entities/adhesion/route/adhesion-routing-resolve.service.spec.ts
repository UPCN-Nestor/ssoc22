jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAdhesion, Adhesion } from '../adhesion.model';
import { AdhesionService } from '../service/adhesion.service';

import { AdhesionRoutingResolveService } from './adhesion-routing-resolve.service';

describe('Adhesion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AdhesionRoutingResolveService;
  let service: AdhesionService;
  let resultAdhesion: IAdhesion | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(AdhesionRoutingResolveService);
    service = TestBed.inject(AdhesionService);
    resultAdhesion = undefined;
  });

  describe('resolve', () => {
    it('should return IAdhesion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAdhesion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAdhesion).toEqual({ id: 123 });
    });

    it('should return new IAdhesion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAdhesion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAdhesion).toEqual(new Adhesion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Adhesion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAdhesion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAdhesion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
