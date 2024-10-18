import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from "@angular/common/http";
import {ListasService} from './services/listas.service';
import {ConsultasService} from './services/consultas.service';
import {ApuestaService} from './services/apuesta.service';
import {Auth, GoogleAuthProvider, signInWithPopup} from "@angular/fire/auth";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';

  constructor(private router: Router, private listas: ListasService, private cs: ConsultasService, private apuestaService: ApuestaService, private auth: Auth) { }

  async ngOnInit(): Promise<void> {
    const apuesta=await this.cs.consultaApuestaGuardada();
    this.apuestaService.updateApuesta(apuesta);
  }

  async login() {
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result=await signInWithPopup(this.auth, provider);
    const str=JSON.stringify(result, null, 4);
    console.log('Result: '+str);
    const user=result.user;
    console.log('User: '+user);
    // This gives you a Google Access Token.
    const credential=GoogleAuthProvider.credentialFromResult(result);
    const token=credential!.accessToken;
    console.log('Token: '+token);
  }

  async info() {
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result=await signInWithPopup(this.auth, provider);
    const str=JSON.stringify(result, null, 4);
    console.log('Result: '+str);
    const user=result.user;
    console.log('User: '+user);
    // This gives you a Google Access Token.
    const credential=GoogleAuthProvider.credentialFromResult(result);
    const token=credential!.accessToken;
    console.log('Token: '+token);
  }

  logOut() {
    this.auth.signOut();
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
