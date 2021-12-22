import { IReglaPrestacion } from 'app/entities/regla-prestacion/regla-prestacion.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { ISubscripcion } from 'app/entities/subscripcion/subscripcion.model';

export interface IPlan {
  id?: number;
  tarifa?: string | null;
  habilitaciones?: string | null;
  descuentos?: string | null;
  restricciones?: string | null;
  reglaPrestacions?: IReglaPrestacion[] | null;
  excepcionInsumos?: IInsumo[] | null;
  subscripcions?: ISubscripcion[] | null;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public tarifa?: string | null,
    public habilitaciones?: string | null,
    public descuentos?: string | null,
    public restricciones?: string | null,
    public reglaPrestacions?: IReglaPrestacion[] | null,
    public excepcionInsumos?: IInsumo[] | null,
    public subscripcions?: ISubscripcion[] | null
  ) {}
}

export function getPlanIdentifier(plan: IPlan): number | undefined {
  return plan.id;
}
