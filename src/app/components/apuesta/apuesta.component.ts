import {Component} from '@angular/core';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import {Clipboard} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ConsultasService} from "../../services/consultas.service";
import {FirestoreService} from "../../services/firestore.service";
import {TitleCasePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';


@Component({
  selector: 'app-apuesta',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, TitleCasePipe],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})
export class ApuestaComponent {

  apuesta: any;
  apuestaEnPantalla: string="";
  race: Race={} as Race;
  private apuestaSubscription: Subscription|undefined;


  constructor(
    private apuestaService: ApuestaService,
    private clipboard: Clipboard,
    private cs: ConsultasService,
    private firestore: FirestoreService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.race=this.cs.race;
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.modificarApuestaEnPantalla(this.apuesta);
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

  private modificarApuestaEnPantalla(apuesta: Apuesta) {
    let parte1=`
Gran Premio ${this.race.round}
${this.race.nombre} 

Clasificación
1- ${apuesta.clasificacion[0].nombre} 
2- ${apuesta.clasificacion[1].nombre} 
3- ${apuesta.clasificacion[2].nombre}
4- ${apuesta.clasificacion[3].nombre}`

    let parte2=`

Sprint
1- ${apuesta.sprint[0].nombre}  
2- ${apuesta.sprint[1].nombre} 
3- ${apuesta.sprint[2].nombre}
4- ${apuesta.sprint[3].nombre}`

    let parte3=`

Carrera
1- ${apuesta.carrera[0].nombre}
2- ${apuesta.carrera[1].nombre}
3- ${apuesta.carrera[2].nombre} 
4- ${apuesta.carrera[3].nombre}
     
Alonso ${apuesta.posAlonso} 
     
Sainz ${apuesta.posSainz} 
     
Equipo ${apuesta.equipo.nombre}`

    if(this.apuesta.tieneSprint) {
      this.apuestaEnPantalla=`${parte1}${parte2}${parte3}`
    } else {
      this.apuestaEnPantalla=`${parte1}${parte3}`
    }
  }

  async guardar() {
    this.cs.guardaArchivo('apuesta.json', this.apuesta);
  }

  async copiar() {
    const usuario=await this.auth.getCurrentUser();
    this.apuestaService.updateUsuario(usuario.idUsuario, usuario.nombre);
    this.apuestaService.updateFecha();
    this.firestore.addApuesta(this.apuesta);
    this.clipboard.copy(this.apuestaEnPantalla);
  }

}
