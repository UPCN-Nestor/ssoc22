import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimientoStock, getMovimientoStockIdentifier } from '../movimiento-stock.model';

export type EntityResponseType = HttpResponse<IMovimientoStock>;
export type EntityArrayResponseType = HttpResponse<IMovimientoStock[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoStockService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimiento-stocks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimientoStock: IMovimientoStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientoStock);
    return this.http
      .post<IMovimientoStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimientoStock: IMovimientoStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientoStock);
    return this.http
      .put<IMovimientoStock>(`${this.resourceUrl}/${getMovimientoStockIdentifier(movimientoStock) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(movimientoStock: IMovimientoStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientoStock);
    return this.http
      .patch<IMovimientoStock>(`${this.resourceUrl}/${getMovimientoStockIdentifier(movimientoStock) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovimientoStock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimientoStock[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientoStockToCollectionIfMissing(
    movimientoStockCollection: IMovimientoStock[],
    ...movimientoStocksToCheck: (IMovimientoStock | null | undefined)[]
  ): IMovimientoStock[] {
    const movimientoStocks: IMovimientoStock[] = movimientoStocksToCheck.filter(isPresent);
    if (movimientoStocks.length > 0) {
      const movimientoStockCollectionIdentifiers = movimientoStockCollection.map(
        movimientoStockItem => getMovimientoStockIdentifier(movimientoStockItem)!
      );
      const movimientoStocksToAdd = movimientoStocks.filter(movimientoStockItem => {
        const movimientoStockIdentifier = getMovimientoStockIdentifier(movimientoStockItem);
        if (movimientoStockIdentifier == null || movimientoStockCollectionIdentifiers.includes(movimientoStockIdentifier)) {
          return false;
        }
        movimientoStockCollectionIdentifiers.push(movimientoStockIdentifier);
        return true;
      });
      return [...movimientoStocksToAdd, ...movimientoStockCollection];
    }
    return movimientoStockCollection;
  }

  protected convertDateFromClient(movimientoStock: IMovimientoStock): IMovimientoStock {
    return Object.assign({}, movimientoStock, {
      fecha: movimientoStock.fecha?.isValid() ? movimientoStock.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((movimientoStock: IMovimientoStock) => {
        movimientoStock.fecha = movimientoStock.fecha ? dayjs(movimientoStock.fecha) : undefined;
      });
    }
    return res;
  }
}
