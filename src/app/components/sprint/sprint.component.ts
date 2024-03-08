import {Component} from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Piloto} from "../../interfaces/piloto";
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {ListasService} from "../../services/listas.service";

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent {

  lista: string='sprint';
  pilotos: Piloto[]=[];

  private sprintSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private listasService: ListasService) { }

  async ngAfterViewChecked(): Promise<void> {
    this.sprintSubscription=this.listasService.sprint$.subscribe(v => this.pilotos=v);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pilotos, event.previousIndex, event.currentIndex);
    this.apuestaService.updatePosiciones(this.pilotos.slice(0, 4), this.lista);
    this.listasService.updateSprint(this.pilotos);
  }

  ngOndestroy() {
    this.sprintSubscription!.unsubscribe();
  }

}


