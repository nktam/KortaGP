import {Routes} from '@angular/router';
import {ListaComponent} from "./components/lista/lista.component";
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";


export const routes: Routes=[
    {path: 'lista', component: ListaComponent},
    {path: 'apuesta', component: ApuestaComponent},
    {path: 'config', component: ConfigComponent}
];
