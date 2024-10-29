import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piloto} from '../interfaces/piloto';
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';
import {Race} from '../interfaces/race';
import {Equipo} from '../interfaces/equipo';
import {Apuesta} from '../interfaces/apuesta';
import apuestaInfo from '../utils/apuesta.json';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {

  constructor(private http: HttpClient) { }

  getPilotos() {
    console.log('...consultamos pilotos desde API');
    const url="https://api.jolpi.ca/ergast/f1/2024/drivers.json";
    return this.http.get(url);
  }

  getRaces() {
    console.log('...consultamos races desde API');
    const url="https://api.jolpi.ca/ergast/f1/current.json";
    return this.http.get(url);
  }

  getEquipos() {
    console.log('...consultamos equipos desde API');
    const url="https://api.jolpi.ca/ergast/f1/current/constructors.json";
    return this.http.get(url);
  }

  arrayToPilotos(lista: Array<any>): Piloto[] {
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

  arrayToRaces(lista: Array<any>): Race[] {
    let races: Race[]=[];
    for(let i=0; i<lista.length; i++) {
      const race: Race={
        round: lista[i].round,
        nombre: lista[i].raceName,
        circuito: lista[i].Circuit.circuitname,
        pais: lista[i].Circuit.Location.country,
        fechaHoraFinApuesta: this.dateToEpoch(lista[i].Qualifying.date+' '+lista[i].Qualifying.time),
        fechaHoraFinRace: this.dateToEpoch(lista[i].date+' '+lista[i].time)+21600000
      };
      races.push(race);
    }
    return races;
  }

  arrayToEquipos(lista: Array<any>): Equipo[] {
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

  async guardaArchivo(archivo: string, array: Array<any>) {
    console.log('...guardamos '+archivo+' en dispositivo');
    await Filesystem.writeFile({
      path: archivo,
      data: JSON.stringify(array),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };

  async leeArchivo(archivo: string): Promise<string> {
    console.log('leemos '+archivo+' de dispositivo');
    const contents=await Filesystem.readFile({
      path: archivo,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return contents.data as string;

  };

  async archivoCaducado(archivo: string): Promise<boolean> {
    const contents=await Filesystem.stat({
      path: archivo,
      directory: Directory.Data
    });
    console.log('...fecha modificacion archivo: '+contents.mtime);
    return (contents.mtime<Date.now()-2629743000)? true:false;
    //1 mes epoch = 2629743000
  }

  async consultaApuestaGuardada(): Promise<Apuesta> {
    try {
      const apuestGuardada=JSON.parse(await this.leeArchivo('apuesta.json'));
      if(apuestGuardada===undefined) {
        throw new Error("No se puede leer");
      } else {
        return apuestGuardada;
      }
    } catch(error) {
      return apuestaInfo;
    }
  }

  private dateToEpoch(fecha: string): number {
    const date=new Date(fecha);
    return date.getTime();

  }
}
