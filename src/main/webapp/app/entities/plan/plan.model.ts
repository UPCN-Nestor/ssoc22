import { IProvision } from 'app/entities/provision/provision.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IContrato } from 'app/entities/contrato/contrato.model';

export interface IPlan {
  id?: number;
  tarifa?: string | null;
  habilitaciones?: string | null;
  descuentos?: string | null;
  restricciones?: string | null;
  provisions?: IProvision[] | null;
  excepcionInsumos?: IInsumo[] | null;
  contratoes?: IContrato[] | null;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public tarifa?: string | null,
    public habilitaciones?: string | null,
    public descuentos?: string | null,
    public restricciones?: string | null,
    public provisions?: IProvision[] | null,
    public excepcionInsumos?: IInsumo[] | null,
    public contratoes?: IContrato[] | null
  ) {}
}

export function getPlanIdentifier(plan: IPlan): number | undefined {
  return plan.id;
}
