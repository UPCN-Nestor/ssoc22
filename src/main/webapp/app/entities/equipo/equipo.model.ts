import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IEquipo {
  id?: number;
  despachos?: IDespacho[] | null;
}

export class Equipo implements IEquipo {
  constructor(public id?: number, public despachos?: IDespacho[] | null) {}
}

export function getEquipoIdentifier(equipo: IEquipo): number | undefined {
  return equipo.id;
}
