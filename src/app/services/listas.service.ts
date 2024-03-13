import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from '../interfaces/piloto';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  clasificacion: Piloto[]=[
    {id: 1, nombre: "Max"},
    {id: 4, nombre: "Norris"},
    {id: 11, nombre: "Checo"},
    {id: 14, nombre: "Alonso"},
    {id: 16, nombre: "Lecrerc"},
    {id: 55, nombre: "Sainz"},
    {id: 44, nombre: "Hamilton"}
  ];
  sprint: Piloto[]=[
    {id: 1, nombre: "Max"},
    {id: 4, nombre: "Norris"},
    {id: 11, nombre: "Checo"},
    {id: 14, nombre: "Alonso"},
    {id: 16, nombre: "Lecrerc"},
    {id: 55, nombre: "Sainz"},
    {id: 44, nombre: "Hamilton"}
  ];
  carrera: Piloto[]=[
    {id: 1, nombre: "Max"},
    {id: 4, nombre: "Norris"},
    {id: 11, nombre: "Checo"},
    {id: 14, nombre: "Alonso"},
    {id: 16, nombre: "Lecrerc"},
    {id: 55, nombre: "Sainz"},
    {id: 44, nombre: "Hamilton"}
  ];

  private _clasificacion: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.clasificacion);
  public readonly clasificacion$: Observable<Piloto[]>=this._clasificacion.asObservable();

  private _sprint: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.sprint);
  public readonly sprint$: Observable<Piloto[]>=this._sprint.asObservable();

  private _carrera: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>(this.carrera);
  public readonly carrera$: Observable<Piloto[]>=this._carrera.asObservable();

  constructor() { }

  public updateClasificacion(array: Array<Piloto>): void {
    this.clasificacion=array;
    this._clasificacion.next(this.clasificacion);
  };

  public updateSprint(array: Array<Piloto>): void {

    this._sprint.next(array);
  };

  public updateCarrera(array: Array<Piloto>): void {
    this._carrera.next(array);
  };

}
