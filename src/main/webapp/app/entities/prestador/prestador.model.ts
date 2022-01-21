import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IPrestador {
  id?: number;
  itemNomencladors?: IItemNomenclador[] | null;
  solicitudPrestacion?: ISolicitudPrestacion | null;
}

export class Prestador implements IPrestador {
  constructor(
    public id?: number,
    public itemNomencladors?: IItemNomenclador[] | null,
    public solicitudPrestacion?: ISolicitudPrestacion | null
  ) {}
}

export function getPrestadorIdentifier(prestador: IPrestador): number | undefined {
  return prestador.id;
}
