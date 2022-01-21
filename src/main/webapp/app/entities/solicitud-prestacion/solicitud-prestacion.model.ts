import dayjs from 'dayjs/esm';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IIndividuo } from 'app/entities/individuo/individuo.model';

export interface ISolicitudPrestacion {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  numero?: number | null;
  horaSolicitud?: dayjs.Dayjs | null;
  domicilio?: string | null;
  telefono?: string | null;
  edad?: number | null;
  observaciones?: string | null;
  despacho?: IDespacho | null;
  prestador?: IPrestador | null;
  prestacion?: IPrestacion | null;
  insumos?: IInsumo[] | null;
  individuo?: IIndividuo | null;
}

export class SolicitudPrestacion implements ISolicitudPrestacion {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public numero?: number | null,
    public horaSolicitud?: dayjs.Dayjs | null,
    public domicilio?: string | null,
    public telefono?: string | null,
    public edad?: number | null,
    public observaciones?: string | null,
    public despacho?: IDespacho | null,
    public prestador?: IPrestador | null,
    public prestacion?: IPrestacion | null,
    public insumos?: IInsumo[] | null,
    public individuo?: IIndividuo | null
  ) {}
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
