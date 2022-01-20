import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReglaPrestacion, getReglaPrestacionIdentifier } from '../regla-prestacion.model';

export type EntityResponseType = HttpResponse<IReglaPrestacion>;
export type EntityArrayResponseType = HttpResponse<IReglaPrestacion[]>;

@Injectable({ providedIn: 'root' })
export class ReglaPrestacionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/regla-prestacions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reglaPrestacion: IReglaPrestacion): Observable<EntityResponseType> {
    return this.http.post<IReglaPrestacion>(this.resourceUrl, reglaPrestacion, { observe: 'response' });
  }

  update(reglaPrestacion: IReglaPrestacion): Observable<EntityResponseType> {
    return this.http.put<IReglaPrestacion>(
      `${this.resourceUrl}/${getReglaPrestacionIdentifier(reglaPrestacion) as number}`,
      reglaPrestacion,
      { observe: 'response' }
    );
  }

  partialUpdate(reglaPrestacion: IReglaPrestacion): Observable<EntityResponseType> {
    return this.http.patch<IReglaPrestacion>(
      `${this.resourceUrl}/${getReglaPrestacionIdentifier(reglaPrestacion) as number}`,
      reglaPrestacion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReglaPrestacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReglaPrestacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReglaPrestacionToCollectionIfMissing(
    reglaPrestacionCollection: IReglaPrestacion[],
    ...reglaPrestacionsToCheck: (IReglaPrestacion | null | undefined)[]
  ): IReglaPrestacion[] {
    const reglaPrestacions: IReglaPrestacion[] = reglaPrestacionsToCheck.filter(isPresent);
    if (reglaPrestacions.length > 0) {
      const reglaPrestacionCollectionIdentifiers = reglaPrestacionCollection.map(
        reglaPrestacionItem => getReglaPrestacionIdentifier(reglaPrestacionItem)!
      );
      const reglaPrestacionsToAdd = reglaPrestacions.filter(reglaPrestacionItem => {
        const reglaPrestacionIdentifier = getReglaPrestacionIdentifier(reglaPrestacionItem);
        if (reglaPrestacionIdentifier == null || reglaPrestacionCollectionIdentifiers.includes(reglaPrestacionIdentifier)) {
          return false;
        }
        reglaPrestacionCollectionIdentifiers.push(reglaPrestacionIdentifier);
        return true;
      });
      return [...reglaPrestacionsToAdd, ...reglaPrestacionCollection];
    }
    return reglaPrestacionCollection;
  }
}
