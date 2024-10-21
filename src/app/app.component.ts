import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Auth, GoogleAuthProvider, signInWithPopup} from "@angular/fire/auth";
import {MenuComponent} from "./components/menu/menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';

  constructor(private router: Router, private auth: Auth) { }

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
    this.router.navigate(['/home']);
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


}
