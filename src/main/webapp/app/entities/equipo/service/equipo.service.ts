import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEquipo, getEquipoIdentifier } from '../equipo.model';

export type EntityResponseType = HttpResponse<IEquipo>;
export type EntityArrayResponseType = HttpResponse<IEquipo[]>;

@Injectable({ providedIn: 'root' })
export class EquipoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/equipos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(equipo: IEquipo): Observable<EntityResponseType> {
    return this.http.post<IEquipo>(this.resourceUrl, equipo, { observe: 'response' });
  }

  update(equipo: IEquipo): Observable<EntityResponseType> {
    return this.http.put<IEquipo>(`${this.resourceUrl}/${getEquipoIdentifier(equipo) as number}`, equipo, { observe: 'response' });
  }

  partialUpdate(equipo: IEquipo): Observable<EntityResponseType> {
    return this.http.patch<IEquipo>(`${this.resourceUrl}/${getEquipoIdentifier(equipo) as number}`, equipo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEquipo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEquipo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEquipoToCollectionIfMissing(equipoCollection: IEquipo[], ...equiposToCheck: (IEquipo | null | undefined)[]): IEquipo[] {
    const equipos: IEquipo[] = equiposToCheck.filter(isPresent);
    if (equipos.length > 0) {
      const equipoCollectionIdentifiers = equipoCollection.map(equipoItem => getEquipoIdentifier(equipoItem)!);
      const equiposToAdd = equipos.filter(equipoItem => {
        const equipoIdentifier = getEquipoIdentifier(equipoItem);
        if (equipoIdentifier == null || equipoCollectionIdentifiers.includes(equipoIdentifier)) {
          return false;
        }
        equipoCollectionIdentifiers.push(equipoIdentifier);
        return true;
      });
      return [...equiposToAdd, ...equipoCollection];
    }
    return equipoCollection;
  }
}
