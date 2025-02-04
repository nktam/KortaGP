import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {AuthService} from '../../services/auth.service';
import {FirestoreService} from '../../services/firestore.service';
import {ApuestaService} from '../../services/apuesta.service';

@Component({
  selector: 'app-puntos',
  standalone: true,
  imports: [],
  templateUrl: './puntos.component.html',
  styleUrl: './puntos.component.css'
})
export class PuntosComponent {

  resultados: any[]=[];
  resultadosSprint: any[]=[];
  apuestas: any[]=[];
  puntos: any;
  round: number=5;

  constructor(
    private cs: ConsultasService,
    private firestore: FirestoreService,
    private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.apuestas=await this.firestore.getApuestas(this.round);
    console.log('apuestas: ', this.apuestas);

    this.resultados=await this.cs.getResultados(this.round);
    console.log('resultados:', this.resultados);

    this.resultadosSprint=await this.cs.getResultadosSprint(this.round);
    console.log('resultados Sprint:', this.resultadosSprint);

    this.apuestas.forEach((data: any) => {
      this.calcularPuntos(data.idUsuario);
    });

  }

  calcularPuntos(idUsuario: string): void {
    let puntos=0;
    const apuestaUsuario=this.apuestas.filter((e: any) => e.idUsuario==idUsuario)[0];
    ////////////CARRERA////////////////
    let puntosCarrera=0;
    apuestaUsuario.carrera.forEach((apuesta: any) => {
      this.resultados.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].carrera.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosCarrera+=+data.points;
        }
      });
    });
    console.log('puntos carrera', puntosCarrera);

    ////////////CLASIFICACION////////////////
    let puntosClasificacion=0;
    apuestaUsuario.clasificacion.forEach((apuesta: any) => {
      this.resultados.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].clasificacion.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        //console.log('piloto '+apuestaPiloto+' POS: '+pos);
        //console.log('driver '+data.Driver.permanentNumber+' POS grid: '+data.grid);
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosClasificacion+=Math.round(20/data.grid);
        }
      });
    });
    console.log('puntos clasificación', puntosClasificacion);

    ////////////SPRINT////////////////
    let puntosSprint=0;
    apuestaUsuario.clasificacion.forEach((apuesta: any) => {
      this.resultadosSprint.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].clasificacion.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosSprint+=+data.points;
        }
      });
    });
    console.log('puntos sprint', puntosSprint);

    ////////////ALONSO////////////////
    let puntosAlonso=0;
    const posAlonso=apuestaUsuario.posAlonso;
    const resAlonso=+this.resultados.filter((e: any) => e.Driver.permanentNumber==14)[0].position;
    if(posAlonso==resAlonso) {
      puntosAlonso+=10;
    }
    console.log('puntos alonso', puntosAlonso);

    ////////////SAINZ////////////////
    let puntosSainz=0;
    const posSainz=apuestaUsuario.posSainz;
    const resSainz=+this.resultados.filter((e: any) => e.Driver.permanentNumber==55)[0].position;
    if(posSainz==resSainz) {
      puntosSainz+=10;
    }
    console.log('puntos sainz', puntosSainz);

    puntos=puntosCarrera+puntosClasificacion+puntosSprint+puntosAlonso+puntosSainz;
    console.log('puntos totales', puntos);

  }


}
