import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {ListaComponent} from './components/lista/lista.component';
import {HomeComponent} from './components/home/home.component';


export const routes: Routes=[
    {path: 'home', component: HomeComponent},
    {path: 'lista', component: ListaComponent},
    {path: 'apuesta', component: ApuestaComponent},
    {path: 'config', component: ConfigComponent}
];
