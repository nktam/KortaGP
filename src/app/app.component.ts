import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MenuComponent} from "./components/menu/menu.component";
import {Equipo} from './interfaces/equipo';
import {ConsultasService} from './services/consultas.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';
  listaEquipos: Equipo[]=[];
  jsonFile: string='equipos.json';

  constructor(private cs: ConsultasService) { }

  async ngOnInit(): Promise<void> {
    try {
      if(await this.cs.archivoCaducado(this.jsonFile)) {throw Error('caducado')};
      this.cs.listaEquipos(JSON.parse(await this.cs.leeArchivo(this.jsonFile)));
    } catch(error) {
      this.cs.getEquipos().subscribe(res => this.getListaEquipos(res));
    }
  }

  private getListaEquipos(res: any) {
    const listaDesdeApiRest=res.MRData.ConstructorTable.Constructors;
    this.cs.listaEquipos=this.cs.arrayToEquipos(listaDesdeApiRest);
    this.cs.guardaArchivo(this.jsonFile, this.listaEquipos);
  }

}
