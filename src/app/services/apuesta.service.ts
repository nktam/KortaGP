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

  constructor() { }

  updateApuesta(apuesta: Apuesta): void {
    this._apuesta.next(apuesta);
  };

  updatePosiciones(posiciones: Array<Piloto>, lista: string): void {
    if(lista=='carrera') {
      this.apuesta.carrera[1]=posiciones[0];
      this.apuesta.carrera[2]=posiciones[1];
      this.apuesta.carrera[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
    }

    if(lista=='sprint') {
      this.apuesta.sprint[1]=posiciones[0];
      this.apuesta.sprint[2]=posiciones[1];
      this.apuesta.sprint[3]=posiciones[2];
      this._apuesta.next(this.apuesta);
    }

    if(lista=='clasificacion') {
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
