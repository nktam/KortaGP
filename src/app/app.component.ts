import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApuestaService} from "./services/apuesta.service";
import {Subscription} from 'rxjs';
import {CarreraComponent} from './components/carrera/carrera.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarreraComponent, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';

  private estadoSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private router: Router) { }

  async ngOnInit(): Promise<void> {
  }

  cargaClasificacion(): void {
    this.router.navigate(['/clasificacion']);
  }
  cargaSprint(): void {
    this.router.navigate(['/sprint']);
  }
  cargaCarrera(): void {
    this.router.navigate(['/carrera']);
  }

  mostrarApuesta(): void {
    this.router.navigate(['/apuesta']);
  }

  mostrarConfi(): void {
    this.router.navigate(['/config']);
  }

  ngOndestroy() {
    this.estadoSubscription!.unsubscribe();
  }


}
