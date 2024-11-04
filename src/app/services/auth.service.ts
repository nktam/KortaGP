import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Auth, GoogleAuthProvider, signInWithPopup, User} from "@angular/fire/auth";
import {Usuario} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  async logIn() {
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result=await signInWithPopup(this.auth, provider);
    console.log('...Conexión establecida, User: '+result.user.displayName);
    this.router.navigate(['/home']);
  }

  async getCurrentUser(): Promise<Usuario> {
    const user=await this.auth.currentUser;
    const usuario: Usuario={nombre: '', idUsuario: ''};
    usuario.idUsuario=user!.uid;
    usuario.nombre=user!.displayName!=null? user!.displayName:'Desconocido';
    return usuario;
  }

  async logeado(): Promise<boolean> {
    const user=await this.auth.currentUser;
    console.log(user);
    return user!=null? true:false;
  }

  logOut() {
    this.auth.signOut();
  }

}
