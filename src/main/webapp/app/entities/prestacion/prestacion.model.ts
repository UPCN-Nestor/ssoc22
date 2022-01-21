import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';

export interface IPrestacion {
  id?: number;
  tipo?: string | null;
  precio?: number | null;
  carencia?: string | null;
  itemNomencladors?: IItemNomenclador[] | null;
  insumos?: IInsumo[] | null;
}

export class Prestacion implements IPrestacion {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public precio?: number | null,
    public carencia?: string | null,
    public itemNomencladors?: IItemNomenclador[] | null,
    public insumos?: IInsumo[] | null
  ) {}
}

export function getPrestacionIdentifier(prestacion: IPrestacion): number | undefined {
  return prestacion.id;
}
