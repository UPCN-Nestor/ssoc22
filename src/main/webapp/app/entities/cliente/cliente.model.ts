import { IAdhesion } from 'app/entities/adhesion/adhesion.model';
import { IContrato } from 'app/entities/contrato/contrato.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';
import { IFactura } from 'app/entities/factura/factura.model';
import { IItemFactura } from 'app/entities/item-factura/item-factura.model';

export interface ICliente {
  id?: number;
  nombre?: string | null;
  socio?: number | null;
  suministro?: number | null;
  dni?: string | null;
  padrons?: ICliente[] | null;
  adhesions?: IAdhesion[] | null;
  contratoes?: IContrato[] | null;
  solicitudPrestacions?: ISolicitudPrestacion[] | null;
  enPadron?: ICliente | null;
  facturas?: IFactura[] | null;
  itemFacturas?: IItemFactura[] | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string | null,
    public socio?: number | null,
    public suministro?: number | null,
    public dni?: string | null,
    public padrons?: ICliente[] | null,
    public adhesions?: IAdhesion[] | null,
    public contratoes?: IContrato[] | null,
    public solicitudPrestacions?: ISolicitudPrestacion[] | null,
    public enPadron?: ICliente | null,
    public facturas?: IFactura[] | null,
    public itemFacturas?: IItemFactura[] | null
  ) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
