import { IProvision } from 'app/entities/provision/provision.model';

export interface IReglaPrestacion {
  id?: number;
  provision?: IProvision | null;
}

export class ReglaPrestacion implements IReglaPrestacion {
  constructor(public id?: number, public provision?: IProvision | null) {}
}

export function getReglaPrestacionIdentifier(reglaPrestacion: IReglaPrestacion): number | undefined {
  return reglaPrestacion.id;
}
