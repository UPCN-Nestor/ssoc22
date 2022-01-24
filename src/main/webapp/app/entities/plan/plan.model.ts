import { IProvision } from 'app/entities/provision/provision.model';
import { ITarifa } from 'app/entities/tarifa/tarifa.model';
import { IContrato } from 'app/entities/contrato/contrato.model';

export interface IPlan {
  id?: number;
  habilitaciones?: string | null;
  descuentos?: string | null;
  restricciones?: string | null;
  provisions?: IProvision[] | null;
  tarifas?: ITarifa[] | null;
  contratoes?: IContrato[] | null;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public habilitaciones?: string | null,
    public descuentos?: string | null,
    public restricciones?: string | null,
    public provisions?: IProvision[] | null,
    public tarifas?: ITarifa[] | null,
    public contratoes?: IContrato[] | null
  ) {}
}

export function getPlanIdentifier(plan: IPlan): number | undefined {
  return plan.id;
}
