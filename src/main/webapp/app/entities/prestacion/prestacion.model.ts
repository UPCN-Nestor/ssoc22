import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IProvision } from 'app/entities/provision/provision.model';

export interface IPrestacion {
  id?: number;
  tipo?: string | null;
  precio?: number | null;
  diasCarencia?: number | null;
  nombre?: string | null;
  codigo?: string | null;
  itemNomencladors?: IItemNomenclador[] | null;
  insumos?: IInsumo[] | null;
  provisions?: IProvision[] | null;
}

export class Prestacion implements IPrestacion {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public precio?: number | null,
    public diasCarencia?: number | null,
    public nombre?: string | null,
    public codigo?: string | null,
    public itemNomencladors?: IItemNomenclador[] | null,
    public insumos?: IInsumo[] | null,
    public provisions?: IProvision[] | null
  ) {}
}

export function getPrestacionIdentifier(prestacion: IPrestacion): number | undefined {
  return prestacion.id;
}
