import {Component} from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Piloto} from "../../interfaces/piloto";
import {Listas} from "../../interfaces/listas";
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {ListasService} from "../../services/listas.service";
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [DragDropModule, UpperCasePipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  pagina: string='';
  listas: Listas={clasificacion: [], carrera: [], sprint: []};
  pilotos: Piloto[]=[]

  private subscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private listasService: ListasService) { }

  async ngDoCheck(): Promise<void> {
    this.pagina=this.listasService.pagina;
    this.subscription=this.listasService.listas$.subscribe(v => this.listas=v);
    switch(this.pagina) {
      case 'Clasificación': {
        this.pilotos=this.listas.clasificacion;
        break;
      }
      case 'Sprint': {
        this.pilotos=this.listas.sprint;
        break;
      }
      default: {
        this.pilotos=this.listas.carrera;
        break;
      }
    }
    this.subscription!.unsubscribe();

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pilotos, event.previousIndex, event.currentIndex);
    this.apuestaService.updatePosiciones(this.pilotos.slice(0, 4), this.pagina);
    switch(this.pagina) {
      case 'Clasificación': {
        this.listasService.updateClasificacion(this.pilotos.slice(0, 20));
        break;
      }
      case 'Sprint': {
        this.listasService.updateSprint(this.pilotos.slice(0, 21));
        break;
      }
      default: {
        this.listasService.updateCarrera(this.pilotos.slice(0, 19));
        break;
      }
    }

  }

  ngOnDestroy() {

  }

}


