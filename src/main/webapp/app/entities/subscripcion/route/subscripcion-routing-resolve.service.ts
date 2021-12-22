import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubscripcion, Subscripcion } from '../subscripcion.model';
import { SubscripcionService } from '../service/subscripcion.service';

@Injectable({ providedIn: 'root' })
export class SubscripcionRoutingResolveService implements Resolve<ISubscripcion> {
  constructor(protected service: SubscripcionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscripcion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subscripcion: HttpResponse<Subscripcion>) => {
          if (subscripcion.body) {
            return of(subscripcion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Subscripcion());
  }
}
