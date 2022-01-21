import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';

import { ReglaPrestacionRoutingResolveService } from './regla-prestacion-routing-resolve.service';

describe('ReglaPrestacion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ReglaPrestacionRoutingResolveService;
  let service: ReglaPrestacionService;
  let resultReglaPrestacion: IReglaPrestacion | undefined;

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
    routingResolveService = TestBed.inject(ReglaPrestacionRoutingResolveService);
    service = TestBed.inject(ReglaPrestacionService);
    resultReglaPrestacion = undefined;
  });

  describe('resolve', () => {
    it('should return IReglaPrestacion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReglaPrestacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReglaPrestacion).toEqual({ id: 123 });
    });

    it('should return new IReglaPrestacion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReglaPrestacion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultReglaPrestacion).toEqual(new ReglaPrestacion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ReglaPrestacion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultReglaPrestacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReglaPrestacion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
