import {Component} from '@angular/core';
import {ConsultasService} from '../../services/consultas.service';
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
  usuario: string='';
  race: Race={} as Race;

  constructor(private cs: ConsultasService, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.race=this.cs.race;
    this.usuario=(await this.auth.getCurrentUser()).nombre;
  }

}
