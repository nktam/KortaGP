import {Equipo} from './equipo';
import {Race} from './race';
import {Piloto} from './piloto';
import {Usuario} from './usuario';

export interface Apuesta {
    id: string;
    usuario: Usuario;
    fecha: number;
    carrera: Piloto[];
    parrilla: Piloto[];
    sprint: Piloto[];
    posAlonso: number;
    posSainz: number;
    race?: Race;
}
