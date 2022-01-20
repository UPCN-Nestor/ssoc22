import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInsumo, getInsumoIdentifier } from '../insumo.model';

export type EntityResponseType = HttpResponse<IInsumo>;
export type EntityArrayResponseType = HttpResponse<IInsumo[]>;

@Injectable({ providedIn: 'root' })
export class InsumoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/insumos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(insumo: IInsumo): Observable<EntityResponseType> {
    return this.http.post<IInsumo>(this.resourceUrl, insumo, { observe: 'response' });
  }

  update(insumo: IInsumo): Observable<EntityResponseType> {
    return this.http.put<IInsumo>(`${this.resourceUrl}/${getInsumoIdentifier(insumo) as number}`, insumo, { observe: 'response' });
  }

  partialUpdate(insumo: IInsumo): Observable<EntityResponseType> {
    return this.http.patch<IInsumo>(`${this.resourceUrl}/${getInsumoIdentifier(insumo) as number}`, insumo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInsumo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInsumo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInsumoToCollectionIfMissing(insumoCollection: IInsumo[], ...insumosToCheck: (IInsumo | null | undefined)[]): IInsumo[] {
    const insumos: IInsumo[] = insumosToCheck.filter(isPresent);
    if (insumos.length > 0) {
      const insumoCollectionIdentifiers = insumoCollection.map(insumoItem => getInsumoIdentifier(insumoItem)!);
      const insumosToAdd = insumos.filter(insumoItem => {
        const insumoIdentifier = getInsumoIdentifier(insumoItem);
        if (insumoIdentifier == null || insumoCollectionIdentifiers.includes(insumoIdentifier)) {
          return false;
        }
        insumoCollectionIdentifiers.push(insumoIdentifier);
        return true;
      });
      return [...insumosToAdd, ...insumoCollection];
    }
    return insumoCollection;
  }
}
