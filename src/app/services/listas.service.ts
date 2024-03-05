import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from '../interfaces/piloto';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  clasificacion: Piloto[]=[];
  sprint: Piloto[]=[];
  carrera: Piloto[]=[];

  private _clasificacion: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.clasificacion);
  public readonly clasificacion$: Observable<Piloto[]>=this._clasificacion.asObservable();

  private _sprint: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.sprint);
  public readonly sprint$: Observable<Piloto[]>=this._sprint.asObservable();

  private _carrera: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.carrera);
  public readonly carrera$: Observable<Piloto[]>=this._carrera.asObservable();

  constructor() { }

  updateLista(array: Piloto[], lista: string): void {
    if(lista=="clasificación") {
      this._clasificacion.next(array);
    } else if(lista=="sprint") {
      this._sprint.next(array);
    } else {
      this._carrera.next(array);
    }

  };
}
