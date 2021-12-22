import * as dayjs from 'dayjs';
import { IInsumo } from 'app/entities/insumo/insumo.model';

export interface IMovimientoStock {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  insumo?: IInsumo | null;
}

export class MovimientoStock implements IMovimientoStock {
  constructor(public id?: number, public fecha?: dayjs.Dayjs | null, public insumo?: IInsumo | null) {}
}

export function getMovimientoStockIdentifier(movimientoStock: IMovimientoStock): number | undefined {
  return movimientoStock.id;
}
