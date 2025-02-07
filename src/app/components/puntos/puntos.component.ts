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
  clasificacion: Clasificación={round: this.round, puntosUsuarios: [] as Puntos[]};

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
    console.log('sprint:', this.resultadosSprint);

    this.apuestas.forEach((apuesta: Apuesta) => {
      this.calcularPuntos(apuesta);
    });

    this.clasificacion.puntosUsuarios.sort((a, b) => b.puntosGeneral-a.puntosGeneral);
    console.log('clasificacion', this.clasificacion);
    this.firestore.addClasificacion(this.clasificacion);
  }

  calcularPuntos(apuesta: Apuesta): void {
    let puntosAntes=apuesta.puntosAntes;

    let puntos: Puntos={
      puntosCarrera: 0,
      puntosGeneral: 0,
      puntosJornada: 0,
      puntosParrilla: 0,
      puntosAlonso: 0,
      puntosSainz: 0,
      puntosSprint: 0,
      apuesta: apuesta,
      usuario: apuesta.usuario
    };

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

    ////////////ALONSO////////////////
    let puntosAlonso=0;
    const posAlonso=apuesta.posAlonso;
    const resAlonso=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='14')[0].position;
    if(posAlonso==resAlonso) {
      puntosAlonso+=10;
    }

    ////////////SAINZ////////////////
    let puntosSainz=0;
    const posSainz=apuesta.posSainz;
    const resSainz=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='55')[0].position;
    if(posSainz==resSainz) {
      puntosSainz+=10;
    }

    puntos.puntosCarrera=puntosCarrera;
    puntos.puntosParrilla=puntosParrilla;
    puntos.puntosSprint=puntosSprint;
    puntos.puntosAlonso=puntosAlonso;
    puntos.puntosSainz=puntosSainz;
    puntos.puntosJornada=puntosCarrera+puntosParrilla+puntosSprint+puntosAlonso+puntosSainz;
    puntos.puntosGeneral=puntosAntes+puntos.puntosJornada;

    this.clasificacion.puntosUsuarios.push(puntos);
  }




}
