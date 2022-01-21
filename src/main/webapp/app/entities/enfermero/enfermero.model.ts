import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IEnfermero {
  id?: number;
  nombre?: string | null;
  despachos?: IDespacho[] | null;
}

export class Enfermero implements IEnfermero {
  constructor(public id?: number, public nombre?: string | null, public despachos?: IDespacho[] | null) {}
}

export function getEnfermeroIdentifier(enfermero: IEnfermero): number | undefined {
  return enfermero.id;
}
