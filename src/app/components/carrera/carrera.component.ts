import {Component} from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Piloto} from "../../interfaces/piloto";
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {ListasService} from "../../services/listas.service";

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.scss'
})
export class CarreraComponent {

  lista: string='carrera';

  private carreraSubscription: Subscription|undefined;

  pilotos: Piloto[]=[];

  constructor(private apuestaService: ApuestaService, private listasService: ListasService) { }

  async ngOnInit(): Promise<void> {
    this.carreraSubscription=this.listasService.carrera$.subscribe(v => this.pilotos=v);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pilotos, event.previousIndex, event.currentIndex);
    this.apuestaService.updatePosiciones(this.pilotos.slice(0, 4), this.lista);
    this.listasService.updateCarrera(this.pilotos);
  }

  ngOnDestroy() {
    this.carreraSubscription!.unsubscribe();
  }

}


