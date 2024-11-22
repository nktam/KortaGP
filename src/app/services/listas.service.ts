import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from '../interfaces/piloto';
import {Listas} from "../interfaces/listas";
import {Apuesta} from '../interfaces/apuesta';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  listas: Listas={clasificacion: [], carrera: [], sprint: []};
  private _pagina: string='';

  private _listas: BehaviorSubject<Listas>=new BehaviorSubject<Listas>(this.listas);
  public readonly listas$: Observable<Listas>=this._listas.asObservable();

  public get pagina(): string {
    return this._pagina;
  }

  public set pagina(value: string) {
    this._pagina=value;
  }

  public updateListas(array: Piloto[]): Listas {
    this.updateClasificacion(array);
    this.updateSprint(array);
    this.updateCarrera(array);
    return this.listas;
  };

  public updateClasificacion(array: Piloto[]): void {
    this.listas.clasificacion=array;
    this._listas.next(this.listas);
  };

  public updateSprint(array: Piloto[]): void {
    this.listas.sprint=array;
    this._listas.next(this.listas);
  };

  public updateCarrera(array: Piloto[]): void {
    this.listas.carrera=array;
    this._listas.next(this.listas);
  };

  /* public updateListasConApuesta(apuesta: Apuesta, pilotos: Piloto[]): void {
    var lista=Array.from(pilotos);
    apuesta.carrera.forEach(piloto => {
      var index=lista.findIndex(item => item.id==piloto.id);
      lista.splice(index, 1);
    });
    this.updateCarrera(apuesta.carrera.concat(lista));
    lista=Array.from(pilotos);

    apuesta.sprint.forEach(piloto => {
      var index=lista.findIndex(item => item.id==piloto.id);
      lista.splice(index, 1);
    });
    this.updateSprint(apuesta.sprint.concat(lista));
    lista=Array.from(pilotos);
    apuesta.clasificacion.forEach(piloto => {
      var index=lista.findIndex(item => item.id==piloto.id);
      lista.splice(index, 1);
    });
    this.updateClasificacion(apuesta.clasificacion.concat(lista));
  } */

  public updateListasConApuesta(apuesta: Apuesta, pilotos: Piloto[]): void {
    var lista=Array.from(pilotos);
    this.updateCarrera(this.cambiaPilotos(apuesta.carrera, lista));
    lista=Array.from(pilotos);
    this.updateSprint(this.cambiaPilotos(apuesta.sprint, lista));
    lista=Array.from(pilotos);
    this.updateClasificacion(this.cambiaPilotos(apuesta.clasificacion, lista));
  }

  private cambiaPilotos(pilotosApuesta: Piloto[], listaPilotos: Piloto[]): Array<Piloto> {
    pilotosApuesta.forEach(piloto => {
      var index=listaPilotos.findIndex(item => item.id==piloto.id);
      listaPilotos.splice(index, 1);
    });
    return pilotosApuesta.concat(listaPilotos);
  }

}
