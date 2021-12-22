import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IReglaPrestacion {
  id?: number;
  prestacion?: IPrestacion | null;
  plan?: IPlan | null;
}

export class ReglaPrestacion implements IReglaPrestacion {
  constructor(public id?: number, public prestacion?: IPrestacion | null, public plan?: IPlan | null) {}
}

export function getReglaPrestacionIdentifier(reglaPrestacion: IReglaPrestacion): number | undefined {
  return reglaPrestacion.id;
}
