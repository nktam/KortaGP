import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from "@angular/common/http";
import {Piloto} from './interfaces/piloto';
import {ListasService} from './services/listas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';
  respuesta: any;
  pilotos: Piloto[]=[];

  constructor(private router: Router, private listas: ListasService) { }

  async ngOnInit(): Promise<void> {
  }

  cargaClasificacion(): void {
    this.listas.pagina='Clasificación';
    this.router.navigate(['/lista']);
  }
  cargaSprint(): void {
    this.listas.pagina='Sprint';
    this.router.navigate(['/lista']);
  }
  cargaCarrera(): void {
    this.listas.pagina='Carrera';
    this.router.navigate(['/lista']);
  }

  mostrarApuesta(): void {
    this.router.navigate(['/apuesta']);
  }

  mostrarConfi(): void {
    this.router.navigate(['/config']);
  }

}
