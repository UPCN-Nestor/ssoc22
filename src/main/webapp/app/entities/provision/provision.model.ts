import { IReglaPrestacion } from 'app/entities/regla-prestacion/regla-prestacion.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IProvision {
  id?: number;
  reglaPrestacions?: IReglaPrestacion[] | null;
  prestacion?: IPrestacion | null;
  plan?: IPlan | null;
}

export class Provision implements IProvision {
  constructor(
    public id?: number,
    public reglaPrestacions?: IReglaPrestacion[] | null,
    public prestacion?: IPrestacion | null,
    public plan?: IPlan | null
  ) {}
}

export function getProvisionIdentifier(provision: IProvision): number | undefined {
  return provision.id;
}
