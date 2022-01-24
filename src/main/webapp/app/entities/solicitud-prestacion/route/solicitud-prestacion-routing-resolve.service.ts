import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISolicitudPrestacion, SolicitudPrestacion } from '../solicitud-prestacion.model';
import { SolicitudPrestacionService } from '../service/solicitud-prestacion.service';

@Injectable({ providedIn: 'root' })
export class SolicitudPrestacionRoutingResolveService implements Resolve<ISolicitudPrestacion> {
  constructor(protected service: SolicitudPrestacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISolicitudPrestacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((solicitudPrestacion: HttpResponse<SolicitudPrestacion>) => {
          if (solicitudPrestacion.body) {
            return of(solicitudPrestacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SolicitudPrestacion());
  }
}
