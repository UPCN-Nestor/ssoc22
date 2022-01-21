import { IReglaPrestacion } from 'app/entities/regla-prestacion/regla-prestacion.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IProvision {
  id?: number;
  reglaPrestacions?: IReglaPrestacion[] | null;
  itemNomencladors?: IItemNomenclador[] | null;
  insumos?: IInsumo[] | null;
  plan?: IPlan | null;
}

export class Provision implements IProvision {
  constructor(
    public id?: number,
    public reglaPrestacions?: IReglaPrestacion[] | null,
    public itemNomencladors?: IItemNomenclador[] | null,
    public insumos?: IInsumo[] | null,
    public plan?: IPlan | null
  ) {}
}

export function getProvisionIdentifier(provision: IProvision): number | undefined {
  return provision.id;
}
