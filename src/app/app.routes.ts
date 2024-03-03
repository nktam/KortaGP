import {Routes} from '@angular/router';
import {ListaComponent} from "./components/lista/lista.component";
import {ApuestaComponent} from "./components/apuesta/apuesta.component";


export const routes: Routes=[
    {path: 'lista', component: ListaComponent},
    {path: 'apuesta', component: ApuestaComponent}
];
