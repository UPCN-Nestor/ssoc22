import * as dayjs from 'dayjs';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IAdhesion {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  particularidades?: string | null;
  cliente?: ICliente | null;
  individuo?: IIndividuo | null;
  plan?: IPlan | null;
}

export class Adhesion implements IAdhesion {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public particularidades?: string | null,
    public cliente?: ICliente | null,
    public individuo?: IIndividuo | null,
    public plan?: IPlan | null
  ) {}
}

export function getAdhesionIdentifier(adhesion: IAdhesion): number | undefined {
  return adhesion.id;
}
