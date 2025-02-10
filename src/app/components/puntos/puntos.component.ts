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
  clasificacion: Clasificación[]=[];

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

    this.clasificacion=await this.firestore.getClasificacion();

    this.apuestas.forEach((apuesta: Apuesta) => {
      const clasificacionUsuario=this.clasificacion.filter((e: any) => e.usuario.id==apuesta.usuario.id)[0];
      this.calcularPuntos(apuesta, clasificacionUsuario);
    });

  }

  calcularPuntos(apuesta: Apuesta, clasificacionUsuario: Clasificación): void {
    if(!clasificacionUsuario) {
      clasificacionUsuario={
        usuario: apuesta.usuario,
        puntos: 0,
        lastRound: 0,
        jornadas: []
      }
    }
    if(clasificacionUsuario.lastRound<this.round) {
      let puntosAntes=clasificacionUsuario.puntos;

      let puntos: Puntos={
        puntosCarrera: this.puntosCarrera(apuesta, this.resultados),
        puntosParrilla: this.puntosParrilla(apuesta),
        puntosAlonso: this.puntosAlonso(apuesta),
        puntosSainz: this.puntosSainz(apuesta),
        puntosSprint: this.puntosSprint(apuesta),
        puntosJornada: 0,
        apuesta: apuesta,
        round: this.round
      };
      puntos.puntosJornada=puntos.puntosCarrera+puntos.puntosParrilla+(puntos.puntosSprint||0)+puntos.puntosAlonso+puntos.puntosSainz;
      clasificacionUsuario.lastRound=this.round;
      clasificacionUsuario.puntos=puntosAntes+puntos.puntosJornada;
      clasificacionUsuario.jornadas.push(puntos);
      console.log('clasificacion', clasificacionUsuario);
      this.firestore.addClasificacion(clasificacionUsuario);
    }

  }

  private puntosCarrera(apuesta: Apuesta, resultados: any): number {
    let puntosCarrera=0;
    apuesta.carrera.forEach((piloto: any) => {
      resultados.forEach((res: any) => {
        const apuestaPiloto=piloto.id;
        if(apuestaPiloto==res.Driver.permanentNumber) {
          puntosCarrera+=+res.points;
          const pos=apuesta.carrera.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
          if(pos==res.position) {
            puntosCarrera+=+res.points;
          }
        }
      });
    });
    return puntosCarrera;
  }

  private puntosParrilla(apuesta: Apuesta): number {
    let puntosParrilla=0;
    apuesta.parrilla.forEach((piloto: any) => {
      this.resultados.forEach((res: any) => {
        const apuestaPiloto=piloto.id;
        if(apuestaPiloto==res.Driver.permanentNumber) {
          puntosParrilla+=Math.round(20/res.grid);
        }
      });
    });
    return puntosParrilla;
  }

  private puntosSprint(apuesta: Apuesta): number {
    let puntosSprint=0;
    apuesta.sprint.forEach((piloto: any) => {
      this.resultadosSprint.forEach((res: any) => {
        const apuestaPiloto=piloto.id;
        if(apuestaPiloto==res.Driver.permanentNumber) {
          puntosSprint+=+res.points;
        }
      });
    });
    return puntosSprint;
  }

  private puntosAlonso(apuesta: Apuesta): number {
    const posAlonso=apuesta.posAlonso;
    const resAlonso=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='14')[0].position;
    if(posAlonso==resAlonso) return 10;
    else return 0;
  }

  private puntosSainz(apuesta: Apuesta): number {
    const posSainz=apuesta.posSainz;
    const resSainz=+this.resultados.filter((e: any) => e.Driver.permanentNumber=='55')[0].position;
    if(posSainz==resSainz) return 10;
    else return 0;
  }


}
