import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import { IProvision } from 'app/entities/provision/provision.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';

export interface IItemNomenclador {
  id?: number;
  nombre?: string | null;
  diasCarencia?: number | null;
  codigo?: string | null;
  prestacion?: IPrestacion | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
  provisions?: IProvision[] | null;
  prestadors?: IPrestador[] | null;
  habilitado?: boolean;
  motivoInhabilitado?: string;
}

export class ItemNomenclador implements IItemNomenclador {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public diasCarencia?: number | null,
    public codigo?: string | null,
    public prestacion?: IPrestacion | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null,
    public provisions?: IProvision[] | null,
    public prestadors?: IPrestador[] | null,
    public habilitado?: boolean,
    public motivoInhabilitado?: string
  ) {}
}

export function getItemNomencladorIdentifier(itemNomenclador: IItemNomenclador): number | undefined {
  return itemNomenclador.id;
}
