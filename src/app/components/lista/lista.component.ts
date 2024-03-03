import {Component, ElementRef, ViewChild} from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Piloto} from "../../interfaces/piloto";
import {ApuestaService} from "../../services/apuesta.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  estado: string='';

  private estadoSubscription: Subscription|undefined;

  lista: Piloto[]=[
    {id: 1, nombre: "Max", equipo: 'Red Bull'},
    {id: 4, nombre: "Norris", equipo: 'McLareb F1'},
    {id: 11, nombre: "Checo", equipo: 'Red Bull'},
    {id: 14, nombre: "Alonso", equipo: 'Aston Martin'},
    {id: 16, nombre: "Lecrerc", equipo: 'Ferrari'},
    {id: 55, nombre: "Sainz", equipo: 'Ferrari'},
    {id: 44, nombre: "Hamilton", equipo: 'Mercedes'}
  ]

  constructor(private apuestaService: ApuestaService) { }

  async ngOnInit(): Promise<void> {
    this.estadoSubscription=this.apuestaService.estado$.subscribe(v => this.estado=v);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lista, event.previousIndex, event.currentIndex);
    this.apuestaService.updatePosiciones(this.lista.slice(0, 3), this.estado);
  }

  ngOndestroy() {
    this.estadoSubscription!.unsubscribe();
  }


}


