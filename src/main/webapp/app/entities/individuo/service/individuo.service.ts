import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIndividuo, getIndividuoIdentifier } from '../individuo.model';

export type EntityResponseType = HttpResponse<IIndividuo>;
export type EntityArrayResponseType = HttpResponse<IIndividuo[]>;

@Injectable({ providedIn: 'root' })
export class IndividuoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/individuos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(individuo: IIndividuo): Observable<EntityResponseType> {
    return this.http.post<IIndividuo>(this.resourceUrl, individuo, { observe: 'response' });
  }

  update(individuo: IIndividuo): Observable<EntityResponseType> {
    return this.http.put<IIndividuo>(`${this.resourceUrl}/${getIndividuoIdentifier(individuo) as number}`, individuo, {
      observe: 'response',
    });
  }

  partialUpdate(individuo: IIndividuo): Observable<EntityResponseType> {
    return this.http.patch<IIndividuo>(`${this.resourceUrl}/${getIndividuoIdentifier(individuo) as number}`, individuo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIndividuo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  queryPorAdhesion(idCliente: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIndividuo[]>(this.resourceUrl + `/poradhesion/${idCliente}`, { params: options, observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIndividuo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  queryPorNombreParcial(nombre: string, req?: any): Observable<HttpResponse<IIndividuo[]>> {
    const options = createRequestOption(req);
    return this.http.get<IIndividuo[]>(this.resourceUrl + '/parcial/' + nombre, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addIndividuoToCollectionIfMissing(
    individuoCollection: IIndividuo[],
    ...individuosToCheck: (IIndividuo | null | undefined)[]
  ): IIndividuo[] {
    const individuos: IIndividuo[] = individuosToCheck.filter(isPresent);
    if (individuos.length > 0) {
      const individuoCollectionIdentifiers = individuoCollection.map(individuoItem => getIndividuoIdentifier(individuoItem)!);
      const individuosToAdd = individuos.filter(individuoItem => {
        const individuoIdentifier = getIndividuoIdentifier(individuoItem);
        if (individuoIdentifier == null || individuoCollectionIdentifiers.includes(individuoIdentifier)) {
          return false;
        }
        individuoCollectionIdentifiers.push(individuoIdentifier);
        return true;
      });
      return [...individuosToAdd, ...individuoCollection];
    }
    return individuoCollection;
  }
}
