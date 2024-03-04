import {Component} from '@angular/core';
import {ApuestaService} from "../../services/apuesta.service";
import {ConfigService} from "../../services/config.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import apuestaInfo from '../../utils/apuesta.json';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-apuesta',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})
export class ApuestaComponent {

  apuesta: Apuesta=apuestaInfo;
  sprint: boolean=false;
  apuestaEnPantalla: string="";
  private apuestaSubscription: Subscription|undefined;
  private sprintSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private clipboard: Clipboard, private configService: ConfigService) { }


  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.sprintSubscription=this.configService.sprint$.subscribe(v => this.sprint=v);
    this.modificarApuestaEnPantalla(this.apuesta);
  }

  ngOndestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

  private modificarApuestaEnPantalla(apuesta: Apuesta) {
    let parte1=`
    Clasi
    1- ${apuesta.clasificacion[1].nombre} 
    2- ${apuesta.clasificacion[2].nombre} 
    3- ${apuesta.clasificacion[3].nombre}`

    let parte2=`

    Sprint
    1- ${apuesta.sprint[1].nombre} 
    2- ${apuesta.sprint[2].nombre} 
    3- ${apuesta.sprint[3].nombre}`

    let parte3=`

    Carrera
    1- ${apuesta.carrera[1].nombre}
    2-${apuesta.carrera[2].nombre}
    3-${apuesta.carrera[3].nombre} 
     
Alonso ${apuesta.posAlonso} 
     
Sainz ${apuesta.posSainz} 
     
Equipo ${apuesta.equipo}`

    if(this.sprint) {
      this.apuestaEnPantalla=`${parte1}${parte2}${parte3}`
    } else {
      this.apuestaEnPantalla=`${parte1}${parte3}`
    }

  }

  copiar() {
    this.clipboard.copy(this.apuestaEnPantalla);
  }

}
