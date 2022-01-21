import dayjs from 'dayjs/esm';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';
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
  itemNomenclador?: IItemNomenclador | null;
  prestador?: IPrestador | null;
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
    public itemNomenclador?: IItemNomenclador | null,
    public prestador?: IPrestador | null,
    public insumos?: IInsumo[] | null,
    public individuo?: IIndividuo | null
  ) {}
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
