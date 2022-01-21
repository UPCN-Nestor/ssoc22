import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IMedico {
  id?: number;
  nombre?: string | null;
  despachos?: IDespacho[] | null;
}

export class Medico implements IMedico {
  constructor(public id?: number, public nombre?: string | null, public despachos?: IDespacho[] | null) {}
}

export function getMedicoIdentifier(medico: IMedico): number | undefined {
  return medico.id;
}
