import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEnfermero, Enfermero } from '../enfermero.model';
import { EnfermeroService } from '../service/enfermero.service';

@Injectable({ providedIn: 'root' })
export class EnfermeroRoutingResolveService implements Resolve<IEnfermero> {
  constructor(protected service: EnfermeroService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnfermero> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((enfermero: HttpResponse<Enfermero>) => {
          if (enfermero.body) {
            return of(enfermero.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Enfermero());
  }
}
