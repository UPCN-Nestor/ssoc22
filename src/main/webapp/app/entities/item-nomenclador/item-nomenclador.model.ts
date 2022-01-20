import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IProvision } from 'app/entities/provision/provision.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';

export interface IItemNomenclador {
  id?: number;
  prestacion?: IPrestacion | null;
  provisions?: IProvision[] | null;
  prestadors?: IPrestador[] | null;
}

export class ItemNomenclador implements IItemNomenclador {
  constructor(
    public id?: number,
    public prestacion?: IPrestacion | null,
    public provisions?: IProvision[] | null,
    public prestadors?: IPrestador[] | null
  ) {}
}

export function getItemNomencladorIdentifier(itemNomenclador: IItemNomenclador): number | undefined {
  return itemNomenclador.id;
}
