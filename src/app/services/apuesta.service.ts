import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";
import {Piloto} from '../interfaces/piloto';
import apuestaInfo from '../utils/apuesta.json';

@Injectable({
  providedIn: 'root'
})

export class ApuestaService {

  apuesta: Apuesta=apuestaInfo;

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
    }

    if(estado=='Sprint') {
      this.apuesta.sprint[1]=posiciones[0];
      this.apuesta.sprint[2]=posiciones[1];
      this.apuesta.sprint[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
    }

    if(estado=='Clasificación') {
      this.apuesta.clasificacion[1]=posiciones[0];
      this.apuesta.clasificacion[2]=posiciones[1];
      this.apuesta.clasificacion[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
    }
  };

  updateOtros(equipo: string, posAlonso: number, posSainz: number): void {
    this.apuesta.equipo=equipo;
    this.apuesta.posAlonso=posAlonso;
    this.apuesta.posSainz=posSainz;
    this._apuesta.next(this.apuesta);
  }
}
