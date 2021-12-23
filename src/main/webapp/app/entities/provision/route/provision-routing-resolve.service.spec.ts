jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IProvision, Provision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';

import { ProvisionRoutingResolveService } from './provision-routing-resolve.service';

describe('Provision routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProvisionRoutingResolveService;
  let service: ProvisionService;
  let resultProvision: IProvision | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ProvisionRoutingResolveService);
    service = TestBed.inject(ProvisionService);
    resultProvision = undefined;
  });

  describe('resolve', () => {
    it('should return IProvision returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvision = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProvision).toEqual({ id: 123 });
    });

    it('should return new IProvision if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvision = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProvision).toEqual(new Provision());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Provision })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvision = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProvision).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
