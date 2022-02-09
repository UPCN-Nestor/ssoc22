import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPrestador, getPrestadorIdentifier } from '../prestador.model';

export type EntityResponseType = HttpResponse<IPrestador>;
export type EntityArrayResponseType = HttpResponse<IPrestador[]>;

@Injectable({ providedIn: 'root' })
export class PrestadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prestadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prestador: IPrestador): Observable<EntityResponseType> {
    return this.http.post<IPrestador>(this.resourceUrl, prestador, { observe: 'response' });
  }

  update(prestador: IPrestador): Observable<EntityResponseType> {
    return this.http.put<IPrestador>(`${this.resourceUrl}/${getPrestadorIdentifier(prestador) as number}`, prestador, {
      observe: 'response',
    });
  }

  partialUpdate(prestador: IPrestador): Observable<EntityResponseType> {
    return this.http.patch<IPrestador>(`${this.resourceUrl}/${getPrestadorIdentifier(prestador) as number}`, prestador, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrestador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrestador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryPorItemNomenclador(itemnomencladorid: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrestador[]>(this.resourceUrl + `/poritemnomenclador/${itemnomencladorid}`, {
      params: options,
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPrestadorToCollectionIfMissing(
    prestadorCollection: IPrestador[],
    ...prestadorsToCheck: (IPrestador | null | undefined)[]
  ): IPrestador[] {
    const prestadors: IPrestador[] = prestadorsToCheck.filter(isPresent);
    if (prestadors.length > 0) {
      const prestadorCollectionIdentifiers = prestadorCollection.map(prestadorItem => getPrestadorIdentifier(prestadorItem)!);
      const prestadorsToAdd = prestadors.filter(prestadorItem => {
        const prestadorIdentifier = getPrestadorIdentifier(prestadorItem);
        if (prestadorIdentifier == null || prestadorCollectionIdentifiers.includes(prestadorIdentifier)) {
          return false;
        }
        prestadorCollectionIdentifiers.push(prestadorIdentifier);
        return true;
      });
      return [...prestadorsToAdd, ...prestadorCollection];
    }
    return prestadorCollection;
  }
}
