import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPrestacion, getPrestacionIdentifier } from '../prestacion.model';

export type EntityResponseType = HttpResponse<IPrestacion>;
export type EntityArrayResponseType = HttpResponse<IPrestacion[]>;

@Injectable({ providedIn: 'root' })
export class PrestacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/prestacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(prestacion: IPrestacion): Observable<EntityResponseType> {
    return this.http.post<IPrestacion>(this.resourceUrl, prestacion, { observe: 'response' });
  }

  update(prestacion: IPrestacion): Observable<EntityResponseType> {
    return this.http.put<IPrestacion>(`${this.resourceUrl}/${getPrestacionIdentifier(prestacion) as number}`, prestacion, {
      observe: 'response',
    });
  }

  partialUpdate(prestacion: IPrestacion): Observable<EntityResponseType> {
    return this.http.patch<IPrestacion>(`${this.resourceUrl}/${getPrestacionIdentifier(prestacion) as number}`, prestacion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrestacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrestacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryPorTipo(tipo: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrestacion[]>(this.resourceUrl + `/portipo/${tipo}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPrestacionToCollectionIfMissing(
    prestacionCollection: IPrestacion[],
    ...prestacionsToCheck: (IPrestacion | null | undefined)[]
  ): IPrestacion[] {
    const prestacions: IPrestacion[] = prestacionsToCheck.filter(isPresent);
    if (prestacions.length > 0) {
      const prestacionCollectionIdentifiers = prestacionCollection.map(prestacionItem => getPrestacionIdentifier(prestacionItem)!);
      const prestacionsToAdd = prestacions.filter(prestacionItem => {
        const prestacionIdentifier = getPrestacionIdentifier(prestacionItem);
        if (prestacionIdentifier == null || prestacionCollectionIdentifiers.includes(prestacionIdentifier)) {
          return false;
        }
        prestacionCollectionIdentifiers.push(prestacionIdentifier);
        return true;
      });
      return [...prestacionsToAdd, ...prestacionCollection];
    }
    return prestacionCollection;
  }
}
