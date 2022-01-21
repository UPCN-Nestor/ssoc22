import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovil, Movil } from '../movil.model';
import { MovilService } from '../service/movil.service';

@Injectable({ providedIn: 'root' })
export class MovilRoutingResolveService implements Resolve<IMovil> {
  constructor(protected service: MovilService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovil> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movil: HttpResponse<Movil>) => {
          if (movil.body) {
            return of(movil.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Movil());
  }
}
