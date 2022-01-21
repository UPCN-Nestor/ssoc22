import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<IDespacho>(this.resourceUrl, despacho, { observe: 'response' });
  }

  update(despacho: IDespacho): Observable<EntityResponseType> {
    return this.http.put<IDespacho>(`${this.resourceUrl}/${getDespachoIdentifier(despacho) as number}`, despacho, { observe: 'response' });
  }

  partialUpdate(despacho: IDespacho): Observable<EntityResponseType> {
    return this.http.patch<IDespacho>(`${this.resourceUrl}/${getDespachoIdentifier(despacho) as number}`, despacho, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDespacho>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDespacho[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
