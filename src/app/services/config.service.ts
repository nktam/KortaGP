import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  granpremio: number=1;
  sprint: boolean=false;

  private _granpremio: BehaviorSubject<number>=new BehaviorSubject<number>(this.granpremio);
  public readonly granpremio$: Observable<number>=this._granpremio.asObservable();

  private _sprint: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(this.sprint);
  public readonly sprint$: Observable<boolean>=this._sprint.asObservable();

  constructor() { }

  updateGranpremio(granpremio: number): void {
    this._granpremio.next(granpremio);
  };

  updateSprint(sprint: boolean): void {
    this._sprint.next(sprint);
  };
}
