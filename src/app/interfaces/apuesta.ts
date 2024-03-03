import {Posiciones} from "./posiciones";

export interface Apuesta {
    id: number;
    carrera: Posiciones;
    clasificacion: Posiciones;
    sprint: Posiciones;
    equipo: string;
    posAlonso: number;
    posSainz: number;
}
