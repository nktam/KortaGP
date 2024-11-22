import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MenuComponent} from "./components/menu/menu.component";
import {ConsultasService} from './services/consultas.service';
import {ListasService} from './services/listas.service';
import {ApuestaService} from './services/apuesta.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';
  apuesta: any;

  constructor(
    private cs: ConsultasService,
    private listasService: ListasService,
    private apuestaService: ApuestaService) { }

  async ngOnInit(): Promise<void> {
    await this.cs.cargaPilotos();
    await this.cs.cargaRaces();
    await this.cs.cargaEquipos();
    this.apuesta=await this.cs.consultaApuestaGuardada();
    this.apuestaService.updateApuesta(this.apuesta);
    this.listasService.updateListasConApuesta(this.apuesta, this.cs.pilotos);
  }
}
