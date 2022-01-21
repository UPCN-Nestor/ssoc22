import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IIndividuo {
  id?: number;
  nombre?: string | null;
  dni?: string | null;
  adhesions?: IAdhesion[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
}

export class Individuo implements IIndividuo {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public dni?: string | null,
    public adhesions?: IAdhesion[] | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null
  ) {}
}

export function getIndividuoIdentifier(individuo: IIndividuo): number | undefined {
  return individuo.id;
}
