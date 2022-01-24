import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEnfermero, Enfermero } from '../enfermero.model';
import { EnfermeroService } from '../service/enfermero.service';

import { EnfermeroRoutingResolveService } from './enfermero-routing-resolve.service';

describe('Enfermero routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EnfermeroRoutingResolveService;
  let service: EnfermeroService;
  let resultEnfermero: IEnfermero | undefined;

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
    routingResolveService = TestBed.inject(EnfermeroRoutingResolveService);
    service = TestBed.inject(EnfermeroService);
    resultEnfermero = undefined;
  });

  describe('resolve', () => {
    it('should return IEnfermero returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnfermero = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEnfermero).toEqual({ id: 123 });
    });

    it('should return new IEnfermero if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnfermero = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEnfermero).toEqual(new Enfermero());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Enfermero })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnfermero = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEnfermero).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
