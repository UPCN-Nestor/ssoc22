import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInsumo, Insumo } from '../insumo.model';
import { InsumoService } from '../service/insumo.service';

@Injectable({ providedIn: 'root' })
export class InsumoRoutingResolveService implements Resolve<IInsumo> {
  constructor(protected service: InsumoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInsumo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((insumo: HttpResponse<Insumo>) => {
          if (insumo.body) {
            return of(insumo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Insumo());
  }
}
