import { IMovimientoStock } from 'app/entities/movimiento-stock/movimiento-stock.model';
import { IPrestacion } from 'app/entities/prestacion/prestacion.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import { IPlan } from 'app/entities/plan/plan.model';

export interface IInsumo {
  id?: number;
  tipo?: string | null;
  precioVenta?: number | null;
  esModificable?: boolean | null;
  movimientoStocks?: IMovimientoStock[] | null;
  prestacions?: IPrestacion[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
  plans?: IPlan[] | null;
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
    public plans?: IPlan[] | null
  ) {
    this.esModificable = this.esModificable ?? false;
  }
}

export function getInsumoIdentifier(insumo: IInsumo): number | undefined {
  return insumo.id;
}
