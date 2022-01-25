import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDespacho, getDespachoIdentifier } from '../despacho.model';

export type EntityResponseType = HttpResponse<IDespacho>;
export type EntityArrayResponseType = HttpResponse<IDespacho[]>;

@Injectable({ providedIn: 'root' })
export class DespachoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/despachos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(despacho: IDespacho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despacho);
    return this.http
      .post<IDespacho>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(despacho: IDespacho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despacho);
    return this.http
      .put<IDespacho>(`${this.resourceUrl}/${getDespachoIdentifier(despacho) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(despacho: IDespacho): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despacho);
    return this.http
      .patch<IDespacho>(`${this.resourceUrl}/${getDespachoIdentifier(despacho) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDespacho>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDespacho[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDespachoToCollectionIfMissing(despachoCollection: IDespacho[], ...despachosToCheck: (IDespacho | null | undefined)[]): IDespacho[] {
    const despachos: IDespacho[] = despachosToCheck.filter(isPresent);
    if (despachos.length > 0) {
      const despachoCollectionIdentifiers = despachoCollection.map(despachoItem => getDespachoIdentifier(despachoItem)!);
      const despachosToAdd = despachos.filter(despachoItem => {
        const despachoIdentifier = getDespachoIdentifier(despachoItem);
        if (despachoIdentifier == null || despachoCollectionIdentifiers.includes(despachoIdentifier)) {
          return false;
        }
        despachoCollectionIdentifiers.push(despachoIdentifier);
        return true;
      });
      return [...despachosToAdd, ...despachoCollection];
    }
    return despachoCollection;
  }

  protected convertDateFromClient(despacho: IDespacho): IDespacho {
    return Object.assign({}, despacho, {
      horaSalida: despacho.horaSalida?.isValid() ? despacho.horaSalida.toJSON() : undefined,
      horaLlegada: despacho.horaLlegada?.isValid() ? despacho.horaLlegada.toJSON() : undefined,
      horaLibre: despacho.horaLibre?.isValid() ? despacho.horaLibre.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaSalida = res.body.horaSalida ? dayjs(res.body.horaSalida) : undefined;
      res.body.horaLlegada = res.body.horaLlegada ? dayjs(res.body.horaLlegada) : undefined;
      res.body.horaLibre = res.body.horaLibre ? dayjs(res.body.horaLibre) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((despacho: IDespacho) => {
        despacho.horaSalida = despacho.horaSalida ? dayjs(despacho.horaSalida) : undefined;
        despacho.horaLlegada = despacho.horaLlegada ? dayjs(despacho.horaLlegada) : undefined;
        despacho.horaLibre = despacho.horaLibre ? dayjs(despacho.horaLibre) : undefined;
      });
    }
    return res;
  }
}
