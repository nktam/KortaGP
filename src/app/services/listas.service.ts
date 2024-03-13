import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from '../interfaces/piloto';
import {ConsultasService} from '../services/consultas.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private cs: ConsultasService) { }

  clasificacion: Piloto[]=[{id: 0, nombre: ""}];
  sprint: Piloto[]=[{id: 0, nombre: ""}];
  carrera: Piloto[]=[{id: 0, nombre: ""}];

  private _clasificacion: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.clasificacion);
  public readonly clasificacion$: Observable<Piloto[]>=this._clasificacion.asObservable();

  private _sprint: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.sprint);
  public readonly sprint$: Observable<Piloto[]>=this._sprint.asObservable();

  private _carrera: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.carrera);
  public readonly carrera$: Observable<Piloto[]>=this._carrera.asObservable();

  public updateListas(array: Piloto[]): void {
    this.updateClasificacion(array);
    this.updateSprint(array);
    this.updateCarrera(array);
  };

  public updateClasificacion(array: Piloto[]): void {
    this.clasificacion=array;
    this._clasificacion.next(array);
  };

  public updateSprint(array: Piloto[]): void {
    this.sprint=array;
    this._sprint.next(array);
  };

  public updateCarrera(array: Piloto[]): void {
    this.carrera=array;
    this._carrera.next(array);
  };

}
