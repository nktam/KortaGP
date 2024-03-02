import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piloto} from "../interfaces/piloto";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _pilotos: BehaviorSubject<Piloto[]>=new BehaviorSubject<Piloto[]>([]);
  public readonly pilotos$: Observable<Piloto[]>=this._pilotos.asObservable();

  constructor() { }
}
