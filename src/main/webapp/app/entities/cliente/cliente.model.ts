import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { IContrato } from 'app/entities/contrato/contrato.model';
import { IFactura } from 'app/entities/factura/factura.model';
import { IItemFactura } from 'app/entities/item-factura/item-factura.model';

export interface ICliente {
  id?: number;
  padrons?: ICliente[] | null;
  adhesions?: IAdhesion[] | null;
  contratoes?: IContrato[] | null;
  enPadron?: ICliente | null;
  facturas?: IFactura[] | null;
  itemFacturas?: IItemFactura[] | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public padrons?: ICliente[] | null,
    public adhesions?: IAdhesion[] | null,
    public contratoes?: IContrato[] | null,
    public enPadron?: ICliente | null,
    public facturas?: IFactura[] | null,
    public itemFacturas?: IItemFactura[] | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
