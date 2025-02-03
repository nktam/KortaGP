import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {ListaComponent} from './components/lista/lista.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {PuntosComponent} from './components/puntos/puntos.component';

const redirectUnauthorizedToLogin=() => redirectUnauthorizedTo(['login'])

export const routes: Routes=[
    {path: '', component: HomeComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
    {path: 'lista', component: ListaComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
    {path: 'apuesta', component: ApuestaComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
    {path: 'config', component: ConfigComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
    {path: 'puntos', component: PuntosComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}}
];
