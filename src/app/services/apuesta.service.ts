import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";
import {Piloto} from '../interfaces/piloto';


@Injectable({
  providedIn: 'root'
})

export class ApuestaService {

  apuesta: Apuesta={
    id: 0,
    carrera: {
      1: {id: 1, nombre: "Max", equipo: 'Red Bull'},
      2: {id: 44, nombre: "Hamilton", equipo: 'Mercedes'},
      3: {id: 14, nombre: "Alonso", equipo: 'Aston Martin'}
    },
    sprint: {
      1: {id: 1, nombre: "Max", equipo: 'Red Bull'},
      2: {id: 44, nombre: "Hamilton", equipo: 'Mercedes'},
      3: {id: 14, nombre: "Alonso", equipo: 'Aston Martin'}
    },
    clasificacion: {
      1: {id: 1, nombre: "Max", equipo: 'Red Bull'},
      2: {id: 44, nombre: "Hamilton", equipo: 'Mercedes'},
      3: {id: 14, nombre: "Alonso", equipo: 'Aston Martin'}
    },
    posAlonso: 5,
    posSainz: 7,
    equipo: 'Red Bull'
  }

  private _apuesta: BehaviorSubject<Apuesta>=new BehaviorSubject<Apuesta>(this.apuesta);
  public readonly apuesta$: Observable<Apuesta>=this._apuesta.asObservable();

  private _estado: BehaviorSubject<string>=new BehaviorSubject<string>('Clasificación');
  public readonly estado$: Observable<string>=this._estado.asObservable();

  constructor() { }

  updateEstado(estado: string): void {
    this._estado.next(estado);
  };

  updateApuesta(apuesta: Apuesta): void {
    this._apuesta.next(apuesta);
  };

  updatePosiciones(posiciones: Array<Piloto>, estado: string): void {

    if(estado=='Carrera') {
      this.apuesta.carrera[1]=posiciones[0];
      this.apuesta.carrera[2]=posiciones[1];
      this.apuesta.carrera[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
      console.log(this._apuesta.value);
    }

    if(estado=='Sprint') {
      this.apuesta.sprint[1]=posiciones[0];
      this.apuesta.sprint[2]=posiciones[1];
      this.apuesta.sprint[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
      console.log(this._apuesta.value);
    }

    if(estado=='Clasificación') {
      this.apuesta.clasificacion[1]=posiciones[0];
      this.apuesta.clasificacion[2]=posiciones[1];
      this.apuesta.clasificacion[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
      console.log(this._apuesta.value);
    }
  };


}
