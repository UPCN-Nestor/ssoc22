import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReglaPrestacion, ReglaPrestacion } from '../regla-prestacion.model';
import { ReglaPrestacionService } from '../service/regla-prestacion.service';

@Injectable({ providedIn: 'root' })
export class ReglaPrestacionRoutingResolveService implements Resolve<IReglaPrestacion> {
  constructor(protected service: ReglaPrestacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReglaPrestacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reglaPrestacion: HttpResponse<ReglaPrestacion>) => {
          if (reglaPrestacion.body) {
            return of(reglaPrestacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReglaPrestacion());
  }
}
