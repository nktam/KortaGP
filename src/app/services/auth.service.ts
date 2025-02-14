import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User} from "@angular/fire/auth";
import {Usuario} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  async logInGoogle() {
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result=await signInWithPopup(this.auth, provider);
    console.log('...Conexión establecida, User: '+result.user.displayName);
    this.router.navigate(['/home']);
  }

  async registerWithEmail(email: string, password: string, nombre: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user=userCredential.user;
        updateProfile(user, {displayName: nombre})
          .then(() => {
            console.log('...Usuario creado, User: '+user.displayName);
          }).catch((error) => {
            console.log(error);

          });
        console.log('...Conexión establecida, User: '+user.displayName);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorCode=error.code;
        const errorMessage=error.message;
      });
  }

  async loginWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user=userCredential.user;
        console.log('...Conexión establecida, User: '+user.displayName);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorCode=error.code;
        const errorMessage=error.message;
      });
  }

  async getCurrentUser(): Promise<Usuario> {
    const user=await this.auth.currentUser;
    const usuario: Usuario={id: '', nombre: ''};
    usuario.id=user!.uid;
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
