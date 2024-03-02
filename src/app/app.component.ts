import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {OrdenarListaComponent} from './ordenar-lista/ordenar-lista.component';
import {ListaComponent} from './lista/lista.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrdenarListaComponent, ListaComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title='F1proyect';
}
