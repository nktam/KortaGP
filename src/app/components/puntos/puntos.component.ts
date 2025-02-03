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
  apuestas: any[]=[];
  puntos: any;
  round: number=0;

  constructor(
    private cs: ConsultasService,
    private firestore: FirestoreService,
    private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.apuestas=await this.firestore.getApuestas('1');
    console.log('apuestas: ', this.apuestas);
    console.log('apuestas lenght', this.apuestas.length);

    this.resultados=await this.cs.getResultados();
    console.log('resultados:', this.resultados);
    console.log('resultados lenght:', this.resultados.length);

    this.calcularPuntos();
  }

  calcularPuntos(): void {
    let puntos=0;
    this.apuestas[0].carrera.forEach((apuesta: any) => {
      this.resultados.forEach((resultado: any) => {
        console.log('driver apuesta', apuesta.id);
        console.log('driver resultados', resultado.Driver.permanentNumber);
        console.log('posicions', resultado.position);
        if(apuesta.id==resultado.Driver.permanentNumber as number) {

          switch(resultado.position) {
            case 0:
              puntos+=25;
              break;
            case 1:
              puntos+=18;
              break;
            case 2:
              puntos+=16;
              break;
            case 3:
              puntos+=12;
              break;
            case 4:
              puntos+=10;
              break;
            case 5:
              puntos+=8;
              break;
            case 6:
              puntos+=6;
              break;
            case 7:
              puntos+=4;
              break;
            case 8:
              puntos+=2;
              break;
            case 9:
              puntos+=1;
              break;
            default:
              puntos+=0;
              break;
          }
        }


      });
    });
    console.log('puntos', puntos);
  }





}
