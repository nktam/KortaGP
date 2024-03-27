import {Equipo} from './equipo';
import {GranPremio} from './granPremio';
import {Piloto} from './piloto';

export interface Apuesta {
    id: number;
    carrera: Piloto[];
    clasificacion: Piloto[];
    sprint: Piloto[];
    equipo: Equipo;
    posAlonso: number;
    posSainz: number;
    granPremio?: GranPremio;
    tieneSprint: boolean;
}
