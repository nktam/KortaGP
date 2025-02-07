import {Apuesta} from './apuesta';
import {Usuario} from './usuario';

export interface Puntos {
    puntosGeneral: number;
    puntosJornada: number;
    puntosParrilla: number;
    puntosCarrera: number;
    puntosSprint?: number;
    puntosAlonso: number;
    puntosSainz: number;
    apuesta: Apuesta;
    usuario: Usuario;
}