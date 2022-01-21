import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItemNomenclador, getItemNomencladorIdentifier } from '../item-nomenclador.model';

export type EntityResponseType = HttpResponse<IItemNomenclador>;
export type EntityArrayResponseType = HttpResponse<IItemNomenclador[]>;

@Injectable({ providedIn: 'root' })
export class ItemNomencladorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-nomencladors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(itemNomenclador: IItemNomenclador): Observable<EntityResponseType> {
    return this.http.post<IItemNomenclador>(this.resourceUrl, itemNomenclador, { observe: 'response' });
  }

  update(itemNomenclador: IItemNomenclador): Observable<EntityResponseType> {
    return this.http.put<IItemNomenclador>(
      `${this.resourceUrl}/${getItemNomencladorIdentifier(itemNomenclador) as number}`,
      itemNomenclador,
      { observe: 'response' }
    );
  }

  partialUpdate(itemNomenclador: IItemNomenclador): Observable<EntityResponseType> {
    return this.http.patch<IItemNomenclador>(
      `${this.resourceUrl}/${getItemNomencladorIdentifier(itemNomenclador) as number}`,
      itemNomenclador,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemNomenclador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemNomenclador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addItemNomencladorToCollectionIfMissing(
    itemNomencladorCollection: IItemNomenclador[],
    ...itemNomencladorsToCheck: (IItemNomenclador | null | undefined)[]
  ): IItemNomenclador[] {
    const itemNomencladors: IItemNomenclador[] = itemNomencladorsToCheck.filter(isPresent);
    if (itemNomencladors.length > 0) {
      const itemNomencladorCollectionIdentifiers = itemNomencladorCollection.map(
        itemNomencladorItem => getItemNomencladorIdentifier(itemNomencladorItem)!
      );
      const itemNomencladorsToAdd = itemNomencladors.filter(itemNomencladorItem => {
        const itemNomencladorIdentifier = getItemNomencladorIdentifier(itemNomencladorItem);
        if (itemNomencladorIdentifier == null || itemNomencladorCollectionIdentifiers.includes(itemNomencladorIdentifier)) {
          return false;
        }
        itemNomencladorCollectionIdentifiers.push(itemNomencladorIdentifier);
        return true;
      });
      return [...itemNomencladorsToAdd, ...itemNomencladorCollection];
    }
    return itemNomencladorCollection;
  }
}
