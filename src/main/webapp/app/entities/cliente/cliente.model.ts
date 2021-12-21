import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { IFactura } from 'app/entities/factura/factura.model';

export interface ICliente {
  id?: number;
  padrons?: ICliente[] | null;
  adhesions?: IAdhesion[] | null;
  facturas?: IFactura[] | null;
  enPadron?: ICliente | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public padrons?: ICliente[] | null,
    public adhesions?: IAdhesion[] | null,
    public facturas?: IFactura[] | null,
    public enPadron?: ICliente | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
