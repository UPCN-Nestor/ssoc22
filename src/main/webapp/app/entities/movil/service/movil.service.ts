import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovil, getMovilIdentifier } from '../movil.model';

export type EntityResponseType = HttpResponse<IMovil>;
export type EntityArrayResponseType = HttpResponse<IMovil[]>;

@Injectable({ providedIn: 'root' })
export class MovilService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movils');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movil: IMovil): Observable<EntityResponseType> {
    return this.http.post<IMovil>(this.resourceUrl, movil, { observe: 'response' });
  }

  update(movil: IMovil): Observable<EntityResponseType> {
    return this.http.put<IMovil>(`${this.resourceUrl}/${getMovilIdentifier(movil) as number}`, movil, { observe: 'response' });
  }

  partialUpdate(movil: IMovil): Observable<EntityResponseType> {
    return this.http.patch<IMovil>(`${this.resourceUrl}/${getMovilIdentifier(movil) as number}`, movil, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovilToCollectionIfMissing(movilCollection: IMovil[], ...movilsToCheck: (IMovil | null | undefined)[]): IMovil[] {
    const movils: IMovil[] = movilsToCheck.filter(isPresent);
    if (movils.length > 0) {
      const movilCollectionIdentifiers = movilCollection.map(movilItem => getMovilIdentifier(movilItem)!);
      const movilsToAdd = movils.filter(movilItem => {
        const movilIdentifier = getMovilIdentifier(movilItem);
        if (movilIdentifier == null || movilCollectionIdentifiers.includes(movilIdentifier)) {
          return false;
        }
        movilCollectionIdentifiers.push(movilIdentifier);
        return true;
      });
      return [...movilsToAdd, ...movilCollection];
    }
    return movilCollection;
  }
}
