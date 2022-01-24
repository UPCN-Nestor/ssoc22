import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProvision, Provision } from '../provision.model';
import { ProvisionService } from '../service/provision.service';

@Injectable({ providedIn: 'root' })
export class ProvisionRoutingResolveService implements Resolve<IProvision> {
  constructor(protected service: ProvisionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProvision> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((provision: HttpResponse<Provision>) => {
          if (provision.body) {
            return of(provision.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Provision());
  }
}
