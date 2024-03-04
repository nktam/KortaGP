import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ListaComponent} from './components/lista/lista.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApuestaService} from "./services/apuesta.service";
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaComponent, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';
  estado: string='';

  private estadoSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.estadoSubscription=this.apuestaService.estado$.subscribe(v => this.estado=v);
  }

  cargaLista(estado: string): void {
    this.apuestaService.updateEstado(estado);
    this.router.navigate(['/lista']);
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
