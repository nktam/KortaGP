import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarreraComponent} from './components/carrera/carrera.component';
import {ConsultasService} from './services/consultas.service';
import {HttpClientModule} from "@angular/common/http";
import {Piloto} from './interfaces/piloto';


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

  constructor(private router: Router, private cs: ConsultasService) { }

  async ngOnInit(): Promise<void> {
    this.cs.getPosts().subscribe((res) => {
      this.respuesta=res;
      let lista=this.respuesta.MRData.DriverTable.Drivers;
      for(let i=0; i<lista.length; i++) {
        let piloto: Piloto={id: 0, nombre: ''};
        piloto.id=lista[i].permanentNumber;
        piloto.nombre=lista[i].driverId;
        this.pilotos.push(piloto);
      }
      console.log(this.pilotos);
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
