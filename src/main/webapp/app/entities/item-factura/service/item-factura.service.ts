import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItemFactura, getItemFacturaIdentifier } from '../item-factura.model';

export type EntityResponseType = HttpResponse<IItemFactura>;
export type EntityArrayResponseType = HttpResponse<IItemFactura[]>;

@Injectable({ providedIn: 'root' })
export class ItemFacturaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-facturas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(itemFactura: IItemFactura): Observable<EntityResponseType> {
    return this.http.post<IItemFactura>(this.resourceUrl, itemFactura, { observe: 'response' });
  }

  update(itemFactura: IItemFactura): Observable<EntityResponseType> {
    return this.http.put<IItemFactura>(`${this.resourceUrl}/${getItemFacturaIdentifier(itemFactura) as number}`, itemFactura, {
      observe: 'response',
    });
  }

  partialUpdate(itemFactura: IItemFactura): Observable<EntityResponseType> {
    return this.http.patch<IItemFactura>(`${this.resourceUrl}/${getItemFacturaIdentifier(itemFactura) as number}`, itemFactura, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemFactura>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemFactura[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addItemFacturaToCollectionIfMissing(
    itemFacturaCollection: IItemFactura[],
    ...itemFacturasToCheck: (IItemFactura | null | undefined)[]
  ): IItemFactura[] {
    const itemFacturas: IItemFactura[] = itemFacturasToCheck.filter(isPresent);
    if (itemFacturas.length > 0) {
      const itemFacturaCollectionIdentifiers = itemFacturaCollection.map(itemFacturaItem => getItemFacturaIdentifier(itemFacturaItem)!);
      const itemFacturasToAdd = itemFacturas.filter(itemFacturaItem => {
        const itemFacturaIdentifier = getItemFacturaIdentifier(itemFacturaItem);
        if (itemFacturaIdentifier == null || itemFacturaCollectionIdentifiers.includes(itemFacturaIdentifier)) {
          return false;
        }
        itemFacturaCollectionIdentifiers.push(itemFacturaIdentifier);
        return true;
      });
      return [...itemFacturasToAdd, ...itemFacturaCollection];
    }
    return itemFacturaCollection;
  }
}
