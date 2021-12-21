import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';

export interface IPlan {
  id?: number;
  tarifa?: string | null;
  habilitaciones?: string | null;
  descuentos?: string | null;
  restricciones?: string | null;
  adhesions?: IAdhesion[] | null;
  prestacions?: IPrestacion[] | null;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public tarifa?: string | null,
    public habilitaciones?: string | null,
    public descuentos?: string | null,
    public restricciones?: string | null,
    public adhesions?: IAdhesion[] | null,
    public prestacions?: IPrestacion[] | null
  ) {}
}

export function getPlanIdentifier(plan: IPlan): number | undefined {
  return plan.id;
}
