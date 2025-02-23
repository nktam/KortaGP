import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";
import {Piloto} from '../interfaces/piloto';
import apuestaInfo from '../utils/apuesta.json';
import {Race} from '../interfaces/race';
import {Usuario} from '../interfaces/usuario';

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

  async updateUsuario(usuario: Usuario): Promise<void> {
    this.apuesta.usuario=usuario;
    this._apuesta.next(this.apuesta);
  };

  public updateFecha() {
    this.apuesta.fecha=Date.now();
    this._apuesta.next(this.apuesta);
  }

  public updateRace(race: Race) {
    this.apuesta.race=race;
    this._apuesta.next(this.apuesta);
  }

  public updateId(id: string) {
    this.apuesta.id=id;
    this._apuesta.next(this.apuesta);
  }

  // al actualizar posiciones this.apuesta tiene la info de apuestaInfo
  updatePosiciones(posiciones: Array<Piloto>, lista: string): void {
    switch(lista) {
      case 'Parrilla': {
        for(let i=0; i<4; i++) {
          this.apuesta.parrilla[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
      case 'Sprint': {
        for(let i=0; i<4; i++) {
          this.apuesta.sprint[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
      default: {
        for(let i=0; i<4; i++) {
          this.apuesta.carrera[i]=posiciones[i];
        }
        this._apuesta.next(this.apuesta);
        break;
      }
    }
  };
}
