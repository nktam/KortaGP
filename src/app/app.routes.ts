import {Routes} from '@angular/router';
import {ListaComponent} from "./lista/lista.component";
import {OrdenarListaComponent} from "./ordenar-lista/ordenar-lista.component";


export const routes: Routes=[
    {path: 'lista', component: ListaComponent},
    {path: 'ordenar', component: OrdenarListaComponent},
];
