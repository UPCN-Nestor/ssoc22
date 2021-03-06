import { IMovimientoStock } from 'app/entities/movimiento-stock/movimiento-stock.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import { IProvision } from 'app/entities/provision/provision.model';

export interface IInsumo {
  id?: number;
  tipo?: string | null;
  precioVenta?: number | null;
  esModificable?: boolean | null;
  movimientoStocks?: IMovimientoStock[] | null;
  prestacions?: IPrestacion[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
  provisions?: IProvision[] | null;
}

export class Insumo implements IInsumo {
  constructor(
    public id?: number,
    public tipo?: string | null,
    public precioVenta?: number | null,
    public esModificable?: boolean | null,
    public movimientoStocks?: IMovimientoStock[] | null,
    public prestacions?: IPrestacion[] | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null,
    public provisions?: IProvision[] | null
  ) {
    this.esModificable = this.esModificable ?? false;
  }
}

export function getInsumoIdentifier(insumo: IInsumo): number | undefined {
  return insumo.id;
}
