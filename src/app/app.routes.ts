import {Routes} from '@angular/router';
import {ListaComponent} from "./lista/lista.component";
import {ApuestaComponent} from "./apuesta/apuesta.component";


export const routes: Routes=[
    {path: 'lista', component: ListaComponent},
    {path: 'apuesta', component: ApuestaComponent}
];
