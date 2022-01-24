import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChofer, getChoferIdentifier } from '../chofer.model';

export type EntityResponseType = HttpResponse<IChofer>;
export type EntityArrayResponseType = HttpResponse<IChofer[]>;

@Injectable({ providedIn: 'root' })
export class ChoferService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chofers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chofer: IChofer): Observable<EntityResponseType> {
    return this.http.post<IChofer>(this.resourceUrl, chofer, { observe: 'response' });
  }

  update(chofer: IChofer): Observable<EntityResponseType> {
    return this.http.put<IChofer>(`${this.resourceUrl}/${getChoferIdentifier(chofer) as number}`, chofer, { observe: 'response' });
  }

  partialUpdate(chofer: IChofer): Observable<EntityResponseType> {
    return this.http.patch<IChofer>(`${this.resourceUrl}/${getChoferIdentifier(chofer) as number}`, chofer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChofer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChofer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChoferToCollectionIfMissing(choferCollection: IChofer[], ...chofersToCheck: (IChofer | null | undefined)[]): IChofer[] {
    const chofers: IChofer[] = chofersToCheck.filter(isPresent);
    if (chofers.length > 0) {
      const choferCollectionIdentifiers = choferCollection.map(choferItem => getChoferIdentifier(choferItem)!);
      const chofersToAdd = chofers.filter(choferItem => {
        const choferIdentifier = getChoferIdentifier(choferItem);
        if (choferIdentifier == null || choferCollectionIdentifiers.includes(choferIdentifier)) {
          return false;
        }
        choferCollectionIdentifiers.push(choferIdentifier);
        return true;
      });
      return [...chofersToAdd, ...choferCollection];
    }
    return choferCollection;
  }
}
