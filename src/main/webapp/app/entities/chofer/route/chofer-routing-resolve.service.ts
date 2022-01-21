import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChofer, Chofer } from '../chofer.model';
import { ChoferService } from '../service/chofer.service';

@Injectable({ providedIn: 'root' })
export class ChoferRoutingResolveService implements Resolve<IChofer> {
  constructor(protected service: ChoferService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChofer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chofer: HttpResponse<Chofer>) => {
          if (chofer.body) {
            return of(chofer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chofer());
  }
}
