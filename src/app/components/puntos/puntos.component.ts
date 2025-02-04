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

    this.resultados=await this.cs.getResultados();
    console.log('resultados:', this.resultados);

    this.calcularPuntos();
  }

  calcularPuntos(): void {
    let puntos=0;
    this.apuestas[0].carrera.forEach((apuesta: any) => {
      this.resultados.forEach((resultado: any) => {
        const apuestaPiloto=apuesta.id;
        const pos=this.apuestas[0].carrera.map((e: any) => e.id).indexOf(apuestaPiloto)+1;
        console.log('piloto '+apuestaPiloto+' POS: '+pos);
        console.log('driver '+resultado.Driver.permanentNumber+' POS: '+resultado.position);

        if(apuestaPiloto==resultado.Driver.permanentNumber) {
          const num=+resultado.position;
          console.log('iguales', num);
          puntos+=+resultado.points;
        }
        console.log('puntos', puntos);

      });
    });

  }





}
