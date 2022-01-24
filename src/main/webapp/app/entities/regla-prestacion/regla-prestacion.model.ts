import { IProvision } from 'app/entities/provision/provision.model';

export interface IReglaPrestacion {
  id?: number;
  codigoRegla?: string | null;
  tipoRegla?: string | null;
  datos?: string | null;
  provision?: IProvision | null;
}

export class ReglaPrestacion implements IReglaPrestacion {
  constructor(
    public id?: number,
    public codigoRegla?: string | null,
    public tipoRegla?: string | null,
    public datos?: string | null,
    public provision?: IProvision | null
  ) {}
}

export function getReglaPrestacionIdentifier(reglaPrestacion: IReglaPrestacion): number | undefined {
  return reglaPrestacion.id;
}
