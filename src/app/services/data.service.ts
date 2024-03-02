import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from "../interfaces/piloto";
import {Apuesta} from "../interfaces/apuesta";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private _pilotos: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>([]);
  public readonly pilotos$: Observable<Piloto[]>=this._pilotos.asObservable();

  private _apuesta: BehaviorSubject<Apuesta|null>=new BehaviorSubject<Apuesta|null>(null);
  public readonly apuesta$: Observable<Apuesta|null>=this._apuesta.asObservable();

  constructor() { }

  updateApuesta(apuesta: Apuesta): void {
    this._apuesta.next(apuesta);
  };

  updatePilotos(pilotos: Piloto[]): void {
    this._pilotos.next(pilotos);
  };
}
