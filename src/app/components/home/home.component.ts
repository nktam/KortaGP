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
  showDiv: boolean=false;

  constructor(private cs: ConsultasService, private auth: AuthService, private firestore: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    this.race=this.cs.race;
    this.nombre=(await this.auth.getCurrentUser()).nombre;
    this.clasificacion=await this.firestore.getClasificacion();
    console.log('clasificacion:', this.clasificacion);
  }

  public toggleDiv() {
    this.showDiv=!this.showDiv;
  }

}
