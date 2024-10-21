import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MenuComponent} from "./components/menu/menu.component";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';

  constructor(private auth: AuthService) { }

  logIn() {
    this.auth.logIn();
  }

  info() {
    this.auth.info();
  }

  logOut() {
    this.auth.logOut();
  }


}
