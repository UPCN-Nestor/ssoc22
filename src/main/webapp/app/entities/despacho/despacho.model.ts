import { IEquipo } from 'app/entities/equipo/equipo.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IDespacho {
  id?: number;
  equipo?: IEquipo | null;
  solicitudPrestacion?: ISolicitudPrestacion | null;
}

export class Despacho implements IDespacho {
  constructor(public id?: number, public equipo?: IEquipo | null, public solicitudPrestacion?: ISolicitudPrestacion | null) {}
}

export function getDespachoIdentifier(despacho: IDespacho): number | undefined {
  return despacho.id;
}
