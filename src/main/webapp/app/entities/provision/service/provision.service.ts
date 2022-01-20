import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProvision, getProvisionIdentifier } from '../provision.model';

export type EntityResponseType = HttpResponse<IProvision>;
export type EntityArrayResponseType = HttpResponse<IProvision[]>;

@Injectable({ providedIn: 'root' })
export class ProvisionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/provisions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(provision: IProvision): Observable<EntityResponseType> {
    return this.http.post<IProvision>(this.resourceUrl, provision, { observe: 'response' });
  }

  update(provision: IProvision): Observable<EntityResponseType> {
    return this.http.put<IProvision>(`${this.resourceUrl}/${getProvisionIdentifier(provision) as number}`, provision, {
      observe: 'response',
    });
  }

  partialUpdate(provision: IProvision): Observable<EntityResponseType> {
    return this.http.patch<IProvision>(`${this.resourceUrl}/${getProvisionIdentifier(provision) as number}`, provision, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProvision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProvision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProvisionToCollectionIfMissing(
    provisionCollection: IProvision[],
    ...provisionsToCheck: (IProvision | null | undefined)[]
  ): IProvision[] {
    const provisions: IProvision[] = provisionsToCheck.filter(isPresent);
    if (provisions.length > 0) {
      const provisionCollectionIdentifiers = provisionCollection.map(provisionItem => getProvisionIdentifier(provisionItem)!);
      const provisionsToAdd = provisions.filter(provisionItem => {
        const provisionIdentifier = getProvisionIdentifier(provisionItem);
        if (provisionIdentifier == null || provisionCollectionIdentifiers.includes(provisionIdentifier)) {
          return false;
        }
        provisionCollectionIdentifiers.push(provisionIdentifier);
        return true;
      });
      return [...provisionsToAdd, ...provisionCollection];
    }
    return provisionCollection;
  }
}
