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
  private apuestaSubscription: Subscription|undefined;


  constructor(private apuestaService: ApuestaService, private clipboard: Clipboard, private cs: ConsultasService, private fs: FirestoreService) {
  }

  ngOnInit(): void {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.modificarApuestaEnPantalla(this.apuesta);
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }


  private modificarApuestaEnPantalla(apuesta: Apuesta) {
    let parte1=`
Clasi
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

  guardar() {
    this.cs.guardaApuesta(this.apuesta);
  }

  copiar() {
    this.fs.addApuesta(this.apuesta);
    this.clipboard.copy(this.apuestaEnPantalla);
  }

}
