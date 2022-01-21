import dayjs from 'dayjs/esm';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { IMedico } from 'app/entities/medico/medico.model';
import { IEnfermero } from 'app/entities/enfermero/enfermero.model';
import { IMovil } from 'app/entities/movil/movil.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IDespacho {
  id?: number;
  horaSalida?: dayjs.Dayjs | null;
  horaLlegada?: dayjs.Dayjs | null;
  chofers?: IChofer[] | null;
  medicos?: IMedico[] | null;
  enfermeros?: IEnfermero[] | null;
  movils?: IMovil[] | null;
  solicitudPrestacion?: ISolicitudPrestacion | null;
}

export class Despacho implements IDespacho {
  constructor(
    public id?: number,
    public horaSalida?: dayjs.Dayjs | null,
    public horaLlegada?: dayjs.Dayjs | null,
    public chofers?: IChofer[] | null,
    public medicos?: IMedico[] | null,
    public enfermeros?: IEnfermero[] | null,
    public movils?: IMovil[] | null,
    public solicitudPrestacion?: ISolicitudPrestacion | null
  ) {}
}

export function getDespachoIdentifier(despacho: IDespacho): number | undefined {
  return despacho.id;
}
