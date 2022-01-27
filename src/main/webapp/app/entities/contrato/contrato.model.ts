import dayjs from 'dayjs/esm';
import { IPlan } from 'app/entities/plan/plan.model';
import { ICliente } from 'app/entities/cliente/cliente.model';

export interface IContrato {
  id?: number;
  fechaAlta?: dayjs.Dayjs | null;
  fechaBaja?: dayjs.Dayjs | null;
  particularidades?: string | null;
  plan?: IPlan | null;
  cliente?: ICliente | null;
}

export class Contrato implements IContrato {
  constructor(
    public id?: number,
    public fechaAlta?: dayjs.Dayjs | null,
    public fechaBaja?: dayjs.Dayjs | null,
    public particularidades?: string | null,
    public plan?: IPlan | null,
    public cliente?: ICliente | null
  ) {}
}

export function getContratoIdentifier(contrato: IContrato): number | undefined {
  return contrato.id;
}
