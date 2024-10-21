import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from "@angular/common/http";
import {ConsultasService} from '../../services/consultas.service';
import {ApuestaService} from '../../services/apuesta.service';
import {MenuComponent} from "../menu/menu.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title: string='KortaGP';

  constructor(private cs: ConsultasService, private apuestaService: ApuestaService) { }

  async ngOnInit(): Promise<void> {
    const apuesta=await this.cs.consultaApuestaGuardada();
    this.apuestaService.updateApuesta(apuesta);
  }



}
