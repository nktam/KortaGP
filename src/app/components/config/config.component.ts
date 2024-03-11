import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {ApuestaService} from "../../services/apuesta.service";
import {ConfigService} from "../../services/config.service";
import {FormsModule} from '@angular/forms';
import {Apuesta} from '../../interfaces/apuesta';
import apuestaInfo from '../../utils/apuesta.json';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  apuesta: Apuesta=apuestaInfo;
  private apuestaSubscription: Subscription|undefined;
  granpremio: number=1;
  sprint: boolean=false;

  constructor(private apuestaService: ApuestaService, private configService: ConfigService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
  }

  modificarEquipo(): void {
    this.apuestaService.updateEquipo(this.apuesta.equipo);
  }

  modificarPosAlonso(event: any): void {
    this.apuesta.posAlonso=event;
    this.apuestaService.updatePosalonso(this.apuesta.posAlonso);
  }

  modificaPosSainz(event: any): void {
    this.apuesta.posSainz=event;
    this.apuestaService.updatePossainz(this.apuesta.posSainz);
  }

  modificarGranpremio(): void {
    this.configService.updateGranpremio(this.granpremio);
  }

  modificarSprint(event: any): void {
    this.sprint=event;
    this.configService.updateSprint(this.sprint);
  }

  ngOnDestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

}
