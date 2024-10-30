import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  apuesta: any;
  private apuestaSubscription: Subscription|undefined;
  listaRaces: Race[]=[];
  usuario: string='';
  jsonFile: string='races.json';

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);

    try {
      if(await this.cs.archivoCaducado(this.jsonFile)) {throw Error('no existe')};
      this.listaRaces=JSON.parse(await this.cs.leeArchivo(this.jsonFile));
    } catch(error) {
      this.cs.getRaces().subscribe(res => this.getListaRaces(res));
    }

    this.usuario=(await this.auth.getCurrentUser()).nombre;
    this.getRound();
  }

  private getListaRaces(res: any) {
    const listaDesdeApiRest=res.MRData.RaceTable.Races;
    this.listaRaces=this.cs.arrayToRaces(listaDesdeApiRest);
    this.cs.guardaArchivo(this.jsonFile, this.listaRaces);
  }

  private getRound(): Race {
    const hoy: number=Date.now();
    let race: any={};
    for(let i=0; i<this.listaRaces.length; i++) {
      if(i==0&&hoy<this.listaRaces[i].finApuesta) {
        race=this.listaRaces[i];
      } else if(i>0&&hoy<this.listaRaces[i].finApuesta&&hoy>this.listaRaces[i-1].finRace) {
        race=this.listaRaces[i];
      }
    }
    console.log(race);
    return race;
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }


}
