import {Piloto} from "./piloto";

export interface Apuesta {
    id: number;
    carrera: Piloto[];
    calsificacion: Piloto[];
    sprint: Piloto[];
    equipo: string;
    posAlonso: number;
    posSainz: number;
}
