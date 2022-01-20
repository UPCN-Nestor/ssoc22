import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovimientoStock, MovimientoStock } from '../movimiento-stock.model';
import { MovimientoStockService } from '../service/movimiento-stock.service';

@Injectable({ providedIn: 'root' })
export class MovimientoStockRoutingResolveService implements Resolve<IMovimientoStock> {
  constructor(protected service: MovimientoStockService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientoStock> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movimientoStock: HttpResponse<MovimientoStock>) => {
          if (movimientoStock.body) {
            return of(movimientoStock.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MovimientoStock());
  }
}
