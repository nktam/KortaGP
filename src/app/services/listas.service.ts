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

  public updateListasConApuesta(apuesta: Apuesta, pilotos: Piloto[]): void {
    const pilotosBuenos=this.quitaPilotosMalos(pilotos);
    this.updateCarrera(this.cambiaPilotos(apuesta.carrera, pilotosBuenos));
    this.updateSprint(this.cambiaPilotos(apuesta.sprint, pilotosBuenos));
    this.updateClasificacion(this.cambiaPilotos(apuesta.clasificacion, pilotosBuenos));
  }

  private quitaPilotosMalos(pilotos: Piloto[]): Array<Piloto> {
    const pilotosParaEliminar: Array<string>=['77', '2', '24', '30', '43', '3', '23', '38']
    pilotosParaEliminar.forEach(e => {
      var index=pilotos.findIndex(i => i.id==e);
      if(index>-1) pilotos.splice(index, 1);
    });
    return Array.from(pilotos);
  }

  private cambiaPilotos(pilotosApuesta: Piloto[], listaPilotos: Piloto[]): Array<Piloto> {
    const lista: Piloto[]=Array.from(listaPilotos);
    pilotosApuesta.forEach(piloto => {
      var index=lista.findIndex(i => i.id==piloto.id);
      if(index>-1) lista.splice(index, 1);
    });
    return Array.from(pilotosApuesta.concat(lista));
  }
}
