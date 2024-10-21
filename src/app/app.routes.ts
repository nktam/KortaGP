import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {ListaComponent} from './components/lista/lista.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLanding=() => redirectUnauthorizedTo(['home']);


export const routes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'lista', component: ListaComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLanding}},
    {path: 'apuesta', component: ApuestaComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLanding}},
    {path: 'config', component: ConfigComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLanding}}
];
