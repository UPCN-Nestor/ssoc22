import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IPrestacion {
  id?: number;
  tipo?: string | null;
  carencias?: string | null;
  insumos?: IInsumo[] | null;
  plans?: IPlan[] | null;
}

export class Prestacion implements IPrestacion {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public carencias?: string | null,
    public insumos?: IInsumo[] | null,
    public plans?: IPlan[] | null
  ) {}
}

export function getPrestacionIdentifier(prestacion: IPrestacion): number | undefined {
  return prestacion.id;
}
