import {Routes} from '@angular/router';
import {ApuestaComponent} from "./components/apuesta/apuesta.component";
import {ConfigComponent} from "./components/config/config.component";
import {CarreraComponent} from './components/carrera/carrera.component';
import {clasificacionComponent} from './components/clasificacion/clasificacion.component';
import {SprintComponent} from './components/sprint/sprint.component';


export const routes: Routes=[
    {path: 'clasificacion', component: clasificacionComponent},
    {path: 'sprint', component: SprintComponent},
    {path: 'carrera', component: CarreraComponent},
    {path: 'apuesta', component: ApuestaComponent},
    {path: 'config', component: ConfigComponent}
];
