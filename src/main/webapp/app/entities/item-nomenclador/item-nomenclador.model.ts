import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IProvision } from 'app/entities/provision/provision.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';

export interface IItemNomenclador {
  id?: number;
  nombre?: string | null;
  carencia?: string | null;
  prestacion?: IPrestacion | null;
  provision?: IProvision | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
  prestadors?: IPrestador[] | null;
}

export class ItemNomenclador implements IItemNomenclador {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public carencia?: string | null,
    public prestacion?: IPrestacion | null,
    public provision?: IProvision | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null,
    public prestadors?: IPrestador[] | null
  ) {}
}

export function getItemNomencladorIdentifier(itemNomenclador: IItemNomenclador): number | undefined {
  return itemNomenclador.id;
}
