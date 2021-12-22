import { IDespacho } from 'app/entities/despacho/despacho.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { IInsumo } from 'app/entities/insumo/insumo.model';

export interface ISolicitudPrestacion {
  id?: number;
  despacho?: IDespacho | null;
  prestador?: IPrestador | null;
  prestacion?: IPrestacion | null;
  insumos?: IInsumo[] | null;
}

export class SolicitudPrestacion implements ISolicitudPrestacion {
  constructor(
    public id?: number,
    public despacho?: IDespacho | null,
    public prestador?: IPrestador | null,
    public prestacion?: IPrestacion | null,
    public insumos?: IInsumo[] | null
  ) {}
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
