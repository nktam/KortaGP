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

  async updateApuesta(apuesta: Apuesta): Promise<void> {
    this.apuesta=apuesta;
    this._apuesta.next(apuesta);
  };


  // al actualizar posiciones this.apuesta tiene la info de apuestaInfo
  updatePosiciones(posiciones: Array<Piloto>, lista: string): void {
    switch(lista) {
      case 'Clasificación': {
        for(let i=0; i<3; i++) {
          this.apuesta.clasificacion[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
      case 'Sprint': {
        for(let i=0; i<3; i++) {
          this.apuesta.sprint[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
      default: {
        for(let i=0; i<3; i++) {
          this.apuesta.carrera[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
    }

  };

}
