import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../../interfaces/apuesta";
import {AuthService} from '../../services/auth.service';


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

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

  async usuario() {
    //console.log(await this.auth.getCurrentUser());
  }



}
