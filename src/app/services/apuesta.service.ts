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

    switch(lista) {
      case 'Clasificación': {
        this.apuesta.clasificacion[1]=posiciones[0];
        this.apuesta.clasificacion[2]=posiciones[1];
        this.apuesta.clasificacion[3]=posiciones[2];
        this._apuesta.next(this.apuesta);
        break;
      }
      case 'Sprint': {
        this.apuesta.sprint[1]=posiciones[0];
        this.apuesta.sprint[2]=posiciones[1];
        this.apuesta.sprint[3]=posiciones[2];
        this._apuesta.next(this.apuesta);
        break;
      }
      default: {
        this.apuesta.carrera[1]=posiciones[0];
        this.apuesta.carrera[2]=posiciones[1];
        this.apuesta.carrera[3]=posiciones[2];
        this._apuesta.next(this.apuesta);
        break;
      }
    }

  };

  updateEquipo(equipo: string): void {
    this.apuesta.equipo=equipo;
    this._apuesta.next(this.apuesta);
  };

  updatePosalonso(pos: number): void {
    this.apuesta.posAlonso=pos;
    this._apuesta.next(this.apuesta);
  };

  updatePossainz(pos: number): void {
    this.apuesta.posSainz=pos;
    this._apuesta.next(this.apuesta);
  };

  updateGranpremio(granpremio: number): void {
    this.apuesta.granPremio=granpremio;
    this._apuesta.next(this.apuesta);
  };

  updateSprint(sprint: boolean): void {
    this.apuesta.tieneSprint=sprint;
    this._apuesta.next(this.apuesta);
  };
}
