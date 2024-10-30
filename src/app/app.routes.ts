import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {ListaComponent} from './components/lista/lista.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from "./guards/auth.guard";

export const routes: Routes=[
    {path: '', component: HomeComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'lista', component: ListaComponent, canActivate: [authGuard]},
    {path: 'apuesta', component: ApuestaComponent, canActivate: [authGuard]},
    {path: 'config', component: ConfigComponent, canActivate: [authGuard]}
];
