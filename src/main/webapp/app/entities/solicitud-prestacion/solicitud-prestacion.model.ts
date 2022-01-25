import dayjs from 'dayjs/esm';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { IUser } from 'app/entities/user/user.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IIndividuo } from 'app/entities/individuo/individuo.model';

export interface ISolicitudPrestacion {
  id?: number;
  tipo?: string | null;
  numero?: number | null;
  horaSolicitud?: dayjs.Dayjs | null;
  domicilio?: string | null;
  telefono?: string | null;
  edad?: number | null;
  motivoLlamado?: string | null;
  seEfectuo?: boolean | null;
  internacion?: boolean | null;
  observaciones?: string | null;
  despacho?: IDespacho | null;
  usuarioSolicitud?: IUser | null;
  itemNomenclador?: IItemNomenclador | null;
  insumos?: IInsumo[] | null;
  individuo?: IIndividuo | null;
}

export class SolicitudPrestacion implements ISolicitudPrestacion {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public numero?: number | null,
    public horaSolicitud?: dayjs.Dayjs | null,
    public domicilio?: string | null,
    public telefono?: string | null,
    public edad?: number | null,
    public motivoLlamado?: string | null,
    public seEfectuo?: boolean | null,
    public internacion?: boolean | null,
    public observaciones?: string | null,
    public despacho?: IDespacho | null,
    public usuarioSolicitud?: IUser | null,
    public itemNomenclador?: IItemNomenclador | null,
    public insumos?: IInsumo[] | null,
    public individuo?: IIndividuo | null
  ) {
    this.seEfectuo = this.seEfectuo ?? false;
    this.internacion = this.internacion ?? false;
  }
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
