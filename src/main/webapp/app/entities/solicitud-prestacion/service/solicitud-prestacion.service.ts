import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISolicitudPrestacion, getSolicitudPrestacionIdentifier } from '../solicitud-prestacion.model';

export type EntityResponseType = HttpResponse<ISolicitudPrestacion>;
export type EntityArrayResponseType = HttpResponse<ISolicitudPrestacion[]>;

@Injectable({ providedIn: 'root' })
export class SolicitudPrestacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/solicitud-prestacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(solicitudPrestacion: ISolicitudPrestacion): Observable<EntityResponseType> {
    return this.http.post<ISolicitudPrestacion>(this.resourceUrl, solicitudPrestacion, { observe: 'response' });
  }

  update(solicitudPrestacion: ISolicitudPrestacion): Observable<EntityResponseType> {
    return this.http.put<ISolicitudPrestacion>(
      `${this.resourceUrl}/${getSolicitudPrestacionIdentifier(solicitudPrestacion) as number}`,
      solicitudPrestacion,
      { observe: 'response' }
    );
  }

  partialUpdate(solicitudPrestacion: ISolicitudPrestacion): Observable<EntityResponseType> {
    return this.http.patch<ISolicitudPrestacion>(
      `${this.resourceUrl}/${getSolicitudPrestacionIdentifier(solicitudPrestacion) as number}`,
      solicitudPrestacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISolicitudPrestacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISolicitudPrestacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSolicitudPrestacionToCollectionIfMissing(
    solicitudPrestacionCollection: ISolicitudPrestacion[],
    ...solicitudPrestacionsToCheck: (ISolicitudPrestacion | null | undefined)[]
  ): ISolicitudPrestacion[] {
    const solicitudPrestacions: ISolicitudPrestacion[] = solicitudPrestacionsToCheck.filter(isPresent);
    if (solicitudPrestacions.length > 0) {
      const solicitudPrestacionCollectionIdentifiers = solicitudPrestacionCollection.map(
        solicitudPrestacionItem => getSolicitudPrestacionIdentifier(solicitudPrestacionItem)!
      );
      const solicitudPrestacionsToAdd = solicitudPrestacions.filter(solicitudPrestacionItem => {
        const solicitudPrestacionIdentifier = getSolicitudPrestacionIdentifier(solicitudPrestacionItem);
        if (solicitudPrestacionIdentifier == null || solicitudPrestacionCollectionIdentifiers.includes(solicitudPrestacionIdentifier)) {
          return false;
        }
        solicitudPrestacionCollectionIdentifiers.push(solicitudPrestacionIdentifier);
        return true;
      });
      return [...solicitudPrestacionsToAdd, ...solicitudPrestacionCollection];
    }
    return solicitudPrestacionCollection;
  }
}
