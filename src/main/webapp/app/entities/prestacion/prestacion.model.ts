import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IReglaPrestacion } from 'app/entities/regla-prestacion/regla-prestacion.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IPrestacion {
  id?: number;
  tipo?: string | null;
  carencias?: string | null;
  itemNomenclador?: IItemNomenclador | null;
  insumos?: IInsumo[] | null;
  reglaPrestacions?: IReglaPrestacion[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
}

export class Prestacion implements IPrestacion {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public carencias?: string | null,
    public itemNomenclador?: IItemNomenclador | null,
    public insumos?: IInsumo[] | null,
    public reglaPrestacions?: IReglaPrestacion[] | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null
  ) {}
}

export function getPrestacionIdentifier(prestacion: IPrestacion): number | undefined {
  return prestacion.id;
}
