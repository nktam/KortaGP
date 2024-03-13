import {Component} from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Piloto} from "../../interfaces/piloto";
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';
import {ListasService} from "../../services/listas.service";
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [DragDropModule, UpperCasePipe],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.scss'
})
export class clasificacionComponent {

  lista: string='clasificacion';
  pilotos: Piloto[]=[];

  private clasificacionSubscription: Subscription|undefined;

  constructor(private apuestaService: ApuestaService, private listasService: ListasService) { }

  async ngOnInit(): Promise<void> {
    this.clasificacionSubscription=this.listasService.clasificacion$.subscribe(v => this.pilotos=v);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pilotos, event.previousIndex, event.currentIndex);
    this.apuestaService.updatePosiciones(this.pilotos.slice(0, 4), this.lista);
    this.listasService.updateClasificacion(this.pilotos);
  }

  ngOnDestroy() {
    this.clasificacionSubscription!.unsubscribe();
  }

}


