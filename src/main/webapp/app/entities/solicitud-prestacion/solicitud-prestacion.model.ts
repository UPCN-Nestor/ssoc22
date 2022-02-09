import dayjs from 'dayjs/esm';
import { IDespacho } from 'app/entities/despacho/despacho.model';
import { IItemNomenclador } from 'app/entities/item-nomenclador/item-nomenclador.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { IUser } from 'app/entities/user/user.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';
import { IAdhesion } from 'app/entities/adhesion/adhesion.model';

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
  individuoAdhoc?: string | null;
  precioReal?: number | null;
  despacho?: IDespacho | null;
  itemNomenclador?: IItemNomenclador | null;
  prestador?: IPrestador | null;
  usuarioSolicitud?: IUser | null;
  insumos?: IInsumo[] | null;
  adhesion?: IAdhesion | null;
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
    public individuoAdhoc?: string | null,
    public precioReal?: number | null,
    public despacho?: IDespacho | null,
    public itemNomenclador?: IItemNomenclador | null,
    public prestador?: IPrestador | null,
    public usuarioSolicitud?: IUser | null,
    public insumos?: IInsumo[] | null,
    public adhesion?: IAdhesion | null
  ) {
    this.seEfectuo = this.seEfectuo ?? false;
    this.internacion = this.internacion ?? false;
  }
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
