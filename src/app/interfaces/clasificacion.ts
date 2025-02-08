import {Puntos} from './puntos';
import {Usuario} from './usuario';

export interface Clasificación {
    usuario: Usuario;
    puntos: number;
    lastRound: number;
    jornadas: Puntos[];
}