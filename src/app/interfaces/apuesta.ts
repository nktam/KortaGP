import {Equipo} from './equipo';
import {Race} from './race';
import {Piloto} from './piloto';
import {Usuario} from './usuario';

export interface Apuesta extends Usuario {
    id: number;
    fecha: number;
    carrera: Piloto[];
    clasificacion: Piloto[];
    sprint: Piloto[];
    equipo: Equipo;
    posAlonso: number;
    posSainz: number;
    race?: Race;
}
