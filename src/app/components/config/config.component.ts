import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {ApuestaService} from "../../services/apuesta.service";
import {FormsModule, } from '@angular/forms';
import {ConsultasService} from '../../services/consultas.service';
import {Equipo} from '../../interfaces/equipo';
import {Race} from '../../interfaces/race';


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  apuesta: any;
  private apuestaSubscription: Subscription|undefined;
  listaEquipos: Equipo[]=[];
  listaRaces: Race[]=[];

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService) {
    const equiposJson: string='equipos.json';
    const racesJson: string='races.json';

    // consultamos archivo equipos si no existe consultamos la API
    this.cs.leeArchivo(equiposJson)
      .then((respuesta) => {
        this.listaEquipos=JSON.parse(respuesta);
      })
      .catch(e => {
        this.cs.getEquipos().subscribe((res: any) => {
          const listaDesdeApiRest=res.MRData.ConstructorTable.Constructors;
          this.listaEquipos=this.cs.arrayToEquipos(listaDesdeApiRest);
          this.cs.guardaArchivo(equiposJson, this.listaEquipos);
        });
      });


    this.cs.leeArchivo(racesJson)
      .then((respuesta) => {
        this.listaRaces=JSON.parse(respuesta);
      })
      .catch(e => {
        this.cs.getRaces().subscribe((res: any) => {
          const listaDesdeApiRest=res.MRData.RaceTable.Races;
          this.listaRaces=this.cs.arrayToRaces(listaDesdeApiRest);
          this.cs.guardaArchivo(racesJson, this.listaRaces);
        });
      });
  }

  ngOnInit(): void {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
  }

  comparaEquipo(o1: Equipo, o2: Equipo) {
    return o1.id==o2.id;
  }

  comparaRaces(o1: Race, o2: Race) {
    return o1.round==o2.round;
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

}
