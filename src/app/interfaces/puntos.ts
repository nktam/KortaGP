import {Apuesta} from './apuesta';
import {Usuario} from './usuario';

export interface Puntos {
    round: number;
    puntosJornada: number;
    puntosParrilla: number;
    puntosCarrera: number;
    puntosSprint?: number;
    puntosAlonso: number;
    puntosSainz: number;
    apuesta: Apuesta;
}