export interface ISolicitudPrestacion {
  id?: number;
}

export class SolicitudPrestacion implements ISolicitudPrestacion {
  constructor(public id?: number) {}
}

export function getSolicitudPrestacionIdentifier(solicitudPrestacion: ISolicitudPrestacion): number | undefined {
  return solicitudPrestacion.id;
}
