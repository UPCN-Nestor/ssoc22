import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

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
    const copy = this.convertDateFromClient(solicitudPrestacion);
    return this.http
      .post<ISolicitudPrestacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(solicitudPrestacion: ISolicitudPrestacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solicitudPrestacion);
    return this.http
      .put<ISolicitudPrestacion>(`${this.resourceUrl}/${getSolicitudPrestacionIdentifier(solicitudPrestacion) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(solicitudPrestacion: ISolicitudPrestacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solicitudPrestacion);
    return this.http
      .patch<ISolicitudPrestacion>(`${this.resourceUrl}/${getSolicitudPrestacionIdentifier(solicitudPrestacion) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolicitudPrestacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISolicitudPrestacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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

  protected convertDateFromClient(solicitudPrestacion: ISolicitudPrestacion): ISolicitudPrestacion {
    return Object.assign({}, solicitudPrestacion, {
      fecha: solicitudPrestacion.fecha?.isValid() ? solicitudPrestacion.fecha.toJSON() : undefined,
      horaSolicitud: solicitudPrestacion.horaSolicitud?.isValid() ? solicitudPrestacion.horaSolicitud.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
      res.body.horaSolicitud = res.body.horaSolicitud ? dayjs(res.body.horaSolicitud) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((solicitudPrestacion: ISolicitudPrestacion) => {
        solicitudPrestacion.fecha = solicitudPrestacion.fecha ? dayjs(solicitudPrestacion.fecha) : undefined;
        solicitudPrestacion.horaSolicitud = solicitudPrestacion.horaSolicitud ? dayjs(solicitudPrestacion.horaSolicitud) : undefined;
      });
    }
    return res;
  }
}
