jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IIndividuo, Individuo } from '../individuo.model';
import { IndividuoService } from '../service/individuo.service';

import { IndividuoRoutingResolveService } from './individuo-routing-resolve.service';

describe('Individuo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: IndividuoRoutingResolveService;
  let service: IndividuoService;
  let resultIndividuo: IIndividuo | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(IndividuoRoutingResolveService);
    service = TestBed.inject(IndividuoService);
    resultIndividuo = undefined;
  });

  describe('resolve', () => {
    it('should return IIndividuo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIndividuo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultIndividuo).toEqual({ id: 123 });
    });

    it('should return new IIndividuo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIndividuo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultIndividuo).toEqual(new Individuo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Individuo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIndividuo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultIndividuo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
