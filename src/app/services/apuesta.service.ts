import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";
import {Piloto} from '../interfaces/piloto';
import {ConsultasService} from './consultas.service';


@Injectable({
  providedIn: 'root'
})

export class ApuestaService {

  apuesta: any={};

  private _apuesta: BehaviorSubject<Apuesta>=new BehaviorSubject<Apuesta>(this.apuesta);
  public readonly apuesta$: Observable<Apuesta>=this._apuesta.asObservable();

  constructor(private cs: ConsultasService) {
    this.cs.consultaApuestaGuardada().then(res => this.apuesta=res);
    this.updateApuesta(this.apuesta);
  }

  updateApuesta(apuesta: Apuesta): void {
    this._apuesta.next(apuesta);
  };

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
