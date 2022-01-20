import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIndividuo, Individuo } from '../individuo.model';
import { IndividuoService } from '../service/individuo.service';

@Injectable({ providedIn: 'root' })
export class IndividuoRoutingResolveService implements Resolve<IIndividuo> {
  constructor(protected service: IndividuoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIndividuo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((individuo: HttpResponse<Individuo>) => {
          if (individuo.body) {
            return of(individuo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Individuo());
  }
}
