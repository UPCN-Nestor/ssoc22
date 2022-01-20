import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPrestacion, Prestacion } from '../prestacion.model';
import { PrestacionService } from '../service/prestacion.service';

@Injectable({ providedIn: 'root' })
export class PrestacionRoutingResolveService implements Resolve<IPrestacion> {
  constructor(protected service: PrestacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrestacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((prestacion: HttpResponse<Prestacion>) => {
          if (prestacion.body) {
            return of(prestacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Prestacion());
  }
}
