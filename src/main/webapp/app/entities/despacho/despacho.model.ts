export interface IDespacho {
  id?: number;
}

export class Despacho implements IDespacho {
  constructor(public id?: number) {}
}

export function getDespachoIdentifier(despacho: IDespacho): number | undefined {
  return despacho.id;
}
