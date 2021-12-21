import { ICliente } from 'app/entities/cliente/cliente.model';

export interface IFactura {
  id?: number;
  cliente?: ICliente | null;
}

export class Factura implements IFactura {
  constructor(public id?: number, public cliente?: ICliente | null) {}
}

export function getFacturaIdentifier(factura: IFactura): number | undefined {
  return factura.id;
}
