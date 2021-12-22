import * as dayjs from 'dayjs';
import { IPlan } from 'app/entities/plan/plan.model';
import { ICliente } from 'app/entities/cliente/cliente.model';

export interface ISubscripcion {
  id?: number;
  fechaAlta?: dayjs.Dayjs | null;
  particularidades?: string | null;
  plan?: IPlan | null;
  cliente?: ICliente | null;
}

export class Subscripcion implements ISubscripcion {
  constructor(
    public id?: number,
    public fechaAlta?: dayjs.Dayjs | null,
    public particularidades?: string | null,
    public plan?: IPlan | null,
    public cliente?: ICliente | null
  ) {}
}

export function getSubscripcionIdentifier(subscripcion: ISubscripcion): number | undefined {
  return subscripcion.id;
}
