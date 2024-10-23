import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Auth, GoogleAuthProvider, signInWithPopup} from "@angular/fire/auth";
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
    console.log('Conexion establecida - User: '+result.user.displayName);

    /* const credential=GoogleAuthProvider.credentialFromResult(result);
    const token=credential!.accessToken;
    console.log('Token: '+token); */

    this.router.navigate(['/home']);
  }

  async info() {
    console.log('Current user email: '+this.auth.currentUser?.email)
    console.log('Current user id: '+this.auth.currentUser?.uid)
  }

  async getCurrentUser(): Promise<Usuario> {
    const user=await this.auth.currentUser;
    const usuario: Usuario={nombre: '', idUsuario: ''};
    usuario.idUsuario=user!.uid;
    usuario.nombre=user!.displayName!=null? user!.displayName:'Desconocido';
    return usuario;
  }

  logOut() {
    this.auth.signOut();
  }

}
