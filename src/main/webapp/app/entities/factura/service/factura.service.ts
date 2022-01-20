import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFactura, getFacturaIdentifier } from '../factura.model';

export type EntityResponseType = HttpResponse<IFactura>;
export type EntityArrayResponseType = HttpResponse<IFactura[]>;

@Injectable({ providedIn: 'root' })
export class FacturaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/facturas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(factura: IFactura): Observable<EntityResponseType> {
    return this.http.post<IFactura>(this.resourceUrl, factura, { observe: 'response' });
  }

  update(factura: IFactura): Observable<EntityResponseType> {
    return this.http.put<IFactura>(`${this.resourceUrl}/${getFacturaIdentifier(factura) as number}`, factura, { observe: 'response' });
  }

  partialUpdate(factura: IFactura): Observable<EntityResponseType> {
    return this.http.patch<IFactura>(`${this.resourceUrl}/${getFacturaIdentifier(factura) as number}`, factura, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFactura>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFactura[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFacturaToCollectionIfMissing(facturaCollection: IFactura[], ...facturasToCheck: (IFactura | null | undefined)[]): IFactura[] {
    const facturas: IFactura[] = facturasToCheck.filter(isPresent);
    if (facturas.length > 0) {
      const facturaCollectionIdentifiers = facturaCollection.map(facturaItem => getFacturaIdentifier(facturaItem)!);
      const facturasToAdd = facturas.filter(facturaItem => {
        const facturaIdentifier = getFacturaIdentifier(facturaItem);
        if (facturaIdentifier == null || facturaCollectionIdentifiers.includes(facturaIdentifier)) {
          return false;
        }
        facturaCollectionIdentifiers.push(facturaIdentifier);
        return true;
      });
      return [...facturasToAdd, ...facturaCollection];
    }
    return facturaCollection;
  }
}
