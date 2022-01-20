import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemNomenclador, ItemNomenclador } from '../item-nomenclador.model';
import { ItemNomencladorService } from '../service/item-nomenclador.service';

@Injectable({ providedIn: 'root' })
export class ItemNomencladorRoutingResolveService implements Resolve<IItemNomenclador> {
  constructor(protected service: ItemNomencladorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemNomenclador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((itemNomenclador: HttpResponse<ItemNomenclador>) => {
          if (itemNomenclador.body) {
            return of(itemNomenclador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ItemNomenclador());
  }
}
