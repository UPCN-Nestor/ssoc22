import { IProvision } from 'app/entities/provision/provision.model';

export interface IReglaPrestacion {
  id?: number;
  regla?: string | null;
  datos?: string | null;
  provision?: IProvision | null;
}

export class ReglaPrestacion implements IReglaPrestacion {
  constructor(public id?: number, public regla?: string | null, public datos?: string | null, public provision?: IProvision | null) {}
}

export function getReglaPrestacionIdentifier(reglaPrestacion: IReglaPrestacion): number | undefined {
  return reglaPrestacion.id;
}
