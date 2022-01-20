import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';

import { SolicitudPrestacionRoutingResolveService } from './solicitud-prestacion-routing-resolve.service';

describe('SolicitudPrestacion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SolicitudPrestacionRoutingResolveService;
  let service: SolicitudPrestacionService;
  let resultSolicitudPrestacion: ISolicitudPrestacion | undefined;

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
    routingResolveService = TestBed.inject(SolicitudPrestacionRoutingResolveService);
    service = TestBed.inject(SolicitudPrestacionService);
    resultSolicitudPrestacion = undefined;
  });

  describe('resolve', () => {
    it('should return ISolicitudPrestacion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSolicitudPrestacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSolicitudPrestacion).toEqual({ id: 123 });
    });

    it('should return new ISolicitudPrestacion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSolicitudPrestacion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSolicitudPrestacion).toEqual(new SolicitudPrestacion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SolicitudPrestacion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSolicitudPrestacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSolicitudPrestacion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
