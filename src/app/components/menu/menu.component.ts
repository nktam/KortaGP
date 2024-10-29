import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ListasService} from '../../services/listas.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router, private listas: ListasService) { };

  cargaHome(): void {
    this.router.navigate(['/home']);
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

  cargaApuesta(): void {
    this.router.navigate(['/apuesta']);
  }

  cargaConfi(): void {
    this.router.navigate(['/config']);
  }
}
