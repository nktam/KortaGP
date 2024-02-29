import {Component} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {
  lista=[
    {id: 1, nombre: "Max", equipo: 'Red Bull'},
    {id: 4, nombre: "Norris", equipo: 'McLareb F1'},
    {id: 11, nombre: "Checo", equipo: 'Red Bull'},
    {id: 14, nombre: "Alonso", equipo: 'Aston Martin'},
    {id: 16, nombre: "Lecrerc", equipo: 'Ferrari'},
    {id: 55, nombre: "Sainz", equipo: 'Ferrari'},
    {id: 44, nombre: "Hamilton", equipo: 'Mercedes'}
  ]
}
