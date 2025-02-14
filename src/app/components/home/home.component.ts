import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';
import {FirestoreService} from '../../services/firestore.service';
import {Clasificación} from '../../interfaces/clasificacion';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
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
    this.clasificacion.sort((a, b) => b.puntos-a.puntos);
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
