import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piloto} from '../interfaces/piloto';
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';
import {GranPremio} from '../interfaces/granPremio';
import {Equipo} from '../interfaces/equipo';
import {Apuesta} from '../interfaces/apuesta';
import apuestaInfo from '../utils/apuesta.json';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {

  constructor(private http: HttpClient) { }

  getPilotos() {
    let url="https://ergast.com/api/f1/2024/drivers.json";
    return this.http.get(url);
  }

  getGranpremios() {
    let url="https://ergast.com/api/f1/current.json";
    return this.http.get(url);
  }

  getEquipos() {
    let url="https://ergast.com/api/f1/current/constructors.json";
    return this.http.get(url);
  }

  arrayToPilotos(lista: Array<any>): Piloto[] {
    let pilotos: Piloto[]=[];
    for(let i=0; i<lista.length; i++) {
      let piloto: Piloto={id: 0, nombre: ''};
      piloto.id=lista[i].permanentNumber;
      piloto.nombre=lista[i].driverId;
      pilotos.push(piloto);
    }
    return pilotos;
  }

  arrayToGranPremio(lista: Array<any>): GranPremio[] {
    let grandesPremios: GranPremio[]=[];
    for(let i=0; i<lista.length; i++) {
      let granPremio: GranPremio={round: 0, nombre: ''};
      granPremio.round=lista[i].round;
      granPremio.nombre=lista[i].raceName;
      grandesPremios.push(granPremio);
    }
    return grandesPremios;
  }

  arrayToEquipos(lista: Array<any>): Equipo[] {
    let equipos: Equipo[]=[];
    for(let i=0; i<lista.length; i++) {
      let equipo: Equipo={id: '', nombre: ''};
      equipo.id=lista[i].constructorId;
      equipo.nombre=lista[i].name;
      equipos.push(equipo);
    }
    return equipos;
  }

  async guardaArchivo(archivo: string, array: Array<any>) {
    await Filesystem.writeFile({
      path: archivo,
      data: JSON.stringify(array),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };

  async guardaApuesta(apuesta: Apuesta) {
    console.log('guardamos apuesta en el dispositivo');
    await Filesystem.writeFile({
      path: 'apuesta.json',
      data: JSON.stringify(apuesta),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };

  async leeArchivo(archivo: string): Promise<string> {
    const contents=await Filesystem.readFile({
      path: archivo,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return contents.data as string;
  };

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
}
