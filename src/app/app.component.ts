import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OrdenarListaComponent} from './ordenar-lista/ordenar-lista.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrdenarListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title='F1proyect';
}
