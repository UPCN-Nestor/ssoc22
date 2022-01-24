import { ICliente } from 'app/entities/cliente/cliente.model';
import { IFactura } from 'app/entities/factura/factura.model';

export interface IItemFactura {
  id?: number;
  cliente?: ICliente | null;
  factura?: IFactura | null;
}

export class ItemFactura implements IItemFactura {
  constructor(public id?: number, public cliente?: ICliente | null, public factura?: IFactura | null) {}
}

export function getItemFacturaIdentifier(itemFactura: IItemFactura): number | undefined {
  return itemFactura.id;
}
