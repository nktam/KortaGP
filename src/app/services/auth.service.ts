import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Auth, GoogleAuthProvider, signInWithPopup} from "@angular/fire/auth";

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
    const str=JSON.stringify(result, null, 4);
    console.log('Result: '+str);
    const user=result.user;
    console.log('User: '+user);
    // This gives you a Google Access Token.
    const credential=GoogleAuthProvider.credentialFromResult(result);
    const token=credential!.accessToken;
    console.log('Token: '+token);
    this.router.navigate(['/home']);
  }

  async info() {
    console.log('funciona');
    console.log('Current user email: '+this.auth.currentUser?.email)
    console.log('Current user id: '+this.auth.currentUser?.uid)
  }

  logOut() {
    this.auth.signOut();
  }

}
