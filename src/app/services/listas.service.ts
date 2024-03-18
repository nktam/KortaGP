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
  respuesta: any;
  pilotos: Piloto[]=[];
  private _pagina: string='';


  constructor(private cs: ConsultasService) {
    this.cs.leeArchivo('pilotos.json').then((respuesta) => {
      this.listas=this.updateListas(JSON.parse(respuesta));
    })
      .catch(e => {
        this.cs.getPilotos().subscribe((res) => {
          this.respuesta=res;
          let listaDesdeApiRest=this.respuesta.MRData.DriverTable.Drivers;
          this.pilotos=this.cs.arrayToPilotos(listaDesdeApiRest);
          this.cs.guardaArchivo('pilotos.json', this.pilotos);
          this.listas=this.updateListas(this.pilotos);
        });
      });
  }

  private _listas: BehaviorSubject<Listas>=new BehaviorSubject<Listas>(this.listas);
  public readonly listas$: Observable<Listas>=this._listas.asObservable();

  public get pagina(): string {
    return this._pagina;
  }

  public set pagina(value: string) {
    this._pagina=value;
  }

  private updateListas(array: Piloto[]): Listas {
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
