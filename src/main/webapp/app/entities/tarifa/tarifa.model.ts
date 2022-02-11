import dayjs from 'dayjs/esm';
import { IPlan } from 'app/entities/plan/plan.model';

export interface ITarifa {
  id?: number;
  tipo?: string | null;
  datos?: string | null;
  precio?: number | null;
  vigenciaDesde?: dayjs.Dayjs | null;
  vigenciaHasta?: dayjs.Dayjs | null;
  plan?: IPlan | null;
}

export class Tarifa implements ITarifa {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public datos?: string | null,
    public precio?: number | null,
    public vigenciaDesde?: dayjs.Dayjs | null,
    public vigenciaHasta?: dayjs.Dayjs | null,
    public plan?: IPlan | null
  ) {}
}

export function getTarifaIdentifier(tarifa: ITarifa): number | undefined {
  return tarifa.id;
}
