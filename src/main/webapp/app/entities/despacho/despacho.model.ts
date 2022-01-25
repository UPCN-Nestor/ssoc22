import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IPrestador } from 'app/entities/prestador/prestador.model';
import { IChofer } from 'app/entities/chofer/chofer.model';
import { IMedico } from 'app/entities/medico/medico.model';
import { IEnfermero } from 'app/entities/enfermero/enfermero.model';
import { IMovil } from 'app/entities/movil/movil.model';
import { ISolicitudPrestacion } from 'app/entities/solicitud-prestacion/solicitud-prestacion.model';

export interface IDespacho {
  id?: number;
  horaSalida?: dayjs.Dayjs | null;
  horaLlegada?: dayjs.Dayjs | null;
  horaLibre?: dayjs.Dayjs | null;
  usuarioSalida?: IUser | null;
  usuarioLlegada?: IUser | null;
  usuarioLibre?: IUser | null;
  prestador?: IPrestador | null;
  chofer?: IChofer | null;
  medico?: IMedico | null;
  enfermero?: IEnfermero | null;
  movil?: IMovil | null;
  solicitudPrestacion?: ISolicitudPrestacion | null;
}

export class Despacho implements IDespacho {
  constructor(
    public id?: number,
    public horaSalida?: dayjs.Dayjs | null,
    public horaLlegada?: dayjs.Dayjs | null,
    public horaLibre?: dayjs.Dayjs | null,
    public usuarioSalida?: IUser | null,
    public usuarioLlegada?: IUser | null,
    public usuarioLibre?: IUser | null,
    public prestador?: IPrestador | null,
    public chofer?: IChofer | null,
    public medico?: IMedico | null,
    public enfermero?: IEnfermero | null,
    public movil?: IMovil | null,
    public solicitudPrestacion?: ISolicitudPrestacion | null
  ) {}
}

export function getDespachoIdentifier(despacho: IDespacho): number | undefined {
  return despacho.id;
}
