import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { ISubscripcion } from 'app/entities/subscripcion/subscripcion.model';
import { IFactura } from 'app/entities/factura/factura.model';
import { IItemFactura } from 'app/entities/item-factura/item-factura.model';

export interface ICliente {
  id?: number;
  padrons?: ICliente[] | null;
  adhesions?: IAdhesion[] | null;
  subscripcions?: ISubscripcion[] | null;
  enPadron?: ICliente | null;
  facturas?: IFactura[] | null;
  itemFacturas?: IItemFactura[] | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public padrons?: ICliente[] | null,
    public adhesions?: IAdhesion[] | null,
    public subscripcions?: ISubscripcion[] | null,
    public enPadron?: ICliente | null,
    public facturas?: IFactura[] | null,
    public itemFacturas?: IItemFactura[] | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
