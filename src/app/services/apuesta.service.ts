import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";
import {Piloto} from '../interfaces/piloto';
import apuestaInfo from '../utils/apuesta.json';
import {Equipo} from '../interfaces/equipo';
import {GranPremio} from '../interfaces/granPremio';
import {ConsultasService} from './consultas.service';

@Injectable({
  providedIn: 'root'
})

export class ApuestaService {

  apuesta: Apuesta=apuestaInfo;

  private _apuesta: BehaviorSubject<Apuesta>=new BehaviorSubject<Apuesta>(this.apuesta);
  public readonly apuesta$: Observable<Apuesta>=this._apuesta.asObservable();

  constructor(private cs: ConsultasService) {
    //this.apuesta=this.cs.consultaApuestaGuardada();
    //this._apuesta.next(this.apuesta);
  }


  updateApuesta(apuesta: Apuesta): void {
    this._apuesta.next(apuesta);
  };

  updatePosiciones(posiciones: Array<Piloto>, lista: string): void {

    switch(lista) {
      case 'Clasificación': {
        this.apuesta.clasificacion[1]=posiciones[0];
        this.apuesta.clasificacion[2]=posiciones[1];
        this.apuesta.clasificacion[3]=posiciones[2];
        this.apuesta.clasificacion[4]=posiciones[3];
        this._apuesta.next(this.apuesta);
        break;
      }
      case 'Sprint': {
        this.apuesta.sprint[1]=posiciones[0];
        this.apuesta.sprint[2]=posiciones[1];
        this.apuesta.sprint[3]=posiciones[2];
        this.apuesta.sprint[4]=posiciones[3];
        this._apuesta.next(this.apuesta);
        break;
      }
      default: {
        this.apuesta.carrera[1]=posiciones[0];
        this.apuesta.carrera[2]=posiciones[1];
        this.apuesta.carrera[3]=posiciones[2];
        this.apuesta.carrera[4]=posiciones[3];
        this._apuesta.next(this.apuesta);
        break;
      }
    }

  };

}
