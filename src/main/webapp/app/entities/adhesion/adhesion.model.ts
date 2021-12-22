import * as dayjs from 'dayjs';
import { IIndividuo } from 'app/entities/individuo/individuo.model';
import { ICliente } from 'app/entities/cliente/cliente.model';

export interface IAdhesion {
  id?: number;
  fechaAlta?: dayjs.Dayjs | null;
  estado?: string | null;
  condicion?: string | null;
  individuo?: IIndividuo | null;
  cliente?: ICliente | null;
}

export class Adhesion implements IAdhesion {
  constructor(
    public id?: number,
    public fechaAlta?: dayjs.Dayjs | null,
    public estado?: string | null,
    public condicion?: string | null,
    public individuo?: IIndividuo | null,
    public cliente?: ICliente | null
  ) {}
}

export function getAdhesionIdentifier(adhesion: IAdhesion): number | undefined {
  return adhesion.id;
}
