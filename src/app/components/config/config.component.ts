import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {ApuestaService} from "../../services/apuesta.service";
import {ConfigService} from "../../services/config.service";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  granpremio: number=1;
  sprint: boolean=false;
  equipo: string='option3';
  posAlonso: number=1;
  posSainz: number=1;

  constructor(private apuestaService: ApuestaService, private configService: ConfigService) { }

  modificarEquipo(): void {
    this.apuestaService.updateOtros(this.equipo, this.posAlonso, this.posSainz);
  }

  modificarPosAlonso(event: any): void {
    this.posAlonso=event;
    this.apuestaService.updateOtros(this.equipo, this.posAlonso, this.posSainz);
  }

  modificaPosSainz(event: any): void {
    this.posSainz=event;
    this.apuestaService.updateOtros(this.equipo, this.posAlonso, this.posSainz);
  }

  modificarGranpremio(): void {
    this.configService.updateGranpremio(this.granpremio);
  }

  modificarSprint(event: any): void {
    this.sprint=event;
    this.configService.updateSprint(this.sprint);
  }

}
