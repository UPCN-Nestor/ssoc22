import { IAdhesion } from 'app/entities/adhesion/adhesion.model';

export interface IIndividuo {
  id?: number;
  adhesions?: IAdhesion[] | null;
}

export class Individuo implements IIndividuo {
  constructor(public id?: number, public adhesions?: IAdhesion[] | null) {}
}

export function getIndividuoIdentifier(individuo: IIndividuo): number | undefined {
  return individuo.id;
}
