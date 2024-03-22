import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {ListaComponent} from './components/lista/lista.component';


export const routes: Routes=[
    {path: '', component: ConfigComponent},
    {path: 'lista', component: ListaComponent},
    {path: 'apuesta', component: ApuestaComponent},
    {path: 'config', component: ConfigComponent}
];
