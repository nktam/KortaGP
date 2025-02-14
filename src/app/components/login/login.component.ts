import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mostrarFromLogin=true;
  mostrarFromRegistro=false;
  email: string='';
  password: string='';
  userName: string='';

  constructor(private auth: AuthService) { }

  logWithEmail() {
    this.auth.loginWithEmail(this.email, this.password);
  }

  logInGoogle() {
    this.auth.logInGoogle();
  }

  logOut() {
    this.auth.logOut();
  }

  alta() {
    this.formsDisplay()
  }

  nuevoUsuario() {
    this.auth.registerWithEmail(this.email, this.password, this.userName);
  }

  formsDisplay() {
    this.mostrarFromLogin=!this.mostrarFromLogin;
    this.mostrarFromRegistro=!this.mostrarFromRegistro;
  }
}
