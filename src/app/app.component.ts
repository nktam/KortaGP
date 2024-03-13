import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarreraComponent} from './components/carrera/carrera.component';
import {ConsultasService} from './services/consultas.service';
import {HttpClientModule} from "@angular/common/http";
import {Piloto} from './interfaces/piloto';
import {ListasService} from './services/listas.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarreraComponent, MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string='KortaGP';
  respuesta: any;
  pilotos: Piloto[]=[];

  constructor(private router: Router, private cs: ConsultasService, private listas: ListasService) { }

  async ngOnInit(): Promise<void> {
    this.cs.leeArchivo().then((respuesta) => {
      this.listas.updateListas(JSON.parse(respuesta));
    })
      .catch(e => {
        this.cs.getPilotos().subscribe((res) => {
          this.respuesta=res;
          let lista=this.respuesta.MRData.DriverTable.Drivers;
          this.pilotos=this.cs.arrayToPilotos(lista);
          this.cs.guardaArchivo(this.pilotos);
        });
      });
  }

  cargaClasificacion(): void {
    this.router.navigate(['/clasificacion']);
  }
  cargaSprint(): void {
    this.router.navigate(['/sprint']);
  }
  cargaCarrera(): void {
    this.router.navigate(['/carrera']);
  }

  mostrarApuesta(): void {
    this.router.navigate(['/apuesta']);
  }

  mostrarConfi(): void {
    this.router.navigate(['/config']);
  }

}
