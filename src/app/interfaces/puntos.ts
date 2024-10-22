import {Usuario} from './usuario';

export interface Puntos extends Usuario {
    round: number;
    puntosGeneral: number;
    puntosRound: number;
    puntosParrilla: number;
    puntosCarrera: number;
    puntosExtra: number;
    puntosAlonso: number;
    puntosSainz: number;
    puntosEquipo: number;
}