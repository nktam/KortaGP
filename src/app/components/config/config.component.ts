import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {ApuestaService} from "../../services/apuesta.service";
import {FormsModule, } from '@angular/forms';
import {ConsultasService} from '../../services/consultas.service';


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  apuesta: any;
  private _apuestaSubscription: Subscription|undefined;


  constructor(private cs: ConsultasService, private apuestaService: ApuestaService) { }

  ngOnInit(): void {
    this._apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);

  }

  ngOnDestroy() {
    this._apuestaSubscription!.unsubscribe();
  }

}
