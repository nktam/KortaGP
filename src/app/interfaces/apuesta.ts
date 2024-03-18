import {Equipo} from './equipo';
import {GranPremio} from './granPremio';
import {Posiciones} from "./posiciones";

export interface Apuesta {
    id: number;
    carrera: Posiciones;
    clasificacion: Posiciones;
    sprint: Posiciones;
    equipo: Equipo;
    posAlonso: number;
    posSainz: number;
    granPremio?: GranPremio;
    tieneSprint: boolean;
}
