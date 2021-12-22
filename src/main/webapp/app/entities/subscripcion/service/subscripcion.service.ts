import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubscripcion, getSubscripcionIdentifier } from '../subscripcion.model';

export type EntityResponseType = HttpResponse<ISubscripcion>;
export type EntityArrayResponseType = HttpResponse<ISubscripcion[]>;

@Injectable({ providedIn: 'root' })
export class SubscripcionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/subscripcions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subscripcion: ISubscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subscripcion);
    return this.http
      .post<ISubscripcion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(subscripcion: ISubscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subscripcion);
    return this.http
      .put<ISubscripcion>(`${this.resourceUrl}/${getSubscripcionIdentifier(subscripcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(subscripcion: ISubscripcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subscripcion);
    return this.http
      .patch<ISubscripcion>(`${this.resourceUrl}/${getSubscripcionIdentifier(subscripcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISubscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISubscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSubscripcionToCollectionIfMissing(
    subscripcionCollection: ISubscripcion[],
    ...subscripcionsToCheck: (ISubscripcion | null | undefined)[]
  ): ISubscripcion[] {
    const subscripcions: ISubscripcion[] = subscripcionsToCheck.filter(isPresent);
    if (subscripcions.length > 0) {
      const subscripcionCollectionIdentifiers = subscripcionCollection.map(
        subscripcionItem => getSubscripcionIdentifier(subscripcionItem)!
      );
      const subscripcionsToAdd = subscripcions.filter(subscripcionItem => {
        const subscripcionIdentifier = getSubscripcionIdentifier(subscripcionItem);
        if (subscripcionIdentifier == null || subscripcionCollectionIdentifiers.includes(subscripcionIdentifier)) {
          return false;
        }
        subscripcionCollectionIdentifiers.push(subscripcionIdentifier);
        return true;
      });
      return [...subscripcionsToAdd, ...subscripcionCollection];
    }
    return subscripcionCollection;
  }

  protected convertDateFromClient(subscripcion: ISubscripcion): ISubscripcion {
    return Object.assign({}, subscripcion, {
      fechaAlta: subscripcion.fechaAlta?.isValid() ? subscripcion.fechaAlta.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaAlta = res.body.fechaAlta ? dayjs(res.body.fechaAlta) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((subscripcion: ISubscripcion) => {
        subscripcion.fechaAlta = subscripcion.fechaAlta ? dayjs(subscripcion.fechaAlta) : undefined;
      });
    }
    return res;
  }
}
