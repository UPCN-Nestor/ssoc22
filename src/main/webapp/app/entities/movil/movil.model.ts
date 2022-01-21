import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IMovil {
  id?: number;
  numero?: number | null;
  despachos?: IDespacho[] | null;
}

export class Movil implements IMovil {
  constructor(public id?: number, public numero?: number | null, public despachos?: IDespacho[] | null) {}
}

export function getMovilIdentifier(movil: IMovil): number | undefined {
  return movil.id;
}
