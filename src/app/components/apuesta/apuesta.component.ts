import {Component} from '@angular/core';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import apuestaInfo from '../../utils/apuesta.json';

@Component({
  selector: 'app-apuesta',
  standalone: true,
  imports: [],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})
export class ApuestaComponent {

  apuesta: Apuesta=apuestaInfo;
  muestraEnPantalla: string="";
  private apuestaSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.modificarApuestaEnPantalla(this.apuesta);
  }

  ngOndestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

  private modificarApuestaEnPantalla(apuesta: Apuesta) {
    this.muestraEnPantalla=`
    Clasi</br>
    1- ${apuesta.clasificacion[1].nombre}</br>
    2- ${apuesta.clasificacion[2].nombre}</br>
    3- ${apuesta.clasificacion[3].nombre}</br>
    </br>
    Carrera</br>
    1- ${apuesta.carrera[1].nombre}</br>
    2- ${apuesta.carrera[2].nombre}</br>
    3- ${apuesta.carrera[3].nombre}</br>
    </br>
    Alonso ${apuesta.posAlonso}</br>
    </br>
    Sainz ${apuesta.posSainz}</br>
    </br>
    Equipo ${apuesta.equipo}</br>`;
  }

}
