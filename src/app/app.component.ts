import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MenuComponent} from "./components/menu/menu.component";
import {Equipo} from './interfaces/equipo';
import {ConsultasService} from './services/consultas.service';
import {AuthService} from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';

  constructor(private cs: ConsultasService, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.cs.checkEquipos();
    await this.cs.checkRaces();
    await this.cs.checkPilotos();
    this.cs.getRound();
  }

}
