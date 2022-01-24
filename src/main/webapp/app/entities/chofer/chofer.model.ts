import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IChofer {
  id?: number;
  nombre?: string | null;
  despachos?: IDespacho[] | null;
}

export class Chofer implements IChofer {
  constructor(public id?: number, public nombre?: string | null, public despachos?: IDespacho[] | null) {}
}

export function getChoferIdentifier(chofer: IChofer): number | undefined {
  return chofer.id;
}
