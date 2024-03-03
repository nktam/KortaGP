import {Component} from '@angular/core';
import {ApuestaService} from "../services/apuesta.service";
import {Subscription} from 'rxjs';
import {Apuesta} from "../interfaces/apuesta";

@Component({
  selector: 'app-apuesta',
  standalone: true,
  imports: [],
  templateUrl: './apuesta.component.html',
  styleUrl: './apuesta.component.css'
})
export class ApuestaComponent {

  apuesta: Apuesta=this.apuestaService.apuesta;
  private apuestaSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService) { }

  async ngOnInit(): Promise<void> {
    this.apuestaSubscription=this.apuestaService.apuesta$.subscribe(v => this.apuesta=v);
  }

  ngOndestroy() {
    this.apuestaSubscription!.unsubscribe();
  }

}
