import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IDespacho } from 'app/entities/despacho/despacho.model';

export interface IPrestador {
  id?: number;
  nombre?: string | null;
  condicion?: string | null;
  itemNomencladors?: IItemNomenclador[] | null;
  despachos?: IDespacho[] | null;
}

export class Prestador implements IPrestador {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public condicion?: string | null,
    public itemNomencladors?: IItemNomenclador[] | null,
    public despachos?: IDespacho[] | null
  ) {}
}

export function getPrestadorIdentifier(prestador: IPrestador): number | undefined {
  return prestador.id;
}
