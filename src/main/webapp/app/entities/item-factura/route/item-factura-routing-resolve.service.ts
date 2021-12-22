import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemFactura, ItemFactura } from '../item-factura.model';
import { ItemFacturaService } from '../service/item-factura.service';

@Injectable({ providedIn: 'root' })
export class ItemFacturaRoutingResolveService implements Resolve<IItemFactura> {
  constructor(protected service: ItemFacturaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemFactura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((itemFactura: HttpResponse<ItemFactura>) => {
          if (itemFactura.body) {
            return of(itemFactura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ItemFactura());
  }
}
