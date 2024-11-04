import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from '../interfaces/piloto';
import {Listas} from "../interfaces/listas";
import {ConsultasService} from '../services/consultas.service';

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

}
