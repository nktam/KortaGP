import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';
import {FirestoreService} from '../../services/firestore.service';
import {Clasificación} from '../../interfaces/clasificacion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nombre: string='';
  race: Race={} as Race;
  clasificacion: Clasificación[]=[];

  constructor(private cs: ConsultasService, private auth: AuthService, private firestore: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    this.race=this.cs.race;
    this.nombre=(await this.auth.getCurrentUser()).nombre;
    this.clasificacion=await this.firestore.getClasificacion();
    console.log('clasificacion:', this.clasificacion);
  }

  ngAfterViewChecked(): void {
    this.cerrar();
  }

  private cerrar(): void {
    const elements=Array.from(document.getElementsByClassName('cerrar'));
    console.log('elements:', elements);

    elements.forEach((e: any) => {
      e.style.display='none';
    }
    );
  }

  public toggleDiv(div: string): void {
    const divElement=document.getElementById(div);
    if(divElement) {
      if(divElement.style.display==='none') {
        divElement.style.display='block';
      } else {
        divElement.style.display='none';
      }
    }
  }

}
