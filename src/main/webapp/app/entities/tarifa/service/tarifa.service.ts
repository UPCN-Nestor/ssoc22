import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITarifa, getTarifaIdentifier } from '../tarifa.model';

export type EntityResponseType = HttpResponse<ITarifa>;
export type EntityArrayResponseType = HttpResponse<ITarifa[]>;

@Injectable({ providedIn: 'root' })
export class TarifaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tarifas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tarifa: ITarifa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarifa);
    return this.http
      .post<ITarifa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tarifa: ITarifa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarifa);
    return this.http
      .put<ITarifa>(`${this.resourceUrl}/${getTarifaIdentifier(tarifa) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(tarifa: ITarifa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarifa);
    return this.http
      .patch<ITarifa>(`${this.resourceUrl}/${getTarifaIdentifier(tarifa) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITarifa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITarifa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTarifaToCollectionIfMissing(tarifaCollection: ITarifa[], ...tarifasToCheck: (ITarifa | null | undefined)[]): ITarifa[] {
    const tarifas: ITarifa[] = tarifasToCheck.filter(isPresent);
    if (tarifas.length > 0) {
      const tarifaCollectionIdentifiers = tarifaCollection.map(tarifaItem => getTarifaIdentifier(tarifaItem)!);
      const tarifasToAdd = tarifas.filter(tarifaItem => {
        const tarifaIdentifier = getTarifaIdentifier(tarifaItem);
        if (tarifaIdentifier == null || tarifaCollectionIdentifiers.includes(tarifaIdentifier)) {
          return false;
        }
        tarifaCollectionIdentifiers.push(tarifaIdentifier);
        return true;
      });
      return [...tarifasToAdd, ...tarifaCollection];
    }
    return tarifaCollection;
  }

  protected convertDateFromClient(tarifa: ITarifa): ITarifa {
    return Object.assign({}, tarifa, {
      vigenciaHasta: tarifa.vigenciaHasta?.isValid() ? tarifa.vigenciaHasta.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.vigenciaHasta = res.body.vigenciaHasta ? dayjs(res.body.vigenciaHasta) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tarifa: ITarifa) => {
        tarifa.vigenciaHasta = tarifa.vigenciaHasta ? dayjs(tarifa.vigenciaHasta) : undefined;
      });
    }
    return res;
  }
}
