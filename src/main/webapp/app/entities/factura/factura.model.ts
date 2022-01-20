import { ICliente } from 'app/entities/cliente/cliente.model';
import { IItemFactura } from 'app/entities/item-factura/item-factura.model';

export interface IFactura {
  id?: number;
  cliente?: ICliente | null;
  itemFacturas?: IItemFactura[] | null;
}

export class Factura implements IFactura {
  constructor(public id?: number, public cliente?: ICliente | null, public itemFacturas?: IItemFactura[] | null) {}
}

export function getFacturaIdentifier(factura: IFactura): number | undefined {
  return factura.id;
}
