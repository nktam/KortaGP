import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {AuthService} from '../../services/auth.service';
import {FirestoreService} from '../../services/firestore.service';
import {Apuesta} from "../../interfaces/apuesta";
import {Puntos} from '../../interfaces/puntos';
import {Clasificación} from '../../interfaces/clasificacion';

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
  round: number=5;
  clasificacion: Clasificación={round: this.round, puntos: [] as Puntos[]};

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

    this.apuestas.forEach((apuesta: Apuesta) => {
      this.calcularPuntos(apuesta);
    });

    console.log('clasificacion', this.clasificacion);
    this.clasificacion.puntos.sort((a, b) => b.puntosGeneral-a.puntosGeneral);
    console.log('clasificacion', this.clasificacion);
    //this.firestore.addClasificacion(this.clasificacion);
  }

  calcularPuntos(apuesta: Apuesta): void {
    let puntos: Puntos={
      puntosCarrera: 0,
      puntosGeneral: 0,
      puntoJornada: 0,
      puntosParrilla: 0,
      puntosAlonso: 0,
      puntosSainz: 0,
      puntosSprint: 0,
      apuesta: apuesta,
      usuario: apuesta.usuario
    };
    console.log('apuesta', apuesta);

    let puntosJornada=0;
    ////////////CARRERA////////////////
    let puntosCarrera=0;
    apuesta.carrera.forEach((apuesta: any) => {
      this.resultados.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].carrera.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosCarrera+=+data.points;
        }
      });
    });
    console.log('puntos carrera', puntosCarrera);

    ////////////PARRILLA////////////////
    let puntosParrilla=0;
    apuesta.parrilla.forEach((apuesta: any) => {
      this.resultados.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].parrilla.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        //console.log('piloto '+apuestaPiloto+' POS: '+pos);
        //console.log('driver '+data.Driver.permanentNumber+' POS grid: '+data.grid);
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosParrilla+=Math.round(20/data.grid);
        }
      });
    });
    console.log('puntos parrilla', puntosParrilla);

    ////////////SPRINT////////////////
    let puntosSprint=0;
    apuesta.sprint.forEach((apuesta: any) => {
      this.resultadosSprint.forEach((data: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].sprint.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        if(apuestaPiloto==data.Driver.permanentNumber) {
          puntosSprint+=+data.points;
        }
      });
    });
    console.log('puntos sprint', puntosSprint);

    ////////////ALONSO////////////////
    let puntosAlonso=0;
    const posAlonso=apuesta.posAlonso;
    const resAlonso=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='14')[0].position;
    if(posAlonso==resAlonso) {
      puntosAlonso+=10;
    }
    console.log('puntos alonso', puntosAlonso);

    ////////////SAINZ////////////////
    let puntosSainz=0;
    const posSainz=apuesta.posSainz;
    const resSainz=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='55')[0].position;
    if(posSainz==resSainz) {
      puntosSainz+=10;
    }
    console.log('puntos sainz', puntosSainz);

    puntos.puntosCarrera=puntosCarrera;
    puntos.puntosParrilla=puntosParrilla;
    puntos.puntosSprint=puntosSprint;
    puntos.puntosAlonso=puntosAlonso;
    puntos.puntosSainz=puntosSainz;
    puntos.puntosGeneral=Math.floor(Math.random()*10);
    puntos.puntoJornada=puntosCarrera+puntosParrilla+puntosSprint+puntosAlonso+puntosSainz;
    console.log('puntos totales', puntosJornada);

    this.clasificacion.puntos.push(puntos);

  }




}
