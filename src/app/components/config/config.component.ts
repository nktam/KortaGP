import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {ApuestaService} from "../../services/apuesta.service";
import {FormsModule, } from '@angular/forms';
import {Apuesta} from '../../interfaces/apuesta';
import apuestaInfo from '../../utils/apuesta.json';
import {ConsultasService} from '../../services/consultas.service';
import {Equipo} from '../../interfaces/equipo';
import {GranPremio} from '../../interfaces/granPremio';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  apuesta: Apuesta=apuestaInfo;
  private apuestaSubscription: Subscription|undefined;
  listaEquipos: Equipo[]=[];
  listaGrandesPremios: GranPremio[]=[];

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService) {

    this.apuesta=this.cs.consultaApuestaGuardada();

    this.cs.leeArchivo('equipos.json').then((respuesta) => {
      console.log('leeemos archivo equipos')
      this.listaEquipos=JSON.parse(respuesta);
    })
      .catch(e => {
        this.cs.getEquipos().subscribe((res) => {
          let respuesta: any;
          respuesta=res;
          let listaDesdeApiRest=respuesta.MRData.ConstructorTable.Constructors;
          this.listaEquipos=this.cs.arrayToEquipos(listaDesdeApiRest);
          this.cs.guardaArchivo('equipos.json', this.listaEquipos);
        });
      });

    this.cs.leeArchivo('grandespremios.json').then((respuesta) => {
      console.log('leeemos archivo grandespremios')
      this.listaGrandesPremios=JSON.parse(respuesta);
    })
      .catch(e => {
        this.cs.getGranpremios().subscribe((res) => {
          console.log('error leer arcivo grandespremios')
          let respuesta: any;
          respuesta=res;
          let listaDesdeApiRest=respuesta.MRData.RaceTable.Races;
          this.listaGrandesPremios=this.cs.arrayToGranPremio(listaDesdeApiRest);
          this.cs.guardaArchivo('grandespremios.json', this.listaGrandesPremios);
        });
      });
  }


  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
  }

  comparaEquipo(o1: Equipo, o2: Equipo) {
    return o1.id==o2.id;
  }
  comparaGranPremio(o1: GranPremio, o2: GranPremio) {
    return o1.id==o2.id;
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

}
