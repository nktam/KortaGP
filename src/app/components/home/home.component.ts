import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import {AuthService} from '../../services/auth.service';
import {Race} from '../../interfaces/race';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  apuesta: any;
  private apuestaSubscription: Subscription|undefined;
  usuario: string='';

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
    this.usuario=(await this.auth.getCurrentUser()).nombre;
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }


}
