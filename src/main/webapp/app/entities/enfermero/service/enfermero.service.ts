import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEnfermero, getEnfermeroIdentifier } from '../enfermero.model';

export type EntityResponseType = HttpResponse<IEnfermero>;
export type EntityArrayResponseType = HttpResponse<IEnfermero[]>;

@Injectable({ providedIn: 'root' })
export class EnfermeroService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/enfermeros');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(enfermero: IEnfermero): Observable<EntityResponseType> {
    return this.http.post<IEnfermero>(this.resourceUrl, enfermero, { observe: 'response' });
  }

  update(enfermero: IEnfermero): Observable<EntityResponseType> {
    return this.http.put<IEnfermero>(`${this.resourceUrl}/${getEnfermeroIdentifier(enfermero) as number}`, enfermero, {
      observe: 'response',
    });
  }

  partialUpdate(enfermero: IEnfermero): Observable<EntityResponseType> {
    return this.http.patch<IEnfermero>(`${this.resourceUrl}/${getEnfermeroIdentifier(enfermero) as number}`, enfermero, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnfermero>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnfermero[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEnfermeroToCollectionIfMissing(
    enfermeroCollection: IEnfermero[],
    ...enfermerosToCheck: (IEnfermero | null | undefined)[]
  ): IEnfermero[] {
    const enfermeros: IEnfermero[] = enfermerosToCheck.filter(isPresent);
    if (enfermeros.length > 0) {
      const enfermeroCollectionIdentifiers = enfermeroCollection.map(enfermeroItem => getEnfermeroIdentifier(enfermeroItem)!);
      const enfermerosToAdd = enfermeros.filter(enfermeroItem => {
        const enfermeroIdentifier = getEnfermeroIdentifier(enfermeroItem);
        if (enfermeroIdentifier == null || enfermeroCollectionIdentifiers.includes(enfermeroIdentifier)) {
          return false;
        }
        enfermeroCollectionIdentifiers.push(enfermeroIdentifier);
        return true;
      });
      return [...enfermerosToAdd, ...enfermeroCollection];
    }
    return enfermeroCollection;
  }
}
