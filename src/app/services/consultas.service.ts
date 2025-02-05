import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piloto} from '../interfaces/piloto';
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';
import {Race} from '../interfaces/race';
import {Equipo} from '../interfaces/equipo';
import {Apuesta} from '../interfaces/apuesta';
import apuestaInfo from '../utils/apuesta.json';
import {ListasService} from './listas.service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {
  jsonEquipos: string='equipos.json';
  jsonRaces: string='races.json';
  jsonPilotos: string='pilotos.json';

  private _equipos: Equipo[]=[];
  private _races: Race[]=[];
  private _pilotos: Piloto[]=[];
  private _race: any={};

  constructor(private http: HttpClient, private listasService: ListasService) { }

  public get equipos(): Equipo[] {
    return this._equipos;
  }
  public set equipos(value: Equipo[]) {
    this._equipos=value;
  }
  public get races(): Race[] {
    return this._races;
  }
  public set races(value: Race[]) {
    this._races=value;
  }
  public get pilotos(): Piloto[] {
    return this._pilotos;
  }
  public set pilotos(value: Piloto[]) {
    this._pilotos=value;
  }
  public get race(): Race {
    return this._race;
  }

  public async consultaApuestaGuardada(): Promise<Apuesta> {
    try {
      const apuestGuardada: Apuesta=await this.leeArchivo('apuesta.json') as unknown as Apuesta;
      if(apuestGuardada===undefined) {
        throw Error();
      }
      else {
        return apuestGuardada;
      }
    } catch(error) {
      return apuestaInfo; //Devolvemos apuesta inicial
    }
  }

  public async cargaRaces(): Promise<void> {
    try {
      if(await this.archivoCaducado(this.jsonRaces)) {throw Error()};
      await this.getRacesDesdeFichero();
    } catch(error) {
      await this.getRacesDesdeApi();
    }

  }

  public async cargaEquipos(): Promise<void> {
    try {
      if(await this.archivoCaducado(this.jsonEquipos)) {throw Error()};
      await this.getEquiposDesdeFichero();
    } catch(error) {
      this.getEquiposDesdeApi();
    }
  }

  public async cargaPilotos(): Promise<void> {
    try {
      if(await this.archivoCaducado(this.jsonPilotos, 3)) {throw Error()};
      await this.getPilotosDesdeFichero();
    } catch(error) {
      this.getPilotosDesdeApi();
    }
  }

  private getRound(): void {
    const hoy: number=Date.now();
    for(let i=0; i<this._races.length; i++) {
      if(i==0&&hoy<this._races[i].finApuesta) {
        this._race=this._races[i];
        break;
      } else if(i>0&&hoy<this._races[i].finApuesta&&hoy>this._races[i-1].finRace) {
        this._race=this._races[i];
        break;
      } else if(i==23&&hoy<this._races[i].finRace) {
        this._race=this._races[23];
      }
    }
    console.log('...Round: '+this._race.round);
  }

  private getPilotosDesdeApi(): void {
    console.log('...consultamos pilotos desde API');
    const url="https://api.jolpi.ca/ergast/f1/2024/drivers.json";
    this.http.get(url).subscribe((res: any) => {
      let listaDesdeApiRest=res.MRData.DriverTable.Drivers;
      this._pilotos=this.arrayToPilotos(listaDesdeApiRest);
      this.guardaArchivo(this.jsonPilotos, this._pilotos);
      this.listasService.updateListas(this._pilotos);
    })
  }

  private async getPilotosDesdeFichero(): Promise<void> {
    this._pilotos=await this.leeArchivo(this.jsonPilotos);
    this.listasService.updateListas(this._pilotos);
  }

  private getRacesDesdeApi(): void {
    console.log('...consultamos races desde API');
    const url="https://api.jolpi.ca/ergast/f1/current.json";
    this.http.get(url).subscribe((res: any) => {
      const listaDesdeApiRest=res.MRData.RaceTable.Races;
      this._races=this.arrayToRaces(listaDesdeApiRest);
      this.guardaArchivo(this.jsonRaces, this._races);
      this.getRound();
    })
  }

  private getEquiposDesdeApi(): void {
    console.log('...consultamos equipos desde API');
    const url="https://api.jolpi.ca/ergast/f1/current/constructors.json";
    this.http.get(url).subscribe((res: any) => {
      const listaDesdeApiRest=res.MRData.ConstructorTable.Constructors;
      this._equipos=this.arrayToEquipos(listaDesdeApiRest);
      this.guardaArchivo(this.jsonEquipos, this._equipos);
    });
  }

  public async getResultados(round: number): Promise<any[]> {
    console.log('...consultamos resultados desde API');
    /////////////// url para pruebas
    const url="https://api.jolpi.ca/ergast/f1/2024/"+round+"/results/";
    const response=await lastValueFrom(this.http.get<any>(url));
    const resultados=response.MRData.RaceTable.Races[0].Results;
    return resultados;
  }

  public async getResultadosSprint(round: number): Promise<any[]> {
    console.log('...consultamos resultados desde API');
    /////////////// url para pruebas
    const url="https://api.jolpi.ca/ergast/f1/2024/"+round+"/sprint/";
    const response=await lastValueFrom(this.http.get<any>(url));
    const resultados=response.MRData.RaceTable.Races[0].SprintResults;
    return resultados;
  }

  private async getRacesDesdeFichero(): Promise<void> {
    this._races=await this.leeArchivo(this.jsonRaces);
    this.getRound();
  }

  private async getEquiposDesdeFichero(): Promise<void> {
    this._equipos=await this.leeArchivo(this.jsonEquipos);
  }

  private arrayToPilotos(lista: Array<any>): Piloto[] {
    let pilotos: Piloto[]=[];
    for(let i=0; i<lista.length; i++) {
      let piloto: Piloto={
        id: lista[i].permanentNumber,
        nombre: lista[i].driverId
      };
      pilotos.push(piloto);
    }
    return pilotos;
  }

  private arrayToRaces(lista: Array<any>): Race[] {
    let races: Race[]=[];
    for(let i=0; i<lista.length; i++) {
      const finRace=this.finRace(lista[i].date, lista[i].time);
      const finApuesta=this.finapuesta(lista[i].Qualifying.date, lista[i].Qualifying.time, lista[i].date);
      console.log('finRace: '+finRace+' finApuesta: '+finApuesta);

      const race: Race={
        round: lista[i].round,
        nombre: lista[i].raceName,
        circuito: lista[i].Circuit.circuitName,
        pais: lista[i].Circuit.Location.country,
        finApuesta: finApuesta,
        finRace: finRace,
        sprint: lista[i].hasOwnProperty('SprintQualifying')
      };
      races.push(race);
    }
    console.log(races);
    return races;
  }

  private finRace(date: string, time: string): number {
    if(time==null)
      return this.dateToEpoch(date)+86400000
    else
      return this.dateToEpoch(date+' '+time)+21600000
  }

  private finapuesta(date: string, time: string, raceDate: string): number {
    if(date==null||time==null)
      return this.dateToEpoch(raceDate)
    else
      return this.dateToEpoch(date+' '+time)
  }

  private arrayToEquipos(lista: Array<any>): Equipo[] {
    let equipos: Equipo[]=[];
    for(let i=0; i<lista.length; i++) {
      const equipo: Equipo={
        id: lista[i].constructorId,
        nombre: lista[i].name
      };
      equipos.push(equipo);
    }
    return equipos;
  }

  public async guardaArchivo(archivo: string, array: Array<any>) {
    console.log('...guardamos '+archivo+' en dispositivo');
    await Filesystem.writeFile({
      path: archivo,
      data: JSON.stringify(array),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };

  private async leeArchivo(archivo: string): Promise<Array<any>> {
    console.log('...leemos '+archivo+' de dispositivo');
    const contents=await Filesystem.readFile({
      path: archivo,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(contents.data as string);
  };

  //comprobamos si el archivo esta caducado, 1mes=2629743000mSeg
  private async archivoCaducado(archivo: string, meses: number=1): Promise<boolean> {
    const contents=await Filesystem.stat({
      path: archivo,
      directory: Directory.Data
    });
    return contents.mtime<Date.now()-2629743000*meses;
  }

  private dateToEpoch(fecha: string): number {
    const date=new Date(fecha);
    return date.getTime();

  }
}
