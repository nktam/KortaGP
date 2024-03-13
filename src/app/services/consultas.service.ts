import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Piloto} from '../interfaces/piloto';
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})

export class ConsultasService {

  constructor(private http: HttpClient) { }

  getPilotos() {
    let url="http://ergast.com/api/f1/2024/drivers.json";
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

  async guardaArchivo(pilotos: Piloto[]) {
    await Filesystem.writeFile({
      path: 'pilotos.json',
      data: JSON.stringify(pilotos),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  };

  async leeArchivo(): Promise<string> {
    const contents=await Filesystem.readFile({
      path: 'pilotos.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return contents.data as string;
  };


}
