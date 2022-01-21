import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IPrestador {
  id?: number;
  nombre?: string | null;
  condicion?: string | null;
  itemNomencladors?: IItemNomenclador[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
}

export class Prestador implements IPrestador {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public condicion?: string | null,
    public itemNomencladors?: IItemNomenclador[] | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null
  ) {}
}

export function getPrestadorIdentifier(prestador: IPrestador): number | undefined {
  return prestador.id;
}
